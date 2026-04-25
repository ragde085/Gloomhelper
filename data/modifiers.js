// Standard 20-card Gloomhaven attack modifier deck (per character)
// 6× +0, 5× +1, 5× -1, 1× +2, 1× -2, 1× ×2 (crit), 1× ×0 (miss)
window.GH_BASE_DECK = [
  { type: "value", v: 0, label: "+0" },
  { type: "value", v: 0, label: "+0" },
  { type: "value", v: 0, label: "+0" },
  { type: "value", v: 0, label: "+0" },
  { type: "value", v: 0, label: "+0" },
  { type: "value", v: 0, label: "+0" },
  { type: "value", v: 1, label: "+1" },
  { type: "value", v: 1, label: "+1" },
  { type: "value", v: 1, label: "+1" },
  { type: "value", v: 1, label: "+1" },
  { type: "value", v: 1, label: "+1" },
  { type: "value", v: -1, label: "-1" },
  { type: "value", v: -1, label: "-1" },
  { type: "value", v: -1, label: "-1" },
  { type: "value", v: -1, label: "-1" },
  { type: "value", v: -1, label: "-1" },
  { type: "value", v: 2, label: "+2" },
  { type: "value", v: -2, label: "-2" },
  { type: "crit",  v: 2, label: "×2" },
  { type: "miss",  v: 0, label: "×0" },
];

window.GH_BLESS = { type: "bless", v: 2, label: "Bless ×2" };
window.GH_CURSE = { type: "curse", v: 0, label: "Curse ×0" };
