import { systemFeatureInventory } from './systemFeatureInventory'

export type SystemSlug =
  | 'combat'
  | 'progression'
  | 'items'
  | 'town'
  | 'world'
  | 'enemies'

export type FeatureStage = 'shipped' | 'planned'

export type DetailedFeatureStage =
  | 'playtest'
  | 'implemented'
  | 'recovery'
  | 'planned'
  | 'uncertain'

export type ProgressVisualState =
  | 'done'
  | 'todo'
  | 'partial'
  | 'unknown'
  | 'broken'

export type MechanicSupport =
  | 'playtest'
  | 'implemented'
  | 'designed'
  | 'example'
  | 'unspecified'
  | 'broken'

export type MechanicItem = {
  label: string
  description: string
  support: MechanicSupport
  milestone?: boolean
}

export type MechanicGroup = {
  title: string
  summary?: string
  items: MechanicItem[]
}

export type FeatureMechanics = {
  summary: string
  groups: MechanicGroup[]
  sources: string[]
}

export type ProgressFeature = {
  title: string
  description: string
  stage: FeatureStage
}

export type DetailedFeature = {
  id: string
  title: string
  description: string
  stage: DetailedFeatureStage
  evidence: string
  sources: string[]
  group?: string
  mechanics?: FeatureMechanics
}

export type ProgressCategory = {
  title: string
  summary: string
  features: ProgressFeature[]
  details?: DetailedFeature[]
  /**
   * Maintainer-only pointers to the ProjectMordecai sources used for this
   * snapshot. These are intentionally not rendered as public ticket lists.
   */
  sources: string[]
}

export type SystemProgress = {
  intro: string
  categories: ProgressCategory[]
}

export const progressStatusReviewedOn = '6 November 2026'

const progressOverviewBySystem = {
  combat: {
    intro:
      'The current playtest proves the close-range fight, defensive inputs, HUD, and death loop. Magic, aiming, and deeper combat tuning are still being connected.',
    categories: [
      {
        title: 'Attacks & weapons',
        summary:
          'The arena has a working melee foundation, with the full ranged and aiming promise still ahead.',
        sources: [
          'stories/done/US-083-recovery-combat-abilities-and-input.md',
          'stories/done/US-078-playable-weapon-arena.md',
          'ProjectMordecai issues #34 and #36',
        ],
        features: [
          {
            title: 'Light and heavy melee attacks',
            description:
              'Mouse and gamepad attacks run through the equipped weapon in the packaged playtest.',
            stage: 'shipped',
          },
          {
            title: 'Five-weapon melee loadout',
            description:
              'Longsword, dagger, greatsword, spear, and mace can be cycled, attacked with, and read on the HUD.',
            stage: 'shipped',
          },
          {
            title: 'Independent movement and aim',
            description:
              'Twin-stick facing and mouse aim are designed, but the current playtest still pins facing in one direction.',
            stage: 'planned',
          },
        ],
      },
      {
        title: 'Defense & pressure',
        summary:
          'Defense is playable today; resource feel and advanced openings still need iteration.',
        sources: [
          'stories/done/US-101-recovery-defenses-against-enemy-melee.md',
          'stories/done/US-005-dodge-system.md',
          'stories/done/US-006-block-parry-system.md',
          'stories/done/US-007-posture-stagger-system.md',
          'stories/done/US-008-stamina-tier-system.md',
        ],
        features: [
          {
            title: 'Dodge, block, and parry',
            description:
              'Gamepad defense and keyboard dodge pass packaged input checks, including protection from enemy melee.',
            stage: 'shipped',
          },
          {
            title: 'Tiered stamina and combat resources',
            description:
              'Health, stamina, posture, and Spell Points are on the HUD; stamina regeneration and tuning still need recovery.',
            stage: 'shipped',
          },
          {
            title: 'Posture breaks and critical openings',
            description:
              'The posture and stagger framework exists, while the complete player-facing punish loop remains to be playtested.',
            stage: 'planned',
          },
        ],
      },
      {
        title: 'Magic & status',
        summary:
          'The spell and status frameworks are broad, but only a narrow slice is dependable in the current build.',
        sources: [
          'stories/PLAN.md — Epics 4, 5, and R',
          'stories/done/US-057-playable-magic-arena.md',
          'ProjectMordecai issues #20, #21, #25, and #35',
        ],
        features: [
          {
            title: 'Restoration and Spell Point spending',
            description:
              'Restoration heals and spends SP during the packaged combat path.',
            stage: 'shipped',
          },
          {
            title: 'Fourteen Rank 1 spells',
            description:
              'The launch spell set is implemented in the framework, but Fireball, Blink, cooldowns, and HUD wiring still have open playtest gaps.',
            stage: 'planned',
          },
          {
            title: 'Sixteen launch statuses',
            description:
              'Status logic is implemented; names, VFX, and reliable player-facing application still need recovery and polish.',
            stage: 'planned',
          },
        ],
      },
      {
        title: 'Fight loop & feedback',
        summary:
          'A small test encounter now carries the player all the way through victory, death, and another attempt.',
        sources: [
          'stories/done/US-086-recovery-death-screen-kill-counter.md',
          'stories/done/US-092-recovery-enemy-indicators.md',
          'stories/in-progress/US-091-recovery-hud-readouts.md',
        ],
        features: [
          {
            title: 'Kill, death, respawn, and arena reset',
            description:
              'Kills count, the death screen records the life, and targets reset after respawn in the packaged playtest.',
            stage: 'shipped',
          },
          {
            title: 'Tin Tally combat HUD',
            description:
              'Core bars, kill count, enemy indicators, and the equipped-weapon plate are functional in the current build.',
            stage: 'shipped',
          },
          {
            title: 'Final feedback and effects pass',
            description:
              'Combat callouts, status VFX, damage readability, and final HUD polish remain planned.',
            stage: 'planned',
          },
        ],
      },
    ],
  },
  progression: {
    intro:
      'Attributes, skills, and feats have runtime foundations. The next meaningful milestone is letting players see and use those systems through the pause menu.',
    categories: [
      {
        title: 'Character growth',
        summary:
          'The math exists beneath the build, while the full leveling journey is still a design target.',
        sources: [
          'stories/done/US-010-attribute-scaling.md',
          'Specs/character_attributes_v1.md',
          'Specs/game_design_v2.md §5',
        ],
        features: [
          {
            title: 'Nine-attribute scaling framework',
            description:
              'Strength through Charisma can scale derived combat stats in the runtime system.',
            stage: 'shipped',
          },
          {
            title: 'Readable character sheet',
            description:
              'The nine-attribute widget is implemented, but the Character tab is blank in the packaged playtest.',
            stage: 'planned',
          },
          {
            title: 'Level 1–60 progression loop',
            description:
              'The level cap and skill-first philosophy are designed; rewards and campaign pacing are not yet playable.',
            stage: 'planned',
          },
        ],
      },
      {
        title: 'Skills & techniques',
        summary:
          'Skills are modeled as practiced mastery, with techniques arriving at milestone ranks.',
        sources: [
          'stories/done/US-011-skill-framework.md',
          'stories/done/US-067-skill-tree-display.md',
          'Specs/skill_sheet_v1.1.md',
          'ProjectMordecai issue #10',
        ],
        features: [
          {
            title: 'Skill ranks from 0 to 20',
            description:
              'The skill component, rank progression, and category model are implemented.',
            stage: 'shipped',
          },
          {
            title: 'Techniques at ranks 1, 5, 10, 15, and 20',
            description:
              'Milestones are specified across the skill catalog; several values and playable unlocks still need final decisions.',
            stage: 'planned',
          },
          {
            title: 'Playable Skills tab',
            description:
              'The display framework exists, but the current public build still shows “Coming Soon.”',
            stage: 'planned',
          },
        ],
      },
      {
        title: 'Earned feats',
        summary:
          'Feats reward what the player accomplishes instead of asking for a pick from a generic list.',
        sources: [
          'stories/done/US-012-feat-system.md',
          'stories/done/US-068-feat-display.md',
          'Specs/game_design_v2.md §5',
          'ProjectMordecai issue #10',
        ],
        features: [
          {
            title: 'Achievement-driven feat framework',
            description:
              'Unlock conditions, rarity tiers, and progress tracking are implemented in the runtime system.',
            stage: 'shipped',
          },
          {
            title: 'Common, Rare, and Legendary tradeoffs',
            description:
              'The tier rules are designed, including drawbacks for stronger specializations; final feat content is still ahead.',
            stage: 'planned',
          },
          {
            title: 'Playable Feats tab',
            description:
              'The display widget exists, but it is not connected in the packaged pause menu yet.',
            stage: 'planned',
          },
        ],
      },
    ],
  },
  items: {
    intro:
      'Loot is the most complete non-combat slice: pickups, unlimited carry, auto-storage, filtering, and identification all pass a real-input packaged playtest.',
    categories: [
      {
        title: 'Finding & carrying',
        summary:
          'The current arena proves a low-friction pickup loop without bag-slot management.',
        sources: [
          'stories/done/US-079-playable-inventory-arena.md',
          'stories/done/US-031-flat-inventory-auto-store.md',
          'Specs/item_schema_v2.md',
        ],
        features: [
          {
            title: 'Labeled press-to-pick-up loot',
            description:
              'Six representative pickups can be found and collected with readable world labels.',
            stage: 'shipped',
          },
          {
            title: 'Unlimited flat inventory',
            description:
              'Gear and consumables stay in a filterable list instead of consuming bag slots.',
            stage: 'shipped',
          },
          {
            title: 'Material and town-resource auto-storage',
            description:
              'Ore and town stone route directly into a persistent resource ledger.',
            stage: 'shipped',
          },
        ],
      },
      {
        title: 'Reading & identifying',
        summary:
          'Item identity is visible now; the final town-based service presentation comes later.',
        sources: [
          'stories/done/US-032-item-definition-categories.md',
          'stories/done/US-033-unidentified-items-town-gating.md',
          'stories/done/US-071-inventory-widget.md',
        ],
        features: [
          {
            title: 'Item categories, rarity, sorting, and filters',
            description:
              'The item schema and Inventory tab distinguish gear, consumables, materials, keys, and magical items.',
            stage: 'shipped',
          },
          {
            title: 'Unidentified magical items',
            description:
              'Mystery items show partial information, cannot be fully used, and can be identified in the current test flow.',
            stage: 'shipped',
          },
          {
            title: 'Mage Tower identification visit',
            description:
              'The service rule is designed, but identification still happens from the test Inventory tab rather than a town location.',
            stage: 'planned',
          },
        ],
      },
      {
        title: 'Equipping & build identity',
        summary:
          'Melee loadouts work; the wider equipment and item-effect game is still being built.',
        sources: [
          'stories/done/US-078-playable-weapon-arena.md',
          'stories/PLAN.md — Epic 6',
          'ProjectMordecai issues #27 and #36',
        ],
        features: [
          {
            title: 'Five distinct melee weapon profiles',
            description:
              'Longsword, dagger, greatsword, spear, and mace are equipped and cycled in the playtest.',
            stage: 'shipped',
          },
          {
            title: 'Use and equip actions for found items',
            description:
              'Arena pickups reach Inventory, but found items do not yet offer the final Use or Equip flow.',
            stage: 'planned',
          },
          {
            title: 'Ranged weapons, armor, shields, and dual wielding',
            description:
              'These equipment families are in the roadmap and still need design input before implementation.',
            stage: 'planned',
          },
        ],
      },
      {
        title: 'Loot in the world',
        summary:
          'The rules favor believable and curated rewards rather than random loot showers.',
        sources: [
          'Specs/game_design_v2.md §6',
          'Specs/item_system_v1.md',
          'Specs/village_system_v1.md',
        ],
        features: [
          {
            title: 'Believable enemy drop tables',
            description:
              'The rule set is written—creatures drop plausible materials and gear—but production loot tables are not in playtest.',
            stage: 'planned',
          },
          {
            title: 'Curated named magic items',
            description:
              'Boss, dungeon, and story-gated signature items are designed; the arena currently uses test items.',
            stage: 'planned',
          },
          {
            title: 'World-placed equipment and upgrade keys',
            description:
              'Decorative racks, containers, and protected progression keys are planned for the biome content pass.',
            stage: 'planned',
          },
        ],
      },
    ],
  },
  town: {
    intro:
      'Town is still a design-stage system. Two supporting services exist in the inventory slice, but no settlement scene or management loop is playable yet.',
    categories: [
      {
        title: 'Resources & foundations',
        summary:
          'Expeditions already know how to send important materials toward the future settlement.',
        sources: [
          'stories/done/US-031-flat-inventory-auto-store.md',
          'stories/done/US-079-playable-inventory-arena.md',
          'Specs/village_system_v1.md §1',
        ],
        features: [
          {
            title: 'Town-resource ledger',
            description:
              'Materials and town resources auto-store safely in the current inventory playtest.',
            stage: 'shipped',
          },
          {
            title: 'Common, refined, and relic resource economy',
            description:
              'The three-part resource model is designed; gathering, refining, and spending are not yet playable.',
            stage: 'planned',
          },
          {
            title: 'Population and support capacity',
            description:
              'Housing, safety, health, and livelihood are outlined as a light strategic system, not a survival spreadsheet.',
            stage: 'planned',
          },
        ],
      },
      {
        title: 'Buildings & services',
        summary:
          'The village is intended to replace recipe-grid crafting with permanent, renewable services.',
        sources: [
          'Specs/village_system_v1.md §§2 and 4',
          'stories/done/US-033-unidentified-items-town-gating.md',
          'stories/PLAN.md — Epic 9',
        ],
        features: [
          {
            title: 'Identification service foundation',
            description:
              'Identification rules and the service subsystem work, but the Mage Tower itself is not built.',
            stage: 'shipped',
          },
          {
            title: 'Four building tiers',
            description:
              'Functional, Improved, Advanced, and Masterwork upgrades are designed for major buildings.',
            stage: 'planned',
          },
          {
            title: 'Alchemist, Blacksmith, Clinic, Mage Tower, and defenses',
            description:
              'Each service has a defined role in preparation, recovery, research, or settlement safety.',
            stage: 'planned',
          },
        ],
      },
      {
        title: 'People & priorities',
        summary:
          'Town growth should ask for strategic choices without turning into daily chores.',
        sources: [
          'Specs/game_design_v2.md §7',
          'Specs/village_system_v1.md',
          'stories/PLAN.md — US-038 and US-039',
        ],
        features: [
          {
            title: 'NPC job assignment',
            description:
              'Miners, lumber workers, researchers, guards, and other specialists are planned as delegated roles.',
            stage: 'planned',
          },
          {
            title: 'One to three active initiatives',
            description:
              'The player will choose a small set of visible settlement priorities at a time.',
            stage: 'planned',
          },
          {
            title: 'Specialist arrival and town expansion',
            description:
              'Population health and infrastructure are designed to unlock new services and specialists.',
            stage: 'planned',
          },
        ],
      },
      {
        title: 'Back to the expedition',
        summary:
          'Every town investment should change what the next journey can do.',
        sources: [
          'Specs/village_system_v1.md — Return-to-Town Rule',
          'Specs/game_design_v2.md §§3 and 7',
          'stories/PLAN.md — US-040',
        ],
        features: [
          {
            title: 'Renewable expedition provisioning',
            description:
              'Potion stock, repairs, sharpening, blessings, and resistance preparation are planned service outputs.',
            stage: 'planned',
          },
          {
            title: 'Route and shortcut unlocks',
            description:
              'Village upgrades will open bridges, barriers, drainage, and other paths in old regions.',
            stage: 'planned',
          },
          {
            title: 'Occasional town events',
            description:
              'Caravan defense, mine recovery, and worker protection are planned as focused missions—not chores.',
            stage: 'planned',
          },
        ],
      },
    ],
  },
  world: {
    intro:
      'The current build is a set of blockout test maps under the fixed diorama camera. The authored-cell framework, six biomes, gates, and campaign world are still ahead.',
    categories: [
      {
        title: 'Exploration foundation',
        summary:
          'The camera and basic movement can be tested before production world content exists.',
        sources: [
          'stories/done/US-001-project-foundation.md',
          'stories/done/US-100-recovery-playtest-test-maps.md',
          'ProjectMordecai issues #26, #33, and #34',
        ],
        features: [
          {
            title: 'Fixed diorama camera and keyboard movement',
            description:
              'The packaged blockout keeps a fixed view and supports movement, sprint, and jump.',
            stage: 'shipped',
          },
          {
            title: 'Purpose-built movement and combat test maps',
            description:
              'Separate grid maps now make controls and encounters repeatable week to week.',
            stage: 'shipped',
          },
          {
            title: 'Full gamepad navigation and wall visibility',
            description:
              'Stick key names, player facing, and near-wall cutaways still have open playtest work.',
            stage: 'planned',
          },
        ],
      },
      {
        title: 'Authored world structure',
        summary:
          'Compact, readable cells are planned to replace one-off test arenas.',
        sources: [
          'stories/PLAN.md — Epic 8 Phase 1',
          'stories/backlog/US-080-cell-metadata-framework.md',
          'stories/backlog/US-081-gameplay-markup-actors.md',
          'stories/backlog/US-082-cell-validation-library.md',
        ],
        features: [
          {
            title: 'Cell metadata and world types',
            description:
              'Biome, cell type, height tier, gate, and exit data are scoped as the first world milestone.',
            stage: 'planned',
          },
          {
            title: 'Gameplay markup and cell registry',
            description:
              'Reusable markers for gates, spawns, routes, and authored intent are queued.',
            stage: 'planned',
          },
          {
            title: 'Automated cell validation',
            description:
              'Per-cell and cross-cell reports are planned to keep the handcrafted world consistent.',
            stage: 'planned',
          },
        ],
      },
      {
        title: 'Six-biome journey',
        summary:
          'Each compact region carries a distinct mood, boss, and place in the theme of impermanence.',
        sources: [
          'Specs/world_design_v1.md',
          'Specs/game_design_v2.md §8',
        ],
        features: [
          {
            title: 'Verdant Wilds and Searing Expanse',
            description:
              'Denial and control shape the first two planned regions, their ruins, and their route tools.',
            stage: 'planned',
          },
          {
            title: 'Mire of Echoes and Crystal Caverns',
            description:
              'Avoidance and preservation guide the swamp and frozen-time region designs.',
            stage: 'planned',
          },
          {
            title: 'Storm Peaks and Withered Kingdom',
            description:
              'Obsession and acceptance close the six-region emotional arc.',
            stage: 'planned',
          },
        ],
      },
      {
        title: 'Traversal & return',
        summary:
          'New tools and town investments should make old routes worth reading again.',
        sources: [
          'Specs/world_design_v1.md — biome unlocks',
          'stories/PLAN.md — Epic 8 Phase 2',
          'Specs/skill_sheet_v1.1.md',
        ],
        features: [
          {
            title: 'Biome traversal tools',
            description:
              'Explosives, magnetic control, invisibility, phasing, and gliding are designed as route openers.',
            stage: 'planned',
          },
          {
            title: 'Climbing, swimming, sneaking, and exploration skills',
            description:
              'The skill set is written, but numeric values and world interactions still need decisions.',
            stage: 'planned',
          },
          {
            title: 'Backtracking and Metroidvania gates',
            description:
              'Returning to old biomes for new paths is a core pillar; the gate graph still needs approval.',
            stage: 'planned',
          },
        ],
      },
    ],
  },
  enemies: {
    intro:
      'The current arena has one functional placeholder enemy family. Indicators, damage, death, and reset work; production roles, biome rosters, and bosses remain designed rather than playable.',
    categories: [
      {
        title: 'Current arena enemy',
        summary:
          'The Frontliner is deliberately simple, but it now closes the basic combat loop.',
        sources: [
          'stories/in-progress/US-085-recovery-frontliner-content.md',
          'stories/done/US-084-recovery-enemy-attack-path.md',
          'stories/done/US-092-recovery-enemy-indicators.md',
        ],
        features: [
          {
            title: 'Visible 200-health Frontliner placeholders',
            description:
              'Three red blockout enemies are visible and use the intended health in the packaged arena.',
            stage: 'shipped',
          },
          {
            title: 'Aggro, approach, attack, and player damage',
            description:
              'Frontliners find the player, close to attack-profile range, and can win the fight.',
            stage: 'shipped',
          },
          {
            title: 'Always-on enemy health indicators',
            description:
              'Each living enemy has one readable red indicator that disappears on death and returns on reset.',
            stage: 'shipped',
          },
        ],
      },
      {
        title: 'Readable encounter roles',
        summary:
          'Enemy variety is designed around distinct jobs and counterplay, not inflated health.',
        sources: [
          'Specs/enemy_archetypes_v1.md §§1 and 3',
          'Specs/enemy_ai_framework_v1.md',
        ],
        features: [
          {
            title: 'Frontliner, harasser, bruiser, and artillery roles',
            description:
              'The first pressure roles are documented; only the placeholder Frontliner is in playtest.',
            stage: 'planned',
          },
          {
            title: 'Controller, support, summoner, and tank roles',
            description:
              'Synergy and target-priority roles are designed for mixed encounters.',
            stage: 'planned',
          },
          {
            title: 'Assassin, area denial, and phase-driver roles',
            description:
              'Higher-pressure roles are planned with explicit readability and counterplay rules.',
            stage: 'planned',
          },
        ],
      },
      {
        title: 'Threat & composition',
        summary:
          'Encounter hierarchy and systemic behavior are specified, but not yet populated with production enemies.',
        sources: [
          'Specs/enemy_archetypes_v1.md §2',
          'Specs/game_design_v2.md §4',
        ],
        features: [
          {
            title: 'Basic, Elite, Champion, Miniboss, Boss, and Summon tiers',
            description:
              'The six-tier threat model is defined for stats, rewards, and encounter placement.',
            stage: 'planned',
          },
          {
            title: 'Fixed-camera telegraphs',
            description:
              'Windup, silhouette, audio, and ground-marker rules are designed for top-down readability.',
            stage: 'planned',
          },
          {
            title: 'Status pressure and role synergy',
            description:
              'Resistances, vulnerabilities, control effects, and composition tags are part of the enemy schema.',
            stage: 'planned',
          },
        ],
      },
      {
        title: 'Biome rosters & bosses',
        summary:
          'The campaign has named threats on paper; none of these production encounters are in the build yet.',
        sources: [
          'Specs/world_design_v1.md — Biomes',
          'Specs/enemy_archetypes_v1.md',
        ],
        features: [
          {
            title: 'Six biome enemy families',
            description:
              'Automatons, wraiths, beasts, constructs, phantoms, and undead are outlined across the regions.',
            stage: 'planned',
          },
          {
            title: 'Five regional bosses',
            description:
              'Thorn Guardian, Iron Warden, Drowned King, Crystal Seer, and Tempest Ascendant have distinct themes and rules.',
            stage: 'planned',
          },
          {
            title: 'Lich King final encounter',
            description:
              'The final boss is designed around player abilities, time, space, and resetting fight state.',
            stage: 'planned',
          },
        ],
      },
    ],
  },
} satisfies Record<SystemSlug, SystemProgress>

export const progressBySystem = Object.fromEntries(
  Object.entries(progressOverviewBySystem).map(([slug, progress]) => [
    slug,
    {
      ...progress,
      categories: progress.categories.map((category) => ({
        ...category,
        details:
          systemFeatureInventory[slug as SystemSlug][category.title] ?? [],
      })),
    },
  ]),
) as Record<SystemSlug, SystemProgress>
