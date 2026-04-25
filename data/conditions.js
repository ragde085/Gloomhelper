// Gloomhaven conditions reference
window.GH_CONDITIONS = [
  {
    name: "Stun",
    type: "negative",
    icon: "★",
    short: "Cannot perform any actions on next turn.",
    detail:
      "A stunned figure cannot perform any actions on its next turn. It must still perform a long rest if it has no cards available. The condition is removed at the end of that turn.",
  },
  {
    name: "Immobilize",
    type: "negative",
    icon: "⛔",
    short: "Cannot perform any move actions on next turn.",
    detail:
      "An immobilized figure cannot perform any move actions on its next turn. It can still attack, use items, etc. Removed at the end of the turn.",
  },
  {
    name: "Disarm",
    type: "negative",
    icon: "🛡",
    short: "Cannot perform any attack actions on next turn.",
    detail:
      "A disarmed figure cannot perform any attack actions on its next turn. Removed at the end of the turn.",
  },
  {
    name: "Wound",
    type: "negative",
    icon: "🩸",
    short: "Suffer 1 damage at the start of each turn.",
    detail:
      "A wounded figure suffers 1 damage at the start of each of its turns. Wound persists until removed by a heal effect or by the figure being defeated.",
  },
  {
    name: "Poison",
    type: "negative",
    icon: "☣",
    short: "+1 damage from all attacks until healed.",
    detail:
      "A poisoned figure suffers +1 damage from any attack against it. Persists until cured by a heal effect of any value (but the heal value itself is not applied unless poison is the only condition).",
  },
  {
    name: "Muddle",
    type: "negative",
    icon: "❓",
    short: "Disadvantage on all attacks until end of next turn.",
    detail:
      "A muddled figure attacks with disadvantage. Removed at the end of its next turn.",
  },
  {
    name: "Curse",
    type: "negative",
    icon: "✦",
    short: "Add a Null curse card to the target's modifier deck.",
    detail:
      "Adds one null (×0) Curse card to the target's attack modifier deck. The curse card is removed when drawn. There are 10 curse cards per deck (max).",
  },
  {
    name: "Strengthen",
    type: "positive",
    icon: "💪",
    short: "Advantage on all attacks until end of next turn.",
    detail:
      "A strengthened figure makes attacks with advantage. Removed at the end of its next turn.",
  },
  {
    name: "Bless",
    type: "positive",
    icon: "✨",
    short: "Add a 2× Bless card to the target's modifier deck.",
    detail:
      "Adds one (×2) Bless card to the target's attack modifier deck. The bless card is removed when drawn. There are 10 bless cards (max).",
  },
  {
    name: "Invisible",
    type: "positive",
    icon: "👁",
    short: "Cannot be focused or targeted by enemies.",
    detail:
      "An invisible figure cannot be focused on or targeted by enemies. It can still suffer damage from area attacks, traps, and other non-targeted effects. Removed at the end of its next turn.",
  },
  {
    name: "Regenerate",
    type: "positive",
    icon: "♻",
    short: "Recover 1 HP at the start of each turn (active conditions cured first).",
    detail:
      "At the start of each of its turns, a regenerating figure first removes a single negative condition (Wound, Poison) and then heals 1. Regenerate persists until the figure is exhausted or another effect removes it.",
  },
];
