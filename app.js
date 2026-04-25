// Gloomhelper — main application script

(() => {
  "use strict";

  const STORAGE_KEY = "gloomhelper.state.v1";

  const defaultState = () => ({
    party: { name: "", reputation: 0, location: "", prosperity: 1, achievements: [], scenarios: [] },
    characters: [],
    decks: {}, // keyed by character id, holds { deck: [], discard: [], blesses: 0, curses: 0, reshuffleNext: false }
    elements: { Fire: "inert", Ice: "inert", Air: "inert", Earth: "inert", Light: "inert", Dark: "inert" },
    activeModTarget: null,
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
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

  // ---------- Settings ----------
  document.getElementById("export-btn").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "gloomhelper-save-" + new Date().toISOString().slice(0, 10) + ".json";
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  });
  document.getElementById("import-file").addEventListener("change", (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      try {
        const obj = JSON.parse(r.result);
        state = Object.assign(defaultState(), obj);
        saveState();
        renderAll();
        alert("Imported successfully.");
      } catch (err) {
        alert("Could not import: " + err.message);
      }
    };
    r.readAsText(f);
  });
  document.getElementById("reset-btn").addEventListener("click", () => {
    if (!confirm("This will erase all party and character data. Continue?")) return;
    localStorage.removeItem(STORAGE_KEY);
    state = defaultState();
    renderAll();
  });

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
  }

  renderAll();
})();
