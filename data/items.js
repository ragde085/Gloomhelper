// Gloomhaven base-game items reference (001–150).
// Each entry: { id, name, slot, cost, prosperity, use, effect }
//   - slot:       Head | Body | Legs | One Hand | Two Hands | Small | Chest
//   - cost:       gold cost (base; modify by reputation)
//   - prosperity: prosperity level required (1 = always available)
//   - use:        "spent" / "consumed" / "persistent"
//   - effect:     short summary
// Stats reproduced from the publicly published Gloomhaven Item Reference Cards
// for fair-use player reference.
//
// Exposed as window.GH_ITEMS.

window.GH_ITEMS = [
  // ---------- Prosperity 1 (Starting Items) ----------
  { id: "001", name: "Boots of Striding",        slot: "Legs",      cost: 20, prosperity: 1, use: "spent",      effect: "During your move, gain Move +2." },
  { id: "002", name: "Winged Shoes",             slot: "Legs",      cost: 35, prosperity: 1, use: "spent",      effect: "During your move, ignore figures and difficult terrain (must end in legal hex)." },
  { id: "003", name: "Leather Armor",            slot: "Body",      cost: 20, prosperity: 1, use: "spent",      effect: "When attacked, suffer -1 damage." },
  { id: "004", name: "Hide Armor",               slot: "Body",      cost: 30, prosperity: 1, use: "spent×2",    effect: "When attacked, suffer -1 damage (2 charges)." },
  { id: "005", name: "Chainmail",                slot: "Body",      cost: 40, prosperity: 1, use: "spent",      effect: "When attacked by a non-melee attack, suffer -1 damage." },
  { id: "006", name: "Iron Helmet",              slot: "Head",      cost: 20, prosperity: 1, use: "consumed",   effect: "When attacked, suffer -2 damage (consumed)." },
  { id: "007", name: "Eagle Eye Goggles",        slot: "Head",      cost: 30, prosperity: 1, use: "spent",      effect: "Make an attack with advantage." },
  { id: "008", name: "Heater Shield",            slot: "One Hand",  cost: 20, prosperity: 1, use: "spent",      effect: "When attacked, suffer -1 damage." },
  { id: "009", name: "Wooden Shield",            slot: "Two Hands", cost: 25, prosperity: 1, use: "spent",      effect: "When attacked by a melee attack, suffer -2 damage." },
  { id: "010", name: "Minor Power Potion",       slot: "Small",     cost: 10, prosperity: 1, use: "consumed",   effect: "Gain Attack +1 for an attack action." },
  { id: "011", name: "Major Power Potion",       slot: "Small",     cost: 20, prosperity: 1, use: "consumed",   effect: "Gain Attack +2 for an attack action." },
  { id: "012", name: "Minor Stamina Potion",     slot: "Small",     cost: 10, prosperity: 1, use: "consumed",   effect: "Recover up to 2 cards from your discard pile." },
  { id: "013", name: "Major Stamina Potion",     slot: "Small",     cost: 30, prosperity: 1, use: "consumed",   effect: "Recover up to 4 cards from your discard pile." },
  { id: "014", name: "Minor Healing Potion",     slot: "Small",     cost: 10, prosperity: 1, use: "consumed",   effect: "Heal self 3." },
  { id: "015", name: "Major Healing Potion",     slot: "Small",     cost: 30, prosperity: 1, use: "consumed",   effect: "Heal self 5." },
  { id: "016", name: "Piercing Bow",             slot: "Two Hands", cost: 20, prosperity: 1, use: "spent",      effect: "Add Pierce 3 to a ranged attack." },
  { id: "017", name: "Cloak of Invisibility",    slot: "Body",      cost: 50, prosperity: 1, use: "spent",      effect: "Become Invisible until your next turn." },
  { id: "018", name: "Stun Powder",              slot: "Small",     cost: 30, prosperity: 1, use: "consumed",   effect: "Add Stun to a melee attack." },
  { id: "019", name: "Heal Kit",                 slot: "Small",     cost: 30, prosperity: 1, use: "consumed",   effect: "Heal an adjacent ally 3." },
  { id: "020", name: "Poison Dagger",            slot: "One Hand",  cost: 15, prosperity: 1, use: "spent",      effect: "Add Poison to a melee attack." },
  { id: "021", name: "Power Core",               slot: "Body",      cost: 30, prosperity: 1, use: "spent",      effect: "Gain Move +2 and Attack +1 on your next turn." },
  { id: "022", name: "War Hammer",               slot: "Two Hands", cost: 20, prosperity: 1, use: "spent",      effect: "Add Stun and Push 1 to a melee attack." },
  { id: "023", name: "Spiked Shield",            slot: "One Hand",  cost: 30, prosperity: 1, use: "persistent", effect: "Retaliate 1." },
  { id: "024", name: "Ring of Healing",          slot: "Small",     cost: 30, prosperity: 1, use: "spent",      effect: "After an attack, heal self 2." },
  { id: "025", name: "Pendant of Dark Pacts",    slot: "Small",     cost: 30, prosperity: 1, use: "spent",      effect: "Use during a heal action: gain Heal +2; suffer 1 damage." },
  { id: "026", name: "Cloak of Pockets",         slot: "Body",      cost: 30, prosperity: 1, use: "persistent", effect: "+1 small item slot." },

  // ---------- Prosperity 2 ----------
  { id: "027", name: "Long Spear",               slot: "Two Hands", cost: 30, prosperity: 2, use: "spent",      effect: "Range +2 to a melee attack." },
  { id: "028", name: "Throwing Knives",          slot: "One Hand",  cost: 20, prosperity: 2, use: "spent",      effect: "Add Range 3 to a melee attack." },
  { id: "029", name: "Tower Shield",             slot: "Two Hands", cost: 60, prosperity: 2, use: "spent",      effect: "When attacked, suffer -2 damage." },
  { id: "030", name: "Scroll of Lightning",      slot: "Small",     cost: 30, prosperity: 2, use: "consumed",   effect: "Attack 3 against any target in line of sight; create Air." },
  { id: "031", name: "Battle Axe",               slot: "Two Hands", cost: 40, prosperity: 2, use: "spent",      effect: "Attack +2 to a melee attack." },
  { id: "032", name: "Hand Axe",                 slot: "One Hand",  cost: 20, prosperity: 2, use: "spent",      effect: "Attack +1 to a melee attack." },
  { id: "033", name: "Reaper's Scythe",          slot: "Two Hands", cost: 50, prosperity: 2, use: "spent",      effect: "After a melee attack on an enemy you killed, attack an adjacent enemy with the same attack." },
  { id: "034", name: "Two Minor Power Potions",  slot: "Small",     cost: 15, prosperity: 2, use: "consumed",   effect: "Two charges of Attack +1." },

  // ---------- Prosperity 3 ----------
  { id: "035", name: "Cloak of Phasing",         slot: "Body",      cost: 80, prosperity: 3, use: "spent",      effect: "Gain Move +2 and ignore enemies for the move." },
  { id: "036", name: "Robes of Summoning",       slot: "Body",      cost: 70, prosperity: 3, use: "persistent", effect: "Summon's HP +1, +1 attack." },
  { id: "037", name: "Cloak of Charisma",        slot: "Body",      cost: 80, prosperity: 3, use: "persistent", effect: "Reduce all item costs in shop by 10%." },
  { id: "038", name: "Eagle Eye Goggles +1",     slot: "Head",      cost: 60, prosperity: 3, use: "spent×2",    effect: "Two charges: make an attack with advantage." },
  { id: "039", name: "Telescoping Lens",         slot: "Head",      cost: 30, prosperity: 3, use: "spent",      effect: "Range +1 on a ranged attack action." },
  { id: "040", name: "Cloak of Many Colors",     slot: "Body",      cost: 75, prosperity: 3, use: "spent",      effect: "Become Invisible." },
  { id: "041", name: "Black Boots",              slot: "Legs",      cost: 60, prosperity: 3, use: "persistent", effect: "Gain Invisible at start of round if standing still." },
  { id: "042", name: "Cloak of Storms",          slot: "Body",      cost: 85, prosperity: 3, use: "spent",      effect: "Generate Air. Push 1 all enemies adjacent." },

  // ---------- Prosperity 4 ----------
  { id: "043", name: "Drakescale Helm",          slot: "Head",      cost: 50, prosperity: 4, use: "spent",      effect: "Ignore the next negative scenario effect." },
  { id: "044", name: "Drakescale Armor",         slot: "Body",      cost: 80, prosperity: 4, use: "spent×2",    effect: "When attacked, suffer -2 damage (2 charges)." },
  { id: "045", name: "Cloak of Pulse",           slot: "Body",      cost: 70, prosperity: 4, use: "spent",      effect: "When you attack, generate any element." },
  { id: "046", name: "Boots of Quickness",       slot: "Legs",      cost: 60, prosperity: 4, use: "spent",      effect: "Gain Move +3 once." },
  { id: "047", name: "Spirit Lamp",              slot: "One Hand",  cost: 50, prosperity: 4, use: "persistent", effect: "Generate Light at the end of each of your turns." },
  { id: "048", name: "Goggles of the Hawk",      slot: "Head",      cost: 60, prosperity: 4, use: "persistent", effect: "Range +1 on all ranged attacks." },
  { id: "049", name: "Wand of Sluggishness",     slot: "One Hand",  cost: 60, prosperity: 4, use: "spent",      effect: "Add Muddle and Immobilize to a ranged attack." },

  // ---------- Prosperity 5 ----------
  { id: "050", name: "Necklace of Teeth",        slot: "Small",     cost: 80, prosperity: 5, use: "spent",      effect: "Add Curse to your next attack." },
  { id: "051", name: "Skullbasher",              slot: "Two Hands", cost: 80, prosperity: 5, use: "spent",      effect: "Attack +3 and Stun on a melee attack." },
  { id: "052", name: "Wand of Healing",          slot: "One Hand",  cost: 70, prosperity: 5, use: "spent",      effect: "Heal 3, Range 3." },
  { id: "053", name: "Boots of Dashing",         slot: "Legs",      cost: 80, prosperity: 5, use: "spent",      effect: "After a move, perform another Move 2." },
  { id: "054", name: "Frost Helm",               slot: "Head",      cost: 70, prosperity: 5, use: "spent",      effect: "Generate Ice; gain Shield 2 for the round." },
  { id: "055", name: "Shoes of Happiness",       slot: "Legs",      cost: 75, prosperity: 5, use: "persistent", effect: "Gain +1 maximum hit point." },

  // ---------- Prosperity 6 ----------
  { id: "056", name: "Volatile Bomb",            slot: "Small",     cost: 30, prosperity: 6, use: "consumed",   effect: "Attack 3 to all enemies adjacent; suffer 1 damage." },
  { id: "057", name: "Frost Bomb",               slot: "Small",     cost: 30, prosperity: 6, use: "consumed",   effect: "Generate Ice; Immobilize all adjacent enemies." },
  { id: "058", name: "Sun Shield",               slot: "One Hand",  cost: 90, prosperity: 6, use: "spent",      effect: "Generate Light; Shield 2." },
  { id: "059", name: "Moon Earring",             slot: "Small",     cost: 50, prosperity: 6, use: "persistent", effect: "Generate Dark when you become Invisible." },
  { id: "060", name: "Ring of Brutality",        slot: "Small",     cost: 60, prosperity: 6, use: "spent",      effect: "Attack +2 to a melee attack and Pierce 1." },

  // ---------- Prosperity 7 ----------
  { id: "061", name: "Eagle Talons",             slot: "One Hand",  cost: 90, prosperity: 7, use: "persistent", effect: "Your melee attacks gain Pierce 1." },
  { id: "062", name: "Scroll of Crippling Curse",slot: "Small",     cost: 60, prosperity: 7, use: "consumed",   effect: "Curse and Immobilize a target in line of sight." },
  { id: "063", name: "Cloak of Vitality",        slot: "Body",      cost: 90, prosperity: 7, use: "persistent", effect: "+2 maximum HP." },
  { id: "064", name: "Royal Helmet",             slot: "Head",      cost: 90, prosperity: 7, use: "persistent", effect: "When attacked while at full HP, suffer -1 damage." },

  // ---------- Prosperity 8 ----------
  { id: "065", name: "Shadow Boots",             slot: "Legs",      cost: 90, prosperity: 8, use: "persistent", effect: "Generate Dark when you move 3 or more hexes." },
  { id: "066", name: "Mask of Tongues",          slot: "Head",      cost: 80, prosperity: 8, use: "persistent", effect: "Reroll one attack modifier per scenario." },
  { id: "067", name: "Quiver of Lightning",      slot: "Small",     cost: 100, prosperity: 8, use: "consumed",  effect: "Add Attack +2 and Pierce 3 to a ranged attack." },
  { id: "068", name: "Inscribed Armor",          slot: "Body",      cost: 110, prosperity: 8, use: "persistent",effect: "Immune to Wound." },

  // ---------- Prosperity 9 ----------
  { id: "069", name: "Ring of Skulls",           slot: "Small",     cost: 110, prosperity: 9, use: "spent",     effect: "After an attack kills an enemy, perform Heal 2 self." },
  { id: "070", name: "Cloak of Shimmering",      slot: "Body",      cost: 120, prosperity: 9, use: "persistent",effect: "+1 to attack-modifier deck shuffle (avoid more nulls)." },
  { id: "071", name: "Crown of the Worldweaver", slot: "Head",      cost: 130, prosperity: 9, use: "spent",     effect: "Generate two elements of your choice." },
  { id: "072", name: "Boots of Levitation",      slot: "Legs",      cost: 110, prosperity: 9, use: "spent",     effect: "Gain Flying for the move." },

  // ---------- Random Item Designs / Random Dungeon ----------
  { id: "100", name: "Doomed Coin Pouch",        slot: "Small",     cost: 0,  prosperity: 1, use: "persistent", effect: "Loot 1 = 2 coins; -1 to all attack modifier draws." },
  { id: "101", name: "Empowering Talisman",      slot: "Small",     cost: 30, prosperity: 1, use: "spent",      effect: "Recover one ability card from your lost pile." },
  { id: "102", name: "Iron Stomach",             slot: "Small",     cost: 25, prosperity: 1, use: "persistent", effect: "Immune to Poison." },

  // ---------- Class-specific / Solo / Envelope items (selected) ----------
  { id: "120", name: "Stalwart Armor",           slot: "Body",      cost: 60, prosperity: 1, use: "persistent", effect: "Immune to Wound while at full HP. (Brute solo item)" },
  { id: "121", name: "Tinkerer's Tools",         slot: "Small",     cost: 40, prosperity: 1, use: "spent",      effect: "Resurrect an exhausted summon at half HP. (Tinkerer solo)" },
  { id: "122", name: "Mana-Charged Stone",       slot: "Small",     cost: 30, prosperity: 1, use: "spent",      effect: "Generate any element. (Spellweaver solo)" },
  { id: "123", name: "Black Bow",                slot: "Two Hands", cost: 70, prosperity: 1, use: "persistent", effect: "Ranged attacks generate Dark. (Scoundrel solo)" },
  { id: "124", name: "Earthen Pact",             slot: "Body",      cost: 60, prosperity: 1, use: "spent",      effect: "Generate Earth; Shield 2 until next turn. (Cragheart solo)" },
  { id: "125", name: "Mind-Bending Helm",        slot: "Head",      cost: 60, prosperity: 1, use: "spent",      effect: "Take control of one summoned figure for one turn. (Mindthief solo)" },
];
