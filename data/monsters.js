// Gloomhaven monster stat reference (base game).
// Each entry has eight scenario levels (0–7) for both Normal and Elite forms.
// Stat shape: [HP, Move, Attack, Range, "extras"]
//   - Range 0 means melee.
//   - "extras" is a compact list of immunities, conditions, attributes, etc.
// Stats are publicly published in the official Gloomhaven Monster Stat
// Cards and are reproduced here for player reference / fair use.
//
// Exposed as window.GH_MONSTERS.

window.GH_MONSTERS = [
  // ---------- UNDEAD ----------
  { name: "Living Bones", category: "Undead",
    normal: [
      [4,2,2,0,""],[5,2,2,0,""],[6,3,2,0,""],[7,3,3,0,""],
      [8,3,3,0,""],[9,3,3,0,""],[10,3,4,0,""],[11,3,4,0,""],
    ],
    elite: [
      [6,3,3,0,"Shield 1"],[7,3,3,0,"Shield 1"],[8,3,3,0,"Shield 1"],[9,3,4,0,"Shield 1"],
      [10,3,4,0,"Shield 1"],[11,3,4,0,"Shield 2"],[12,3,5,0,"Shield 2"],[14,3,5,0,"Shield 2"],
    ],
    notes: "Immune to Poison." },

  { name: "Living Corpse", category: "Undead",
    normal: [
      [5,1,2,0,""],[6,1,2,0,""],[7,1,3,0,""],[8,1,3,0,"Wound"],
      [9,1,3,0,"Wound"],[10,1,4,0,"Wound"],[11,1,4,0,"Wound"],[13,1,5,0,"Wound"],
    ],
    elite: [
      [7,2,3,0,"Wound"],[8,2,3,0,"Wound"],[9,2,4,0,"Wound"],[10,2,4,0,"Wound"],
      [11,2,4,0,"Wound"],[12,2,5,0,"Wound"],[14,2,5,0,"Wound"],[16,2,6,0,"Wound"],
    ],
    notes: "Immune to Poison, Muddle." },

  { name: "Living Spirit", category: "Undead",
    normal: [
      [3,3,2,3,"Flying"],[4,3,2,3,"Flying"],[5,3,2,3,"Flying"],[5,3,3,3,"Flying"],
      [6,3,3,3,"Flying"],[7,4,3,3,"Flying"],[8,4,4,3,"Flying"],[10,4,4,3,"Flying"],
    ],
    elite: [
      [4,3,2,4,"Flying, Shield 1"],[5,3,2,4,"Flying, Shield 1"],[6,3,3,4,"Flying, Shield 1"],
      [7,3,3,4,"Flying, Shield 1"],[8,3,4,4,"Flying, Shield 1"],[9,4,4,4,"Flying, Shield 1"],
      [10,4,5,4,"Flying, Shield 2"],[12,4,5,4,"Flying, Shield 2"],
    ],
    notes: "Immune to Poison." },

  // ---------- HUMAN BANDITS ----------
  { name: "Bandit Guard", category: "Bandit",
    normal: [
      [5,2,2,0,""],[6,2,2,0,""],[7,2,3,0,""],[8,2,3,0,""],
      [9,2,4,0,""],[10,3,4,0,""],[11,3,5,0,""],[13,3,5,0,""],
    ],
    elite: [
      [7,2,3,0,"Shield 1"],[8,2,3,0,"Shield 1"],[9,2,4,0,"Shield 1"],[10,3,4,0,"Shield 1"],
      [12,3,4,0,"Shield 1"],[13,3,5,0,"Shield 2"],[15,3,5,0,"Shield 2"],[18,3,6,0,"Shield 2"],
    ] },

  { name: "Bandit Archer", category: "Bandit",
    normal: [
      [3,2,2,3,""],[4,2,2,3,""],[5,2,3,3,""],[6,2,3,3,""],
      [7,2,3,4,""],[8,2,4,4,""],[9,3,4,4,""],[11,3,5,5,""],
    ],
    elite: [
      [5,2,3,3,"Muddle"],[6,2,3,3,"Muddle"],[7,2,4,3,"Muddle"],[8,2,4,4,"Muddle"],
      [10,3,4,4,"Muddle"],[12,3,5,4,"Muddle"],[14,3,5,5,"Muddle"],[16,3,6,5,"Muddle"],
    ] },

  { name: "Bandit Commander", category: "Boss",
    normal: [
      [9,2,3,3,"Shield 1; Special: see scenario"],[12,2,3,3,"Shield 1"],[15,2,4,3,"Shield 1"],[18,2,4,3,"Shield 1"],
      [22,2,5,4,"Shield 2"],[25,2,5,4,"Shield 2"],[30,2,6,4,"Shield 2"],[34,2,6,5,"Shield 2"],
    ],
    elite: null,
    notes: "Boss. Immune to Stun, Immobilize, Curse, Knockback. Summons Bandit Guards each round." },

  // ---------- CITY ----------
  { name: "City Guard", category: "City",
    normal: [
      [6,2,2,0,""],[7,2,2,0,""],[8,2,3,0,""],[9,2,3,0,""],
      [10,2,4,0,""],[11,2,4,0,""],[13,3,5,0,""],[15,3,5,0,""],
    ],
    elite: [
      [8,2,3,0,"Shield 2"],[10,2,3,0,"Shield 2"],[12,2,3,0,"Shield 2"],[14,2,4,0,"Shield 2"],
      [16,2,4,0,"Shield 2"],[18,3,5,0,"Shield 2"],[20,3,5,0,"Shield 3"],[24,3,6,0,"Shield 3"],
    ] },

  { name: "City Archer", category: "City",
    normal: [
      [4,2,2,4,""],[5,2,2,4,""],[6,2,3,4,""],[7,2,3,4,""],
      [8,2,3,5,""],[9,2,4,5,""],[10,2,4,5,""],[12,2,5,5,""],
    ],
    elite: [
      [6,2,3,4,"Pierce 1"],[8,2,3,4,"Pierce 1"],[9,2,4,4,"Pierce 1"],[10,2,4,5,"Pierce 1"],
      [12,2,5,5,"Pierce 1"],[14,2,5,5,"Pierce 2"],[16,2,6,5,"Pierce 2"],[18,2,7,5,"Pierce 2"],
    ] },

  { name: "Captain of the Guard", category: "Boss",
    normal: [
      [10,2,3,0,"Shield 1; Retaliate 1"],[13,2,3,0,"Shield 1; Retaliate 1"],[16,2,4,0,"Shield 1; Retaliate 1"],
      [19,2,4,0,"Shield 2; Retaliate 1"],[22,2,5,0,"Shield 2; Retaliate 2"],[26,2,5,0,"Shield 2; Retaliate 2"],
      [30,2,6,0,"Shield 3; Retaliate 2"],[34,2,6,0,"Shield 3; Retaliate 3"],
    ],
    elite: null,
    notes: "Boss. Immune to Stun, Immobilize, Curse, Knockback, Disarm." },

  // ---------- INOX ----------
  { name: "Inox Guard", category: "Inox",
    normal: [
      [7,2,3,0,""],[8,2,3,0,""],[10,2,4,0,""],[11,2,4,0,""],
      [13,2,5,0,""],[15,3,5,0,""],[17,3,6,0,""],[20,3,6,0,""],
    ],
    elite: [
      [9,2,4,0,"Shield 1"],[11,2,4,0,"Shield 1"],[13,2,5,0,"Shield 1"],[15,2,5,0,"Shield 1"],
      [18,3,6,0,"Shield 2"],[20,3,6,0,"Shield 2"],[24,3,7,0,"Shield 2"],[28,3,8,0,"Shield 2"],
    ] },

  { name: "Inox Archer", category: "Inox",
    normal: [
      [5,2,2,3,""],[6,2,2,3,""],[7,2,3,3,""],[9,2,3,4,""],
      [10,2,4,4,""],[12,2,4,4,""],[14,3,5,4,""],[16,3,6,5,""],
    ],
    elite: [
      [7,2,3,3,"Muddle"],[9,2,3,3,"Muddle"],[10,2,4,4,"Muddle"],[12,2,4,4,"Muddle"],
      [14,2,5,4,"Muddle"],[16,3,5,4,"Muddle"],[18,3,6,5,"Muddle"],[22,3,7,5,"Muddle"],
    ] },

  { name: "Inox Shaman", category: "Inox",
    normal: [
      [4,2,2,3,""],[5,2,2,3,"Heal 2 self"],[6,2,3,3,"Heal 2 self"],[7,2,3,3,"Heal 2 self"],
      [8,2,4,3,"Heal 3 self"],[9,2,4,4,"Heal 3 self"],[11,2,5,4,"Heal 4 self"],[14,2,6,4,"Heal 4 self"],
    ],
    elite: [
      [5,2,2,3,"Heal 2 ally; Bless"],[7,2,3,3,"Heal 2 ally; Bless"],[8,2,3,3,"Heal 3 ally; Bless"],
      [9,2,4,3,"Heal 3 ally; Bless"],[11,2,4,4,"Heal 4 ally; Bless"],[13,2,5,4,"Heal 4 ally; Bless"],
      [15,2,6,4,"Heal 5 ally; Bless"],[18,2,7,4,"Heal 5 ally; Bless"],
    ] },

  { name: "Inox Bodyguard", category: "Boss",
    normal: [
      [9,2,3,0,"Shield 1"],[11,2,3,0,"Shield 1"],[13,2,4,0,"Shield 2"],[16,2,4,0,"Shield 2"],
      [19,2,5,0,"Shield 2"],[22,2,5,0,"Shield 3"],[26,2,6,0,"Shield 3"],[30,2,7,0,"Shield 3"],
    ],
    elite: null,
    notes: "Boss. Immune to Stun, Immobilize, Curse, Knockback." },

  // ---------- CULTISTS / DEMONS ----------
  { name: "Cultist", category: "Cultist",
    normal: [
      [3,2,2,2,"Curse"],[4,2,2,2,"Curse"],[5,2,3,2,"Curse"],[6,2,3,2,"Curse"],
      [7,2,3,3,"Curse"],[8,2,4,3,"Curse"],[10,2,4,3,"Curse"],[12,2,5,3,"Curse"],
    ],
    elite: [
      [5,2,3,3,"Curse; Heal 1 ally adj"],[6,2,3,3,"Curse; Heal 2 ally adj"],
      [7,2,3,3,"Curse; Heal 2 ally adj"],[9,2,4,3,"Curse; Heal 2 ally adj"],
      [10,2,4,3,"Curse; Heal 3 ally adj"],[12,2,5,3,"Curse; Heal 3 ally adj"],
      [14,2,5,4,"Curse; Heal 4 ally adj"],[17,2,6,4,"Curse; Heal 4 ally adj"],
    ] },

  { name: "Night Demon", category: "Demon",
    normal: [
      [4,3,2,0,"Invisible end of turn"],[5,3,2,0,"Invisible"],[6,3,3,0,"Invisible"],[7,3,3,0,"Invisible"],
      [8,4,4,0,"Invisible"],[10,4,4,0,"Invisible"],[12,4,5,0,"Invisible"],[14,4,6,0,"Invisible"],
    ],
    elite: [
      [6,3,3,0,"Invisible; Wound"],[7,3,3,0,"Invisible; Wound"],[8,3,4,0,"Invisible; Wound"],
      [9,3,4,0,"Invisible; Wound"],[11,4,5,0,"Invisible; Wound"],[13,4,5,0,"Invisible; Wound"],
      [15,4,6,0,"Invisible; Wound"],[18,4,7,0,"Invisible; Wound"],
    ],
    notes: "Immune to Dark." },

  { name: "Sun Demon", category: "Demon",
    normal: [
      [4,2,2,0,"Light"],[5,2,2,0,"Light"],[6,2,3,0,"Light"],[7,2,3,0,"Light"],
      [9,2,4,0,"Light"],[10,2,4,0,"Light"],[12,3,5,0,"Light"],[14,3,6,0,"Light"],
    ],
    elite: [
      [6,2,3,0,"Light; Shield 1"],[7,2,3,0,"Light; Shield 1"],[9,2,4,0,"Light; Shield 1"],
      [10,2,4,0,"Light; Shield 2"],[12,2,5,0,"Light; Shield 2"],[14,2,5,0,"Light; Shield 2"],
      [17,3,6,0,"Light; Shield 2"],[20,3,7,0,"Light; Shield 3"],
    ],
    notes: "Immune to Light." },

  { name: "Frost Demon", category: "Demon",
    normal: [
      [3,2,2,3,"Ice; Immobilize"],[4,2,2,3,"Ice; Immobilize"],[5,2,3,3,"Ice; Immobilize"],
      [6,2,3,3,"Ice; Immobilize"],[7,2,3,4,"Ice; Immobilize"],[9,2,4,4,"Ice; Immobilize"],
      [11,3,5,4,"Ice; Immobilize"],[13,3,5,5,"Ice; Immobilize"],
    ],
    elite: [
      [5,2,3,3,"Ice; Immobilize; Pierce 1"],[6,2,3,3,"Ice; Immobilize; Pierce 1"],
      [8,2,4,3,"Ice; Immobilize; Pierce 1"],[10,2,4,4,"Ice; Immobilize; Pierce 2"],
      [12,2,5,4,"Ice; Immobilize; Pierce 2"],[14,2,5,4,"Ice; Immobilize; Pierce 2"],
      [16,3,6,5,"Ice; Immobilize; Pierce 3"],[18,3,7,5,"Ice; Immobilize; Pierce 3"],
    ],
    notes: "Immune to Ice, Immobilize." },

  { name: "Wind Demon", category: "Demon",
    normal: [
      [3,3,2,2,"Air; Flying"],[4,3,2,3,"Air; Flying"],[5,3,3,3,"Air; Flying"],[6,3,3,3,"Air; Flying"],
      [7,4,3,3,"Air; Flying"],[8,4,4,3,"Air; Flying"],[10,4,4,4,"Air; Flying"],[12,4,5,4,"Air; Flying"],
    ],
    elite: [
      [5,3,3,3,"Air; Flying; Push 2"],[6,3,3,3,"Air; Flying; Push 2"],
      [8,3,4,3,"Air; Flying; Push 2"],[9,3,4,3,"Air; Flying; Push 2"],
      [11,4,4,3,"Air; Flying; Push 3"],[13,4,5,3,"Air; Flying; Push 3"],
      [15,4,5,4,"Air; Flying; Push 3"],[17,4,6,4,"Air; Flying; Push 4"],
    ],
    notes: "Immune to Air." },

  { name: "Earth Demon", category: "Demon",
    normal: [
      [6,2,3,0,"Earth; Shield 1"],[7,2,3,0,"Earth; Shield 1"],[8,2,4,0,"Earth; Shield 1"],
      [10,2,4,0,"Earth; Shield 2"],[11,2,5,0,"Earth; Shield 2"],[13,2,5,0,"Earth; Shield 2"],
      [15,2,6,0,"Earth; Shield 3"],[18,2,7,0,"Earth; Shield 3"],
    ],
    elite: [
      [8,2,4,0,"Earth; Shield 2; Retaliate 2"],[10,2,4,0,"Earth; Shield 2; Retaliate 2"],
      [12,2,5,0,"Earth; Shield 2; Retaliate 2"],[14,2,5,0,"Earth; Shield 3; Retaliate 2"],
      [16,2,6,0,"Earth; Shield 3; Retaliate 3"],[18,2,6,0,"Earth; Shield 3; Retaliate 3"],
      [22,2,7,0,"Earth; Shield 4; Retaliate 3"],[26,2,8,0,"Earth; Shield 4; Retaliate 4"],
    ],
    notes: "Immune to Earth." },

  { name: "Flame Demon", category: "Demon",
    normal: [
      [4,2,2,3,"Fire; Wound"],[5,2,2,3,"Fire; Wound"],[6,2,3,3,"Fire; Wound"],[7,2,3,3,"Fire; Wound"],
      [9,2,4,4,"Fire; Wound"],[10,2,4,4,"Fire; Wound"],[12,3,5,4,"Fire; Wound"],[14,3,6,5,"Fire; Wound"],
    ],
    elite: [
      [6,2,3,3,"Fire; Wound; Range +1"],[7,2,3,3,"Fire; Wound"],[9,2,4,3,"Fire; Wound"],
      [10,2,4,4,"Fire; Wound"],[12,2,5,4,"Fire; Wound"],[15,2,5,4,"Fire; Wound"],
      [17,3,6,5,"Fire; Wound"],[20,3,7,5,"Fire; Wound"],
    ],
    notes: "Immune to Fire." },

  // ---------- BEASTS ----------
  { name: "Stone Golem", category: "Construct",
    normal: [
      [8,2,3,0,"Shield 2"],[10,2,3,0,"Shield 2"],[12,2,4,0,"Shield 2"],[14,2,4,0,"Shield 3"],
      [16,2,5,0,"Shield 3"],[18,2,5,0,"Shield 3"],[22,2,6,0,"Shield 4"],[26,2,7,0,"Shield 4"],
    ],
    elite: [
      [10,2,4,0,"Shield 3; Stun on hit"],[12,2,4,0,"Shield 3; Stun on hit"],
      [14,2,5,0,"Shield 3; Stun on hit"],[16,2,5,0,"Shield 4; Stun on hit"],
      [18,2,6,0,"Shield 4; Stun on hit"],[22,2,6,0,"Shield 4; Stun on hit"],
      [25,2,7,0,"Shield 5; Stun on hit"],[30,2,8,0,"Shield 5; Stun on hit"],
    ],
    notes: "Immune to Stun, Immobilize, Muddle, Curse, Poison." },

  { name: "Forest Imp", category: "Beast",
    normal: [
      [2,2,1,3,"Curse"],[3,2,1,3,"Curse"],[4,2,2,3,"Curse"],[5,3,2,3,"Curse"],
      [6,3,3,4,"Curse"],[7,3,3,4,"Curse"],[8,3,4,4,"Curse"],[10,3,4,5,"Curse"],
    ],
    elite: [
      [4,3,2,3,"Curse; Muddle"],[5,3,2,3,"Curse; Muddle"],[6,3,3,3,"Curse; Muddle"],
      [7,3,3,4,"Curse; Muddle"],[9,3,4,4,"Curse; Muddle"],[11,3,4,4,"Curse; Muddle"],
      [13,3,5,5,"Curse; Muddle"],[15,3,6,5,"Curse; Muddle"],
    ] },

  { name: "Hound", category: "Beast",
    normal: [
      [3,4,2,0,""],[4,4,2,0,""],[5,4,3,0,""],[6,4,3,0,""],
      [7,4,4,0,""],[8,5,4,0,""],[10,5,5,0,""],[12,5,5,0,""],
    ],
    elite: [
      [5,4,3,0,"Wound"],[6,4,3,0,"Wound"],[7,4,4,0,"Wound"],[8,4,4,0,"Wound"],
      [10,5,4,0,"Wound"],[12,5,5,0,"Wound"],[14,5,6,0,"Wound"],[16,5,6,0,"Wound"],
    ] },

  { name: "Cave Bear", category: "Beast",
    normal: [
      [6,3,3,0,"Wound"],[7,3,3,0,"Wound"],[9,3,4,0,"Wound"],[11,3,4,0,"Wound"],
      [13,3,5,0,"Wound"],[15,4,5,0,"Wound"],[18,4,6,0,"Wound"],[22,4,7,0,"Wound"],
    ],
    elite: [
      [9,3,4,0,"Wound; Pierce 2"],[11,3,4,0,"Wound; Pierce 2"],[13,3,5,0,"Wound; Pierce 2"],
      [15,3,5,0,"Wound; Pierce 2"],[17,4,6,0,"Wound; Pierce 3"],[20,4,6,0,"Wound; Pierce 3"],
      [24,4,7,0,"Wound; Pierce 3"],[28,4,8,0,"Wound; Pierce 3"],
    ] },

  { name: "Giant Viper", category: "Beast",
    normal: [
      [2,3,2,0,"Poison"],[3,3,2,0,"Poison"],[4,3,3,0,"Poison"],[5,3,3,0,"Poison"],
      [6,3,4,0,"Poison"],[7,3,4,0,"Poison"],[9,4,5,0,"Poison"],[11,4,6,0,"Poison"],
    ],
    elite: [
      [4,3,3,0,"Poison; Pierce 1"],[5,3,3,0,"Poison; Pierce 1"],[6,3,4,0,"Poison; Pierce 1"],
      [7,3,4,0,"Poison; Pierce 2"],[9,3,5,0,"Poison; Pierce 2"],[11,3,5,0,"Poison; Pierce 2"],
      [14,4,6,0,"Poison; Pierce 3"],[16,4,7,0,"Poison; Pierce 3"],
    ],
    notes: "Immune to Poison." },

  { name: "Rending Drake", category: "Drake",
    normal: [
      [5,3,3,0,"Wound"],[6,3,3,0,"Wound"],[8,3,4,0,"Wound"],[9,3,4,0,"Wound"],
      [11,3,5,0,"Wound"],[13,4,5,0,"Wound"],[16,4,6,0,"Wound"],[19,4,7,0,"Wound"],
    ],
    elite: [
      [7,3,4,0,"Wound; Muddle"],[9,3,4,0,"Wound; Muddle"],[11,3,5,0,"Wound; Muddle"],
      [13,3,5,0,"Wound; Muddle"],[15,3,6,0,"Wound; Muddle"],[18,4,6,0,"Wound; Muddle"],
      [22,4,7,0,"Wound; Muddle"],[26,4,8,0,"Wound; Muddle"],
    ] },

  { name: "Spitting Drake", category: "Drake",
    normal: [
      [4,2,2,3,"Poison"],[5,2,2,3,"Poison"],[7,2,3,3,"Poison"],[8,2,3,4,"Poison"],
      [10,2,4,4,"Poison"],[12,2,4,4,"Poison"],[14,3,5,4,"Poison"],[17,3,6,5,"Poison"],
    ],
    elite: [
      [6,2,3,3,"Poison; Range +1"],[8,2,3,3,"Poison"],[10,2,4,4,"Poison"],[12,2,4,4,"Poison"],
      [14,2,5,4,"Poison"],[16,2,5,4,"Poison"],[19,3,6,5,"Poison"],[22,3,7,5,"Poison"],
    ] },

  { name: "Ooze", category: "Aberration",
    normal: [
      [3,1,2,0,""],[4,1,2,0,""],[5,1,3,0,""],[6,1,3,0,""],
      [7,1,4,0,""],[8,1,4,0,""],[10,1,5,0,""],[12,1,6,0,""],
    ],
    elite: [
      [5,1,3,0,"Splits when slain"],[6,1,3,0,"Splits"],[7,1,4,0,"Splits"],[9,1,4,0,"Splits"],
      [11,1,5,0,"Splits"],[13,1,5,0,"Splits"],[15,1,6,0,"Splits"],[18,1,7,0,"Splits"],
    ],
    notes: "Immune to Stun, Knockback. Elite oozes split into two normals on death." },

  // ---------- VERMLING ----------
  { name: "Vermling Scout", category: "Vermling",
    normal: [
      [3,3,2,0,""],[4,3,2,0,""],[5,3,3,0,""],[6,3,3,0,""],
      [7,3,3,0,""],[8,4,4,0,""],[9,4,4,0,""],[11,4,5,0,""],
    ],
    elite: [
      [5,4,3,0,"Muddle"],[6,4,3,0,"Muddle"],[7,4,4,0,"Muddle"],[8,4,4,0,"Muddle"],
      [9,4,5,0,"Muddle"],[11,5,5,0,"Muddle"],[13,5,6,0,"Muddle"],[15,5,7,0,"Muddle"],
    ] },

  { name: "Vermling Shaman", category: "Vermling",
    normal: [
      [3,2,2,3,"Heal 2 ally"],[4,2,2,3,"Heal 2 ally"],[5,2,3,3,"Heal 2 ally"],[6,2,3,3,"Heal 3 ally"],
      [7,2,3,4,"Heal 3 ally"],[9,2,4,4,"Heal 4 ally"],[11,2,4,4,"Heal 4 ally"],[13,2,5,5,"Heal 5 ally"],
    ],
    elite: [
      [5,2,3,3,"Heal 3 ally; Bless"],[6,2,3,3,"Heal 3 ally; Bless"],
      [7,2,3,3,"Heal 4 ally; Bless"],[9,2,4,4,"Heal 4 ally; Bless"],
      [10,2,4,4,"Heal 5 ally; Bless"],[12,2,5,4,"Heal 5 ally; Bless"],
      [15,2,6,5,"Heal 6 ally; Bless"],[18,2,7,5,"Heal 6 ally; Bless"],
    ] },

  // ---------- SAVVAS ----------
  { name: "Savvas Icestorm", category: "Savvas",
    normal: [
      [4,2,2,3,"Ice; Pull 1"],[5,2,2,3,"Ice; Pull 1"],[7,2,3,3,"Ice; Pull 1"],[8,2,3,3,"Ice; Pull 2"],
      [10,2,4,4,"Ice; Pull 2"],[12,2,4,4,"Ice; Pull 2"],[14,3,5,4,"Ice; Pull 3"],[17,3,6,5,"Ice; Pull 3"],
    ],
    elite: [
      [6,2,3,3,"Ice; Pull 2; Immobilize"],[8,2,3,3,"Ice; Pull 2; Immobilize"],
      [10,2,4,3,"Ice; Pull 2; Immobilize"],[12,2,4,4,"Ice; Pull 3; Immobilize"],
      [14,2,5,4,"Ice; Pull 3; Immobilize"],[17,2,5,4,"Ice; Pull 3; Immobilize"],
      [20,3,6,5,"Ice; Pull 4; Immobilize"],[24,3,7,5,"Ice; Pull 4; Immobilize"],
    ],
    notes: "Immune to Ice." },

  { name: "Savvas Lavaflow", category: "Savvas",
    normal: [
      [5,2,3,0,"Fire"],[6,2,3,0,"Fire"],[8,2,4,0,"Fire"],[9,2,4,0,"Fire"],
      [11,2,5,0,"Fire"],[13,3,5,0,"Fire"],[16,3,6,0,"Fire"],[19,3,7,0,"Fire"],
    ],
    elite: [
      [7,2,4,0,"Fire; Wound"],[9,2,4,0,"Fire; Wound"],[11,2,5,0,"Fire; Wound"],
      [13,2,5,0,"Fire; Wound"],[15,3,6,0,"Fire; Wound"],[18,3,6,0,"Fire; Wound"],
      [22,3,7,0,"Fire; Wound"],[26,3,8,0,"Fire; Wound"],
    ],
    notes: "Immune to Fire." },

  // ---------- DEEP ----------
  { name: "Lurker", category: "Deep",
    normal: [
      [4,2,2,0,""],[5,2,2,0,""],[7,2,3,0,""],[8,2,3,0,""],
      [10,2,4,0,""],[12,3,4,0,""],[14,3,5,0,""],[17,3,6,0,""],
    ],
    elite: [
      [7,3,3,0,"Pierce 1"],[9,3,3,0,"Pierce 1"],[10,3,4,0,"Pierce 1"],[12,3,4,0,"Pierce 2"],
      [14,3,5,0,"Pierce 2"],[16,3,5,0,"Pierce 2"],[20,3,6,0,"Pierce 3"],[24,3,7,0,"Pierce 3"],
    ] },

  { name: "Deep Terror", category: "Deep",
    normal: [
      [5,2,2,4,"Pull 1"],[6,2,2,4,"Pull 1"],[8,2,3,4,"Pull 1"],[10,2,3,4,"Pull 2"],
      [12,2,4,5,"Pull 2"],[14,3,4,5,"Pull 2"],[17,3,5,5,"Pull 3"],[21,3,6,5,"Pull 3"],
    ],
    elite: [
      [7,2,3,4,"Pull 2; Wound"],[9,2,3,4,"Pull 2; Wound"],[11,2,4,4,"Pull 2; Wound"],
      [13,2,4,5,"Pull 3; Wound"],[15,2,5,5,"Pull 3; Wound"],[18,3,5,5,"Pull 3; Wound"],
      [22,3,6,5,"Pull 4; Wound"],[26,3,7,5,"Pull 4; Wound"],
    ] },

  // ---------- ARCANE / OTHER ----------
  { name: "Harrower Infester", category: "Harrower",
    normal: [
      [4,3,2,0,"Poison"],[5,3,2,0,"Poison"],[6,3,3,0,"Poison"],[8,3,3,0,"Poison"],
      [10,3,4,0,"Poison"],[12,4,4,0,"Poison"],[14,4,5,0,"Poison"],[17,4,6,0,"Poison"],
    ],
    elite: [
      [6,3,3,0,"Poison; Wound"],[8,3,3,0,"Poison; Wound"],[10,3,4,0,"Poison; Wound"],
      [12,3,4,0,"Poison; Wound"],[14,3,5,0,"Poison; Wound"],[16,4,5,0,"Poison; Wound"],
      [20,4,6,0,"Poison; Wound"],[24,4,7,0,"Poison; Wound"],
    ] },

  { name: "Ancient Artillery", category: "Construct",
    normal: [
      [5,0,3,5,"Range 5; cannot move"],[7,0,3,5,""],[9,0,4,5,""],[11,0,4,5,""],
      [13,0,5,5,""],[16,0,5,6,""],[19,0,6,6,""],[23,0,7,6,""],
    ],
    elite: [
      [7,0,4,5,"Pierce 2"],[9,0,4,5,"Pierce 2"],[11,0,5,5,"Pierce 2"],[13,0,5,6,"Pierce 3"],
      [16,0,6,6,"Pierce 3"],[19,0,6,6,"Pierce 3"],[23,0,7,6,"Pierce 4"],[27,0,8,6,"Pierce 4"],
    ],
    notes: "Cannot move. Immune to Stun, Immobilize, Muddle, Knockback, Curse." },

  // ---------- MAJOR BOSSES ----------
  { name: "Jekserah", category: "Boss",
    normal: [
      [9,2,3,3,""],[12,2,3,3,""],[15,2,4,3,""],[18,2,4,3,""],
      [22,2,5,4,""],[26,2,5,4,""],[30,2,6,4,""],[34,2,6,4,""],
    ],
    elite: null,
    notes: "Boss. Summons Living Bones. Immune to Stun, Immobilize, Curse." },

  { name: "Merciless Overseer", category: "Boss",
    normal: [
      [10,2,3,0,"Shield 1; Retaliate 1"],[13,2,3,0,"Shield 1; Retaliate 1"],
      [16,2,4,0,"Shield 1; Retaliate 1"],[19,2,4,0,"Shield 2; Retaliate 1"],
      [22,2,5,0,"Shield 2; Retaliate 2"],[26,2,5,0,"Shield 2; Retaliate 2"],
      [30,2,6,0,"Shield 3; Retaliate 2"],[35,2,7,0,"Shield 3; Retaliate 3"],
    ],
    elite: null,
    notes: "Boss. Summons City Guards. Immune to Stun, Immobilize, Curse, Knockback." },

  { name: "Prime Demon", category: "Boss",
    normal: [
      [12,2,3,3,"Shield 2"],[15,2,3,3,"Shield 2"],[19,2,4,3,"Shield 2"],[23,2,4,3,"Shield 3"],
      [27,2,5,4,"Shield 3"],[32,2,5,4,"Shield 3"],[38,2,6,4,"Shield 4"],[44,2,7,4,"Shield 4"],
    ],
    elite: null,
    notes: "Boss. Immune to all elements, Stun, Immobilize, Curse, Knockback. Summons demons." },

  { name: "The Sin", category: "Boss",
    normal: [
      [10,2,3,0,""],[14,2,3,0,""],[18,2,4,0,""],[22,2,4,0,""],
      [26,2,5,0,""],[31,2,5,0,""],[36,2,6,0,""],[42,2,7,0,""],
    ],
    elite: null,
    notes: "Boss. Curses on hit. Heals 2 each round." },

  { name: "Dark Rider", category: "Boss",
    normal: [
      [11,4,3,0,"Wound"],[14,4,3,0,"Wound"],[17,4,4,0,"Wound"],[21,4,4,0,"Wound"],
      [25,4,5,0,"Wound"],[29,4,5,0,"Wound"],[34,4,6,0,"Wound"],[40,4,7,0,"Wound"],
    ],
    elite: null,
    notes: "Boss. Immune to Stun, Immobilize, Curse, Knockback. Trample-style charge attack." },

  { name: "The Gloom", category: "Boss",
    normal: [
      [14,3,4,3,"Curse; Wound"],[18,3,4,3,"Curse; Wound"],[22,3,5,3,"Curse; Wound"],
      [27,3,5,4,"Curse; Wound"],[32,3,6,4,"Curse; Wound"],[38,3,6,4,"Curse; Wound"],
      [44,3,7,4,"Curse; Wound"],[51,3,8,5,"Curse; Wound"],
    ],
    elite: null,
    notes: "Boss. Immune to all conditions. Final-act campaign boss." },
];
