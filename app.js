// Gloomhelper — main application script

(() => {
  "use strict";

  const STORAGE_KEY = "gloomhelper.state.v1";
  const SAVE_FORMAT = "gloomhelper.save.v1";
  const APP_VERSION = "0.2.0";

  const defaultState = () => ({
    party: { name: "", reputation: 0, location: "", prosperity: 1, achievements: [], scenarios: [] },
    characters: [],
    decks: {}, // keyed by character id, holds { deck: [], discard: [], blesses: 0, curses: 0, reshuffleNext: false }
    elements: { Fire: "inert", Ice: "inert", Air: "inert", Earth: "inert", Light: "inert", Dark: "inert" },
    activeModTarget: null,
    savedAt: null,
  });

  let state = loadState();

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      return Object.assign(defaultState(), parsed);
    } catch (_e) {
      return defaultState();
    }
  }

  function saveState() {
    state.savedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    updateSaveStamp();
  }

  // ---- Export / import data shape ----------------------------------------
  function buildExportPayload() {
    return {
      format: SAVE_FORMAT,
      appVersion: APP_VERSION,
      exportedAt: new Date().toISOString(),
      state: state,
    };
  }

  function exportJSONString() {
    return JSON.stringify(buildExportPayload(), null, 2);
  }

  // Accept either a wrapped payload (from buildExportPayload) or a raw state object
  // (older exports / hand-written). Returns { ok, state, message }.
  function parseImportedJSON(raw) {
    let obj;
    try {
      obj = JSON.parse(raw);
    } catch (e) {
      return { ok: false, message: "Not valid JSON: " + e.message };
    }
    if (!obj || typeof obj !== "object") {
      return { ok: false, message: "Not a Gloomhelper save (expected an object)." };
    }

    let candidate;
    if (obj.format === SAVE_FORMAT && obj.state && typeof obj.state === "object") {
      candidate = obj.state;
    } else if (obj.party && obj.characters !== undefined) {
      // looks like a raw state (older format or direct localStorage dump)
      candidate = obj;
    } else {
      return { ok: false, message: "Unrecognized save format. Expected a Gloomhelper export." };
    }

    if (!candidate.party || !Array.isArray(candidate.characters)) {
      return { ok: false, message: "Save is missing 'party' or 'characters'." };
    }

    return { ok: true, state: Object.assign(defaultState(), candidate) };
  }

  function applyImport(importedState, mode) {
    if (mode === "merge") {
      state = mergeState(state, importedState);
    } else {
      state = importedState;
    }
    saveState();
    renderAll();
  }

  // Merge: keep existing values, add anything not already present.
  // Characters are merged by id (new ids appended); achievements/scenarios are
  // appended without duplicates; decks are kept for whichever side has them.
  function mergeState(cur, inc) {
    const out = Object.assign({}, cur);
    out.party = Object.assign({}, inc.party || {}, cur.party || {});
    const ach = new Set([...(cur.party?.achievements || []), ...(inc.party?.achievements || [])]);
    out.party.achievements = [...ach];
    const scnSeen = new Set();
    out.party.scenarios = [...(cur.party?.scenarios || []), ...(inc.party?.scenarios || [])]
      .filter((s) => {
        const k = s.num + ":" + s.result;
        if (scnSeen.has(k)) return false;
        scnSeen.add(k);
        return true;
      });

    const byId = new Map((cur.characters || []).map((c) => [c.id, c]));
    (inc.characters || []).forEach((c) => { if (!byId.has(c.id)) byId.set(c.id, c); });
    out.characters = [...byId.values()];

    out.decks = Object.assign({}, inc.decks || {}, cur.decks || {});
    out.elements = Object.assign({}, inc.elements || {}, cur.elements || {});
    out.activeModTarget = cur.activeModTarget || inc.activeModTarget || null;
    return out;
  }

  function updateSaveStamp() {
    const el = document.getElementById("save-stamp");
    if (!el) return;
    if (!state.savedAt) { el.textContent = ""; return; }
    const d = new Date(state.savedAt);
    el.textContent = "Saved " + d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  // ---------- Tab switching ----------
  document.getElementById("tabs").addEventListener("click", (e) => {
    const btn = e.target.closest(".tab");
    if (!btn) return;
    const id = btn.dataset.tab;
    document.querySelectorAll(".tab").forEach((t) => t.classList.toggle("active", t === btn));
    document.querySelectorAll(".tab-panel").forEach((p) => p.classList.toggle("active", p.id === id));
  });

  // ---------- Party ----------
  function renderParty() {
    document.getElementById("party-name").value = state.party.name || "";
    document.getElementById("party-rep").value = state.party.reputation ?? 0;
    document.getElementById("party-loc").value = state.party.location || "";
    document.getElementById("pros-val").textContent = state.party.prosperity || 1;

    const ul = document.getElementById("party-members");
    ul.innerHTML = "";
    if (!state.characters.length) {
      ul.innerHTML = `<li class="hint">No characters yet — add one in the Characters tab.</li>`;
    }
    state.characters.forEach((c) => {
      const li = document.createElement("li");
      li.innerHTML = `<span><span class="pname">${escape(c.name)}</span><span class="pclass">${escape(classNameOf(c))} • L${c.level}</span></span>
                     <span class="hint">XP ${c.xp} • Gold ${c.gold}</span>`;
      ul.appendChild(li);
    });

    const al = document.getElementById("achv-list");
    al.innerHTML = "";
    state.party.achievements.forEach((a, i) => {
      const li = document.createElement("li");
      li.innerHTML = `${escape(a)} <button data-i="${i}" title="remove">×</button>`;
      al.appendChild(li);
    });

    const sl = document.getElementById("scn-list");
    sl.innerHTML = "";
    state.party.scenarios.slice().reverse().forEach((s, idx) => {
      const li = document.createElement("li");
      const realIdx = state.party.scenarios.length - 1 - idx;
      li.innerHTML = `<span>Scenario #${s.num} <span class="res-${s.result}">${s.result}</span></span>
                     <button data-i="${realIdx}">×</button>`;
      sl.appendChild(li);
    });
  }

  document.getElementById("party-save").addEventListener("click", () => {
    state.party.name = document.getElementById("party-name").value.trim();
    state.party.reputation = clampInt(document.getElementById("party-rep").value, -20, 20, 0);
    state.party.location = document.getElementById("party-loc").value.trim();
    saveState();
    flash("party-save", "Saved");
  });
  document.getElementById("pros-inc").addEventListener("click", () => {
    state.party.prosperity = Math.min(9, (state.party.prosperity || 1) + 1);
    saveState();
    renderParty();
  });
  document.getElementById("pros-dec").addEventListener("click", () => {
    state.party.prosperity = Math.max(1, (state.party.prosperity || 1) - 1);
    saveState();
    renderParty();
  });
  document.getElementById("achv-add").addEventListener("click", () => {
    const inp = document.getElementById("achv-input");
    const v = inp.value.trim();
    if (!v) return;
    state.party.achievements.push(v);
    inp.value = "";
    saveState();
    renderParty();
  });
  document.getElementById("achv-list").addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    state.party.achievements.splice(+b.dataset.i, 1);
    saveState();
    renderParty();
  });
  document.getElementById("scn-add").addEventListener("click", () => {
    const numI = document.getElementById("scn-num");
    const resI = document.getElementById("scn-result");
    const num = parseInt(numI.value, 10);
    const result = resI.value;
    if (!num || !result) return;
    state.party.scenarios.push({ num, result });
    numI.value = "";
    resI.value = "";
    saveState();
    renderParty();
  });
  document.getElementById("scn-list").addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    state.party.scenarios.splice(+b.dataset.i, 1);
    saveState();
    renderParty();
  });

  // ---------- Characters ----------
  function classOf(id) { return window.GH_CLASSES.find((c) => c.id === id); }
  function classNameOf(ch) { return classOf(ch.classId)?.name || ch.classId; }

  function populateClassPicker() {
    const sel = document.getElementById("char-class-pick");
    sel.innerHTML = "";
    window.GH_CLASSES.forEach((c) => {
      const o = document.createElement("option");
      o.value = c.id;
      o.textContent = c.name;
      sel.appendChild(o);
    });
  }

  function newCharacter(classId, name) {
    const cls = classOf(classId);
    const id = "ch_" + Math.random().toString(36).slice(2, 9);
    return {
      id,
      classId,
      name: name || cls.name,
      level: 1,
      xp: 0,
      gold: 0,
      hp: cls.hp[0],
      maxHp: cls.hp[0],
      checks: 0,
      perksTaken: {}, // index of perk -> count taken
      items: [],
      inDeck: {}, // card name -> bool
      conditions: {},
      notes: "",
    };
  }

  function renderCharacters() {
    const list = document.getElementById("char-list");
    list.innerHTML = "";
    if (!state.characters.length) {
      list.innerHTML = `<p class="hint">No characters yet. Pick a class above and click <em>Add Character</em>.</p>`;
      return;
    }
    const tpl = document.getElementById("char-card-tpl");
    state.characters.forEach((ch) => {
      const cls = classOf(ch.classId);
      const node = tpl.content.firstElementChild.cloneNode(true);
      node.dataset.id = ch.id;
      node.querySelector(".cname").textContent = ch.name;
      node.querySelector(".cclass").textContent = cls.name + " — " + cls.summary;

      const lvl = node.querySelector(".lvl");
      const xp = node.querySelector(".xp");
      const gold = node.querySelector(".gold");
      const hp = node.querySelector(".hp");
      const maxhp = node.querySelector(".maxhp");
      const checks = node.querySelector(".checks");
      lvl.value = ch.level;
      xp.value = ch.xp;
      gold.value = ch.gold;
      hp.value = ch.hp;
      maxhp.value = ch.maxHp;
      checks.value = ch.checks;

      [["lvl", "level", 1, 9], ["xp", "xp", 0, 9999], ["gold", "gold", 0, 9999],
       ["hp", "hp", 0, 999], ["maxhp", "maxHp", 1, 999], ["checks", "checks", 0, 18]
      ].forEach(([sel, key, mn, mx]) => {
        const el = node.querySelector("." + sel);
        el.addEventListener("change", () => {
          ch[key] = clampInt(el.value, mn, mx, ch[key]);
          if (key === "level") {
            ch.maxHp = cls.hp[ch.level - 1];
            if (ch.hp > ch.maxHp) ch.hp = ch.maxHp;
          }
          saveState();
          renderCharacters();
          renderParty();
        });
      });

      // perks
      const perksUl = node.querySelector(".perks");
      cls.perks.forEach((p, idx) => {
        const li = document.createElement("li");
        const ticks = document.createElement("span");
        ticks.className = "ticks";
        for (let i = 0; i < p.count; i++) {
          const t = document.createElement("span");
          t.className = "tick";
          if ((ch.perksTaken[idx] || 0) > i) t.classList.add("on");
          t.dataset.perkIdx = idx;
          t.dataset.tickIdx = i;
          ticks.appendChild(t);
        }
        const lbl = document.createElement("span");
        lbl.textContent = p.text;
        li.appendChild(ticks);
        li.appendChild(lbl);
        perksUl.appendChild(li);
      });
      perksUl.addEventListener("click", (e) => {
        const t = e.target.closest(".tick");
        if (!t) return;
        const pi = +t.dataset.perkIdx;
        const ti = +t.dataset.tickIdx;
        const cur = ch.perksTaken[pi] || 0;
        // toggle: if clicked tick is already on, lower to that level; else fill up to it+1
        ch.perksTaken[pi] = cur > ti ? ti : ti + 1;
        saveState();
        renderCharacters();
      });

      // items
      const itemsUl = node.querySelector(".items");
      ch.items.forEach((it, i) => {
        const li = document.createElement("li");
        li.innerHTML = `${escape(it)} <button data-i="${i}">×</button>`;
        itemsUl.appendChild(li);
      });
      node.querySelector(".item-add").addEventListener("click", () => {
        const inp = node.querySelector(".item-input");
        const v = inp.value.trim();
        if (!v) return;
        ch.items.push(v);
        inp.value = "";
        saveState();
        renderCharacters();
      });
      itemsUl.addEventListener("click", (e) => {
        const b = e.target.closest("button");
        if (!b) return;
        ch.items.splice(+b.dataset.i, 1);
        saveState();
        renderCharacters();
      });

      // available cards
      const cl = node.querySelector(".cards-list");
      cls.cards.forEach((card) => {
        const div = document.createElement("div");
        div.className = "gh-card";
        const lvlNum = card.lvl === "X" ? 1 : parseInt(card.lvl, 10);
        const locked = lvlNum > ch.level;
        div.innerHTML = `<span>${escape(card.name)}</span><span class="lvl">L${card.lvl}</span>`;
        if (locked) div.classList.add("locked");
        if (ch.inDeck[card.name]) div.classList.add("in-deck");
        div.addEventListener("click", () => {
          if (locked) return;
          ch.inDeck[card.name] = !ch.inDeck[card.name];
          saveState();
          renderCharacters();
        });
        cl.appendChild(div);
      });

      // conditions
      const cr = node.querySelector(".conds-row");
      window.GH_CONDITIONS.forEach((cond) => {
        const chip = document.createElement("button");
        chip.className = "cond-chip";
        chip.textContent = cond.icon + " " + cond.name;
        if (ch.conditions[cond.name]) chip.classList.add("on");
        chip.addEventListener("click", () => {
          ch.conditions[cond.name] = !ch.conditions[cond.name];
          saveState();
          renderCharacters();
        });
        cr.appendChild(chip);
      });

      // notes
      const notesEl = node.querySelector(".notes");
      notesEl.value = ch.notes || "";
      notesEl.addEventListener("change", () => { ch.notes = notesEl.value; saveState(); });

      // remove button
      node.querySelector(".char-del").addEventListener("click", () => {
        if (!confirm("Remove " + ch.name + "?")) return;
        state.characters = state.characters.filter((c) => c.id !== ch.id);
        delete state.decks[ch.id];
        if (state.activeModTarget === ch.id) state.activeModTarget = null;
        saveState();
        renderAll();
      });

      list.appendChild(node);
    });
  }

  document.getElementById("char-add").addEventListener("click", () => {
    const sel = document.getElementById("char-class-pick");
    const name = document.getElementById("char-name").value.trim();
    const ch = newCharacter(sel.value, name);
    state.characters.push(ch);
    document.getElementById("char-name").value = "";
    saveState();
    renderAll();
  });

  // ---------- Modifier Deck ----------
  function ensureDeck(charId) {
    if (!state.decks[charId]) {
      state.decks[charId] = {
        deck: shuffle(window.GH_BASE_DECK.slice()),
        discard: [],
        blesses: 0,
        curses: 0,
        reshuffleNext: false,
      };
    }
    return state.decks[charId];
  }

  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function reshuffleDeck(d) {
    // remove any drawn bless/curse cards (they are removed when drawn)
    d.deck = shuffle(window.GH_BASE_DECK.slice());
    for (let i = 0; i < d.blesses; i++) d.deck.push(Object.assign({}, window.GH_BLESS));
    for (let i = 0; i < d.curses; i++) d.deck.push(Object.assign({}, window.GH_CURSE));
    shuffle(d.deck);
    d.discard = [];
    d.reshuffleNext = false;
  }

  function populateModTargets() {
    const sel = document.getElementById("mod-target");
    sel.innerHTML = "";
    if (!state.characters.length) {
      const o = document.createElement("option");
      o.value = "";
      o.textContent = "(no characters)";
      sel.appendChild(o);
      return;
    }
    state.characters.forEach((c) => {
      const o = document.createElement("option");
      o.value = c.id;
      o.textContent = c.name + " (" + classNameOf(c) + ")";
      sel.appendChild(o);
    });
    if (state.activeModTarget && state.characters.find((c) => c.id === state.activeModTarget)) {
      sel.value = state.activeModTarget;
    } else {
      state.activeModTarget = sel.value;
    }
  }

  function activeDeck() {
    if (!state.activeModTarget) return null;
    return ensureDeck(state.activeModTarget);
  }

  function renderModifierDeck() {
    populateModTargets();
    const d = activeDeck();
    document.getElementById("mod-deck-count").textContent = d ? d.deck.length : 0;
    document.getElementById("mod-disc-count").textContent = d ? d.discard.length : 0;
    document.getElementById("mod-reshuffle").textContent = d?.reshuffleNext ? "Yes" : "No";
    const cur = document.getElementById("mod-current");
    if (d && d.discard.length) {
      const last = d.discard[d.discard.length - 1];
      cur.textContent = last.label;
      cur.className = "mod-card big-card " + cssForMod(last);
    } else {
      cur.textContent = "—";
      cur.className = "mod-card big-card";
    }
    const trail = document.getElementById("mod-rolling-trail");
    trail.innerHTML = "";
    const dl = document.getElementById("mod-discard");
    dl.innerHTML = "";
    if (d) {
      d.discard.slice(-12).reverse().forEach((c) => {
        const li = document.createElement("li");
        li.className = "mod-card " + cssForMod(c);
        li.textContent = c.label;
        dl.appendChild(li);
      });
    }
  }

  function cssForMod(c) {
    if (c.type === "crit") return "crit";
    if (c.type === "miss") return "miss";
    if (c.type === "bless") return "bless";
    if (c.type === "curse") return "curse";
    if (c.rolling) return "elem";
    return "";
  }

  document.getElementById("mod-target").addEventListener("change", (e) => {
    state.activeModTarget = e.target.value || null;
    saveState();
    renderModifierDeck();
  });

  document.getElementById("mod-draw").addEventListener("click", () => {
    const d = activeDeck();
    if (!d) return;
    if (d.reshuffleNext) reshuffleDeck(d);
    if (d.deck.length === 0) reshuffleDeck(d);
    const card = d.deck.pop();
    if (card.type === "bless" || card.type === "curse") {
      // these are removed from the deck once drawn
      if (card.type === "bless") d.blesses = Math.max(0, d.blesses - 1);
      if (card.type === "curse") d.curses = Math.max(0, d.curses - 1);
    }
    d.discard.push(card);
    if (card.type === "crit" || card.type === "miss") d.reshuffleNext = true;
    saveState();
    renderModifierDeck();
  });

  document.getElementById("mod-shuffle").addEventListener("click", () => {
    const d = activeDeck();
    if (!d) return;
    reshuffleDeck(d);
    saveState();
    renderModifierDeck();
  });
  document.getElementById("mod-reset").addEventListener("click", () => {
    if (!state.activeModTarget) return;
    state.decks[state.activeModTarget] = {
      deck: shuffle(window.GH_BASE_DECK.slice()),
      discard: [],
      blesses: 0,
      curses: 0,
      reshuffleNext: false,
    };
    saveState();
    renderModifierDeck();
  });
  document.getElementById("mod-bless").addEventListener("click", () => {
    const d = activeDeck();
    if (!d) return;
    d.blesses += 1;
    d.deck.push(Object.assign({}, window.GH_BLESS));
    shuffle(d.deck);
    saveState();
    renderModifierDeck();
  });
  document.getElementById("mod-curse").addEventListener("click", () => {
    const d = activeDeck();
    if (!d) return;
    d.curses += 1;
    d.deck.push(Object.assign({}, window.GH_CURSE));
    shuffle(d.deck);
    saveState();
    renderModifierDeck();
  });
  document.getElementById("mod-clear-bc").addEventListener("click", () => {
    const d = activeDeck();
    if (!d) return;
    d.blesses = 0;
    d.curses = 0;
    d.deck = d.deck.filter((c) => c.type !== "bless" && c.type !== "curse");
    saveState();
    renderModifierDeck();
  });

  // ---------- Conditions ----------
  function renderConditions() {
    const root = document.getElementById("conditions-list");
    root.innerHTML = "";
    window.GH_CONDITIONS.forEach((c) => {
      const card = document.createElement("div");
      card.className = "card cond-card";
      card.innerHTML = `<h3><span class="icon">${c.icon}</span> ${escape(c.name)} <span class="hint">(${c.type})</span></h3>
                       <p><strong>${escape(c.short)}</strong></p>
                       <p class="hint">${escape(c.detail)}</p>`;
      root.appendChild(card);
    });
  }

  // ---------- Elements ----------
  function renderElements() {
    const root = document.getElementById("elements-board");
    root.innerHTML = "";
    window.GH_ELEMENTS.forEach((el) => {
      const tile = document.createElement("div");
      const st = state.elements[el.name] || "inert";
      tile.className = "elem-tile " + st;
      tile.innerHTML = `<div class="symbol" style="color:${el.color}">${el.symbol}</div>
                       <h4>${el.name}</h4>
                       <div class="state">${st}</div>
                       <p class="hint" style="margin-top:6px">${escape(el.desc)}</p>`;
      tile.addEventListener("click", () => {
        const cycle = { strong: "waning", waning: "inert", inert: "strong" };
        state.elements[el.name] = cycle[st];
        saveState();
        renderElements();
      });
      root.appendChild(tile);
    });
  }

  // ---------- Bestiary ----------
  function renderBestiary() {
    const root = document.getElementById("bestiary-list");
    if (!root) return;
    const filter = (document.getElementById("bestiary-search").value || "").toLowerCase();
    const lvl = parseInt(document.getElementById("bestiary-level").value, 10) || 0;
    root.innerHTML = "";
    (window.GH_MONSTERS || []).forEach((m) => {
      const haystack = (m.name + " " + (m.category || "") + " " + (m.notes || "")).toLowerCase();
      if (filter && !haystack.includes(filter)) return;
      const n = m.normal && m.normal[lvl];
      const e = m.elite && m.elite[lvl];
      const card = document.createElement("div");
      card.className = "monster-card";
      let rows = "";
      if (n) {
        rows += `<tr><th>Normal</th><td>${n[0]}</td><td>${n[1]}</td><td>${n[2]}</td><td>${n[3] || "—"}</td><td class="extras">${escape(n[4] || "")}</td></tr>`;
      }
      if (e) {
        rows += `<tr class="elite-row"><th>Elite</th><td>${e[0]}</td><td>${e[1]}</td><td>${e[2]}</td><td>${e[3] || "—"}</td><td class="extras">${escape(e[4] || "")}</td></tr>`;
      }
      card.innerHTML = `<h3>${escape(m.name)}</h3>
        <div class="cat">${escape(m.category || "")} • Level ${lvl}</div>
        <table>
          <thead><tr><th></th><th>HP</th><th>Move</th><th>Atk</th><th>Range</th><th>Extras</th></tr></thead>
          <tbody>${rows || `<tr><td colspan="6" class="extras">No stats at this level.</td></tr>`}</tbody>
        </table>
        ${m.notes ? `<div class="notes">${escape(m.notes)}</div>` : ""}`;
      root.appendChild(card);
    });
    if (!root.children.length) {
      root.innerHTML = `<p class="hint">No monsters match.</p>`;
    }
  }
  document.getElementById("bestiary-search")?.addEventListener("input", renderBestiary);
  document.getElementById("bestiary-level")?.addEventListener("change", renderBestiary);

  // ---------- Items ----------
  function renderItemsTab() {
    const root = document.getElementById("items-list");
    if (!root) return;
    const filter = (document.getElementById("items-search").value || "").toLowerCase();
    const slot = document.getElementById("items-slot").value;
    const prosp = parseInt(document.getElementById("items-prosperity").value, 10);
    root.innerHTML = "";
    (window.GH_ITEMS || []).forEach((it) => {
      const haystack = (it.name + " " + it.effect + " " + it.slot).toLowerCase();
      if (filter && !haystack.includes(filter)) return;
      if (slot && it.slot !== slot) return;
      if (prosp && it.prosperity > prosp) return;
      const card = document.createElement("div");
      card.className = "item-card";
      card.innerHTML = `
        <div class="item-head">
          <span class="iname">${escape(it.name)}</span>
          <span class="iid">#${escape(it.id)}</span>
        </div>
        <div class="meta">
          <span class="pip">${escape(it.slot)}</span>
          <span class="pip">${it.cost}g</span>
          <span class="pip">Pros. ${it.prosperity}</span>
          <span class="pip">${escape(it.use)}</span>
        </div>
        <div class="ieffect">${escape(it.effect)}</div>`;
      root.appendChild(card);
    });
    if (!root.children.length) {
      root.innerHTML = `<p class="hint">No items match.</p>`;
    }
  }
  document.getElementById("items-search")?.addEventListener("input", renderItemsTab);
  document.getElementById("items-slot")?.addEventListener("change", renderItemsTab);
  document.getElementById("items-prosperity")?.addEventListener("change", renderItemsTab);

  // ---------- Rules ----------
  function renderRules(filter) {
    const root = document.getElementById("rules-list");
    root.innerHTML = "";
    const f = (filter || "").toLowerCase();
    window.GH_RULES.forEach((r) => {
      if (f && !r.title.toLowerCase().includes(f) && !r.body.toLowerCase().includes(f)) return;
      const det = document.createElement("details");
      det.className = "rule";
      det.innerHTML = `<summary>${escape(r.title)}</summary><div class="body">${escape(r.body)}</div>`;
      root.appendChild(det);
    });
  }
  document.getElementById("rules-search").addEventListener("input", (e) => renderRules(e.target.value));

  // ---------- History ----------
  function renderHistory() {
    document.getElementById("history-content").innerHTML = window.GH_HISTORY;
  }

  // ---------- Settings: export ----------
  function downloadExport() {
    const json = exportJSONString();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
    const partyName = (state.party.name || "party").replace(/[^a-z0-9_-]+/gi, "_").slice(0, 24);
    a.download = "gloomhelper-" + partyName + "-" + stamp + ".json";
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
    toast("Save exported (" + (json.length / 1024).toFixed(1) + " KB)");
  }

  document.getElementById("export-btn").addEventListener("click", downloadExport);
  document.getElementById("quick-export").addEventListener("click", downloadExport);

  document.getElementById("export-copy-btn").addEventListener("click", async () => {
    const json = exportJSONString();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(json);
        toast("Copied JSON to clipboard");
      } else {
        // fallback: show in textbox
        showExportInBox(json);
        toast("Clipboard unavailable — JSON shown below", "err");
      }
    } catch (e) {
      showExportInBox(json);
      toast("Copy failed — JSON shown below", "err");
    }
  });

  document.getElementById("export-show-btn").addEventListener("click", () => {
    showExportInBox(exportJSONString());
  });
  function showExportInBox(json) {
    const box = document.getElementById("export-output");
    box.value = json;
    box.hidden = false;
    box.focus();
    box.select();
  }

  // ---------- Settings: import ----------
  function getImportMode() {
    const r = document.querySelector("input[name='import-mode']:checked");
    return r ? r.value : "replace";
  }

  function showImportStatus(msg, kind) {
    const el = document.getElementById("import-status");
    el.textContent = msg;
    el.className = "status-line " + (kind || "info");
    el.hidden = false;
  }

  function describeIncoming(s) {
    return (s.characters?.length || 0) + " character(s), " +
           (s.party?.scenarios?.length || 0) + " scenario(s), " +
           (s.party?.achievements?.length || 0) + " achievement(s)";
  }

  function importFromText(raw, source) {
    const res = parseImportedJSON(raw);
    if (!res.ok) {
      showImportStatus("Import failed: " + res.message, "err");
      toast("Import failed", "err");
      return;
    }
    const mode = getImportMode();
    const summary = describeIncoming(res.state);
    const actionWord = mode === "merge" ? "Merge" : "Replace your save";
    if (!confirm(actionWord + " with this import?\n\nIncoming: " + summary)) {
      showImportStatus("Import cancelled.", "info");
      return;
    }
    applyImport(res.state, mode);
    showImportStatus("Imported successfully (" + mode + ") from " + source + ". " + summary, "ok");
    toast("Save imported");
  }

  function readImportFile(f) {
    if (!f) return;
    const r = new FileReader();
    r.onload = () => importFromText(r.result, f.name);
    r.onerror = () => { showImportStatus("Could not read file.", "err"); };
    r.readAsText(f);
  }

  document.getElementById("import-file").addEventListener("change", (e) => {
    readImportFile(e.target.files[0]);
    e.target.value = ""; // allow re-importing the same file
  });
  document.getElementById("quick-import-file").addEventListener("change", (e) => {
    readImportFile(e.target.files[0]);
    e.target.value = "";
  });

  document.getElementById("import-paste-btn").addEventListener("click", () => {
    document.getElementById("import-input").hidden = false;
    document.getElementById("import-paste-actions").hidden = false;
    document.getElementById("import-input").focus();
  });
  document.getElementById("import-cancel-btn").addEventListener("click", () => {
    document.getElementById("import-input").hidden = true;
    document.getElementById("import-paste-actions").hidden = true;
    document.getElementById("import-input").value = "";
  });
  document.getElementById("import-apply-btn").addEventListener("click", () => {
    const raw = document.getElementById("import-input").value.trim();
    if (!raw) { showImportStatus("Paste some JSON first.", "err"); return; }
    importFromText(raw, "pasted JSON");
  });

  document.getElementById("reset-btn").addEventListener("click", () => {
    if (!confirm("This will erase all party and character data. Export first if you want a backup.\n\nReally reset?")) return;
    localStorage.removeItem(STORAGE_KEY);
    state = defaultState();
    renderAll();
    toast("All data reset");
  });

  // ---------- Toast ----------
  let toastTimer = null;
  function toast(msg, kind) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.textContent = msg;
    el.className = "toast" + (kind === "err" ? " err" : "");
    el.hidden = false;
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { el.hidden = true; }, 2400);
  }

  // ---------- Helpers ----------
  function escape(s) {
    if (s == null) return "";
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function clampInt(v, mn, mx, fallback) {
    const n = parseInt(v, 10);
    if (isNaN(n)) return fallback;
    return Math.min(mx, Math.max(mn, n));
  }
  function flash(id, msg) {
    const b = document.getElementById(id);
    const orig = b.textContent;
    b.textContent = msg;
    setTimeout(() => { b.textContent = orig; }, 900);
  }

  function renderAll() {
    populateClassPicker();
    renderParty();
    renderCharacters();
    renderModifierDeck();
    renderConditions();
    renderElements();
    renderRules("");
    renderHistory();
    renderBestiary();
    renderItemsTab();
    updateSaveStamp();
  }

  // ---------- PWA: service worker + install prompt ----------
  function setOfflineBadge(text, kind) {
    const el = document.getElementById("offline-badge");
    if (!el) return;
    el.textContent = text;
    el.dataset.kind = kind || "";
  }

  function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) {
      setOfflineBadge("⚠ no offline support");
      return;
    }
    if (location.protocol === "file:") {
      // Service workers are not allowed on file://; fall back gracefully.
      setOfflineBadge("⚠ open via http:// for offline");
      return;
    }
    navigator.serviceWorker.register("./service-worker.js")
      .then((reg) => {
        if (reg.active && !navigator.serviceWorker.controller) {
          setOfflineBadge("✓ offline ready (reload)");
        } else {
          setOfflineBadge("✓ offline ready");
        }
        reg.addEventListener("updatefound", () => {
          const sw = reg.installing;
          if (!sw) return;
          sw.addEventListener("statechange", () => {
            if (sw.state === "installed" && navigator.serviceWorker.controller) {
              toast("Update available — reload to apply");
            }
          });
        });
      })
      .catch((err) => {
        console.warn("SW registration failed:", err);
        setOfflineBadge("⚠ offline unavailable");
      });
  }

  function setupInstallPrompt() {
    let deferred = null;
    const btn = document.getElementById("quick-install");
    if (!btn) return;
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      deferred = e;
      btn.hidden = false;
    });
    btn.addEventListener("click", async () => {
      if (!deferred) return;
      btn.disabled = true;
      deferred.prompt();
      const { outcome } = await deferred.userChoice;
      if (outcome === "accepted") {
        toast("Gloomhelper installed");
      }
      deferred = null;
      btn.hidden = true;
      btn.disabled = false;
    });
    window.addEventListener("appinstalled", () => {
      btn.hidden = true;
      toast("Installed — launch from your home screen / apps");
    });
  }

  registerServiceWorker();
  setupInstallPrompt();

  renderAll();
})();
