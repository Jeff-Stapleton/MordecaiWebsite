export type SystemPage = {
  slug: string
  navLabel: string
  title: string
  eyebrow: string
  oneLiner: string
  accent: string
  highlights: string[]
  sections: Array<{
    title: string
    body: string
    items?: string[]
  }>
}

export const systems: SystemPage[] = [
  {
    slug: 'combat',
    navLabel: 'Combat',
    title: 'Combat',
    eyebrow: 'Read · React · Open',
    oneLiner:
      'Read the fight, manage stamina, and turn precise defense into decisive openings.',
    accent: 'var(--tt-danger)',
    highlights: ['Twin-stick control', 'Tiered stamina', 'Posture openings'],
    sections: [
      {
        title: 'Aim while you move',
        body: 'Movement and aim are independent beneath a fixed diorama camera. Light and heavy weapon chains, throws, and spells share the same readable combat space.',
      },
      {
        title: 'Spend your footing',
        body: 'Stamina moves through Green, Yellow, Red, and Exhausted tiers. Each tier changes effectiveness, making resource pressure part of every decision.',
      },
      {
        title: 'Defense creates offense',
        body: 'Perfect dodges, perfect blocks, parries, and posture breaks provide direct feedback. Breaking enemy posture creates stagger, knockdown, and critical openings.',
      },
      {
        title: 'Magic in the fight',
        body: 'Spell Points are discrete and upcasting doubles a spell’s cost. Fireball, Blink, Stone Skin, and Restoration are the current core spell set.',
      },
    ],
  },
  {
    slug: 'progression',
    navLabel: 'Progression',
    title: 'Character & Progression',
    eyebrow: 'Practice · Rank · Earn',
    oneLiner:
      'Build mastery through nine attributes, granular skills, and feats earned by what you accomplish.',
    accent: 'var(--tt-spell-points)',
    highlights: ['9 attributes', 'Skills rank to 20', 'Earned feats'],
    sections: [
      {
        title: 'Nine attributes',
        body: 'Strength, Dexterity, Endurance, Constitution, Resolve, Discipline, Intelligence, Wisdom, and Charisma shape physical, resilience, and magical builds.',
      },
      {
        title: 'Everything practiced can matter',
        body: 'The current design contains 42 granular skills across weapon, defense and armor, movement and exploration, utility and interaction, and magic categories.',
      },
      {
        title: 'Techniques mark mastery',
        body: 'Skills rank from 0 to 20. Techniques unlock at milestone ranks 1, 5, 10, 15, and 20.',
      },
      {
        title: 'Feats are earned',
        body: 'Common, Rare, and Legendary feats unlock through gameplay achievements rather than a pick list. Rare and Legendary feats also carry drawbacks.',
      },
    ],
  },
  {
    slug: 'items',
    navLabel: 'Loot & Gear',
    title: 'Loot & Gear',
    eyebrow: 'Find · Identify · Equip',
    oneLiner:
      'Find believable drops, curated magic items, and upgrade keys without inventory busywork.',
    accent: 'var(--tt-good)',
    highlights: ['Curated loot', '6 rarity tiers', 'Unlimited carry'],
    sections: [
      {
        title: 'Drops belong in the world',
        body: 'Weapons, armor, trinkets, consumables, materials, town resources, upgrade keys, quest items, magical items, and currency each have a clear place in the item model.',
      },
      {
        title: 'Rarity says its name',
        body: 'The six player-facing rarity tiers are Common, Green, Blue, Purple, Red, and Gold. Words and tally marks reinforce color at every tier.',
      },
      {
        title: 'Discovery continues in town',
        body: 'Unidentified items return to the Mage Tower for identification, connecting expedition finds to village services.',
      },
      {
        title: 'Carry the adventure, not the bags',
        body: 'Inventory uses unlimited carry and materials auto-store. The design avoids bag management so attention stays on choices, finds, and preparation.',
      },
    ],
  },
  {
    slug: 'town',
    navLabel: 'Town',
    title: 'Town & Preparation',
    eyebrow: 'Return · Rebuild · Prepare',
    oneLiner:
      'Turn expedition spoils into a stronger village that provisions future journeys and opens new routes.',
    accent: 'var(--tt-biome-searing)',
    highlights: ['Village services', 'Building tiers', 'Active initiatives'],
    sections: [
      {
        title: 'The village is the crafting system',
        body: 'Preparation happens through services and infrastructure instead of a traditional recipe menu. Expedition resources feed the place that sends you back out.',
      },
      {
        title: 'Services with a purpose',
        body: 'The Mage Tower identifies items. The Alchemist stocks potions. The Blacksmith, Clinic, Keep and Walls, lumber yard, mine, and market support the wider settlement.',
      },
      {
        title: 'Build in deliberate steps',
        body: 'Buildings move through Functional, Improved, Advanced, and Masterwork tiers. The village can pursue 1 to 3 active initiatives at a time.',
      },
      {
        title: 'Progress opens paths',
        body: 'Six named upgrade keys—including the Philosopher’s Stone, Heartwood Core, and Deepcore Prism—connect major discoveries to settlement growth.',
      },
    ],
  },
  {
    slug: 'world',
    navLabel: 'World',
    title: 'World & Exploration',
    eyebrow: 'Venture · Unlock · Return',
    oneLiner:
      'Explore six compact diorama biomes, gain traversal tools, and return to old paths with new possibilities.',
    accent: 'var(--tt-biome-verdant)',
    highlights: ['6 biomes', 'Fixed diorama view', 'Impermanence vs Control'],
    sections: [
      {
        title: 'Six compact biomes',
        body: 'The Verdant Wilds, Searing Expanse, Mire of Echoes, Crystal Caverns, Storm Peaks, and Withered Kingdom each carry their own terrain, pressure, and boss.',
      },
      {
        title: 'A world made to be reread',
        body: 'Traversal tools create reasons to return to old paths and discover new possibilities within compact spaces.',
      },
      {
        title: 'Three ages leave their mark',
        body: 'The Ancient Age pursued Automation. The Current Age turns to Necromancy. The Player Era asks whether control can give way to acceptance.',
      },
      {
        title: 'Impermanence vs Control',
        body: 'Automated systems still run without purpose while the Continuants maintain them indefinitely. The world’s central tension runs from its ruins to its endings.',
      },
    ],
  },
  {
    slug: 'enemies',
    navLabel: 'Enemies',
    title: 'Enemies & Bosses',
    eyebrow: 'Observe · Disrupt · Master',
    oneLiner:
      'Learn readable enemy roles, break encounter synergies, and master bosses with distinct rules.',
    accent: 'var(--tt-rarity-red)',
    highlights: ['Readable roles', '6 enemy tiers', 'Distinct boss phases'],
    sections: [
      {
        title: 'Roles create encounters',
        body: 'Frontliners, harassers, bruisers, artillery, controllers, support, summoners, tanks, assassins, area denial, and boss phase drivers combine into readable combat problems.',
      },
      {
        title: 'Threat has a hierarchy',
        body: 'Basic, Elite, Champion, Miniboss, Boss, and Summon tiers make threat and reward legible before every enemy is individually mastered.',
      },
      {
        title: 'Telegraphs respect the camera',
        body: 'Attacks are designed to read from the fixed diorama view. Silhouette, timing, and position carry information before effects add emphasis.',
      },
      {
        title: 'Six named bosses',
        body: 'Thorn Guardian, Iron Warden, Drowned King, Crystal Seer, Tempest Ascendant, and the Lich King anchor the six-biome journey with distinct phases and rules.',
      },
    ],
  },
]

export const systemBySlug = new Map(systems.map((system) => [system.slug, system]))
