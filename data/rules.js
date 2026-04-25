window.GH_RULES = [
  {
    title: "Round Structure",
    body:
      "A round consists of: (1) Card Selection — every player picks two ability cards (or declares a long rest); (2) Determining Initiative — players reveal cards and a leading card sets initiative; (3) Character & Monster Turns in initiative order, lowest first; (4) End of Round cleanup — element infusions degrade, end-of-round effects trigger.",
  },
  {
    title: "Performing a Turn",
    body:
      "On a character's turn, perform the top action of one of your two cards and the bottom action of the other, in any order. Either action can be replaced with the default Attack 2 (top) or Move 2 (bottom). After your turn, place both cards in your discard or lost pile depending on the actions used.",
  },
  {
    title: "Resting",
    body:
      "When you have only 0 or 1 cards left in hand, you must rest before your next turn. Short Rest: shuffle discard, lose one random card, recover the rest. Long Rest (a full turn at initiative 99): refresh items, choose which card to lose, recover others, heal 2.",
  },
  {
    title: "Attacks & Modifiers",
    body:
      "Attack X = roll the top of your modifier deck and apply (×0, -2, -1, +0, +1, +2, ×2). Advantage draws two cards and uses the better of the values (or the rolling+other if either is rolling); Disadvantage uses the lesser. The deck is reshuffled at the end of any round in which a ×2 (crit) or ×0 (miss) was drawn.",
  },
  {
    title: "Range, Line of Sight & Targeting",
    body:
      "Range counts hexes including the target's hex but not the attacker's. Melee = no range listed. Line of sight requires a clear straight line between any two corners of the attacker and target hex that is not blocked by walls or thin black border edges (obstacles do NOT block LoS, but do block movement).",
  },
  {
    title: "Movement Rules",
    body:
      "Move N = move up to N hexes. You may not enter hexes containing other figures, obstacles, walls, or hazardous terrain (unless flying). Difficult terrain costs +1 movement. Jump moves ignore figures and terrain (but you must end in a legal hex). Fly ignores everything.",
  },
  {
    title: "Damage, Shields & Pierce",
    body:
      "Shield X reduces incoming attack damage by X (after modifiers). Pierce X ignores up to X shield. Retaliate X deals X damage back to attackers within range when attacked. Damage cannot reduce an attack below 0.",
  },
  {
    title: "Conditions",
    body:
      "Negative: Stun, Immobilize, Disarm, Wound, Poison, Muddle, Curse. Positive: Bless, Strengthen, Invisible, Regenerate. See the Conditions tab for full effects. Most negative conditions are removed at the end of the affected figure's next turn (Wound and Poison persist).",
  },
  {
    title: "Elemental Infusions",
    body:
      "Six elements: Fire, Ice, Air, Earth, Light, Dark. Infused elements start the next round Strong; if not consumed, they degrade to Waning at end of next round, then Inert. Strong elements may be consumed for ability bonuses indicated on cards.",
  },
  {
    title: "Looting",
    body:
      "Loot N = pick up money tokens / loot tiles in N range. You may also loot the hex you are standing on as a free action at the end of your move. Money tokens are based on scenario level (2× character level for solo). Coins go to your purse and convert to gold during city events.",
  },
  {
    title: "Experience & Leveling",
    body:
      "Cards show XP gained by performing certain actions. At end of scenario, XP per player = scenario level + 4 (+1 if scenario succeeded). Level up at the XP thresholds: 45/95/150/210/275/345/420/500. Each level grants +1 perk and a new card choice.",
  },
  {
    title: "Gold & Items",
    body:
      "Gold is earned by looting and town events. Items are bought at the shop (cost = listed gold × 1.10 per +1 reputation discount or surcharge). Each character has Head/Body/Legs/Two Hands worth of slots, plus small item slots equal to character level / 2 rounded up.",
  },
  {
    title: "City & Road Events",
    body:
      "Draw a city event when arriving in town and a road event when traveling between scenarios (skip the first time). Resolve immediately, then place at the bottom of the deck or remove if instructed.",
  },
  {
    title: "Scenario End",
    body:
      "A scenario succeeds when the listed objective is met (often kill all enemies). It fails when all party members are exhausted or scenario-specific failure conditions trigger. On success, gain XP, gold tracked, possible items, and check the next scenario's branching.",
  },
  {
    title: "Retirement",
    body:
      "Each character has a Personal Quest. Completing it retires the character and unlocks rewards (often a new class). The retiring player creates a new character at the prosperity level of the town (level 1 minimum).",
  },
  {
    title: "Prosperity",
    body:
      "Town prosperity is tracked from 1 to 9. Increases through achievements and certain events. Higher prosperity unlocks more shop items and a higher minimum starting level for new characters.",
  },
  {
    title: "Battle Goals",
    body:
      "At the start of each scenario, deal each player 2 battle goal cards; they choose 1 to keep secret. If completed, gain checks; every 3 checks earns a perk.",
  },
];
