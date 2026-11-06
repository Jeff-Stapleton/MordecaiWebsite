import type {
  DetailedFeature,
  DetailedFeatureStage,
  SystemSlug,
} from './systemProgress'

type NamedFeature = readonly [id: string, title: string, description: string]

const defaultEvidence: Record<DetailedFeatureStage, string> = {
  playtest: 'Verified in a current packaged, player-input playtest.',
  implemented:
    'Implementation and automated-story evidence exist; current packaged player verification was not found.',
  recovery:
    'Implementation exists, but a current issue or packaged check shows a player-facing gap.',
  planned:
    'Named in the current design or roadmap; implementation evidence was not found.',
  uncertain:
    'The sources name this feature but do not support a reliable implementation-state claim.',
}

function entries(
  stage: DetailedFeatureStage,
  group: string,
  sources: string | string[],
  items: NamedFeature[],
  evidence = defaultEvidence[stage],
): DetailedFeature[] {
  return items.map(([id, title, description]) => ({
    id,
    title,
    description,
    stage,
    evidence,
    sources: Array.isArray(sources) ? sources : [sources],
    group,
  }))
}

function entry(
  stage: DetailedFeatureStage,
  group: string,
  sources: string | string[],
  id: string,
  title: string,
  description: string,
  evidence = defaultEvidence[stage],
): DetailedFeature {
  return entries(stage, group, sources, [[id, title, description]], evidence)[0]
}

const combat = {
  'Attacks & weapons': [
    ...entries(
      'playtest',
      'Playable melee loadout',
      [
        'stories/done/US-078-playable-weapon-arena.md',
        'stories/in-progress/US-091-recovery-hud-readouts.md',
      ],
      [
        [
          'combat-light-attack',
          'Light attack',
          'A quick equipped-weapon attack on mouse or gamepad, verified in the packaged arena.',
        ],
        [
          'combat-heavy-attack',
          'Heavy attack',
          'A committed hold attack that uses the equipped weapon’s heavy profile.',
        ],
        [
          'combat-longsword',
          'Longsword',
          'Balanced three-sweep combo with a spinning heavy; equipped first in the current arena.',
        ],
        [
          'combat-dagger',
          'Dagger',
          'Fast, short-ranged thrust chain available in the five-weapon playtest loadout.',
        ],
        [
          'combat-greatsword',
          'Greatsword',
          'Slow two-handed sweeps and an overhead slam in the current playtest loadout.',
        ],
        [
          'combat-spear',
          'Spear',
          'The longest current melee reach, combining thrusts with a sweep finisher.',
        ],
        [
          'combat-mace',
          'Mace',
          'A slower blunt weapon tuned for posture damage in the current loadout.',
        ],
      ],
    ),
    ...entries(
      'implemented',
      'Implemented profiles—not in the arena loadout',
      [
        'stories/done/US-025-blade-family-weapon-profiles.md',
        'stories/done/US-026-blunt-polearm-weapon-profiles.md',
      ],
      [
        [
          'combat-shortsword',
          'Shortsword',
          'A fast sweep-and-thrust profile exists in code, but it is not one of the five packaged arena weapons.',
        ],
        [
          'combat-axe',
          'Axe',
          'Wide slash profiles and an overhead slam exist in the weapon factory, without current arena content.',
        ],
        [
          'combat-quarterstaff',
          'Quarterstaff',
          'Versatile sweep, thrust, and spinning-heavy profiles exist in code, without current arena content.',
        ],
      ],
    ),
    entry(
      'recovery',
      'Implemented profiles—not in the arena loadout',
      'stories/done/US-083-recovery-combat-abilities-and-input.md — N29',
      'combat-unarmed',
      'Unarmed',
      'Factory profiles exist, but the live unequipped fallback has no content and attacks end immediately.',
    ),
    ...entries(
      'planned',
      'Designed weapon families',
      ['stories/PLAN.md — Epic 6', 'Specs/skill_sheet_v1.1.md'],
      [
        [
          'combat-longbow',
          'Longbow',
          'A powerful charged ranged style with piercing and volley milestones.',
        ],
        [
          'combat-shortbow',
          'Shortbow',
          'A mobile rapid-fire bow style with dodge and attack-speed interactions.',
        ],
        [
          'combat-crossbow',
          'Crossbow',
          'An armor-piercing ranged style that still needs design input before implementation.',
        ],
        [
          'combat-throwables',
          'Throwables',
          'Named in the ranged-weapon roadmap, without a settled launch design.',
        ],
        [
          'combat-wands',
          'Wands',
          'Named in the ranged-weapon roadmap, without a settled launch design.',
        ],
        [
          'combat-two-weapon',
          'Two-Weapon Fighting',
          'A dual-weapon stance and alternating combo catalog entry that still needs design input.',
        ],
      ],
    ),
    entry(
      'recovery',
      'Control foundation',
      'ProjectMordecai issue #34',
      'combat-independent-aim',
      'Independent movement and aim',
      'The fixed-camera twin-stick goal is documented, but current facing and aim remain pinned.',
    ),
  ],
  'Defense & pressure': [
    ...entries(
      'playtest',
      'Defensive actions',
      [
        'stories/done/US-083-recovery-combat-abilities-and-input.md',
        'stories/done/US-101-recovery-defenses-against-enemy-melee.md',
      ],
      [
        [
          'combat-dodge',
          'Dodge',
          'Keyboard and gamepad dodge inputs work and protect against enemy melee.',
        ],
        [
          'combat-block',
          'Block',
          'Gamepad block holds a guard and mitigates enemy melee in the packaged test.',
        ],
        [
          'combat-parry',
          'Parry',
          'A timed gamepad trigger input drops the guard, parries, and returns to guard.',
        ],
        [
          'combat-perfect-block',
          'Perfect Block',
          'The current build exposes a successful Perfect Block state and combat callout.',
        ],
        [
          'combat-blink-defense',
          'Blink defense window',
          'Blink’s invulnerability ends correctly and can defend against enemy melee.',
        ],
        [
          'combat-jump-defense',
          'Jump avoidance',
          'Jump can avoid attacks marked as jumpable in the packaged defense test.',
        ],
      ],
    ),
    entry(
      'recovery',
      'Defensive actions',
      'stories/done/US-083-recovery-combat-abilities-and-input.md — AC-083.11',
      'combat-mouse-block-parry',
      'Mouse block and parry',
      'Bindings exist, but the playtest bridge cannot yet hold the mouse button long enough to accept this path.',
    ),
    ...entries(
      'implemented',
      'Openings and pressure',
      [
        'stories/done/US-005-dodge-system.md',
        'stories/done/US-007-posture-stagger-system.md',
      ],
      [
        [
          'combat-perfect-dodge',
          'Perfect Dodge',
          'Timing-window and reward logic is implemented, without current packaged acceptance evidence.',
        ],
        [
          'combat-posture-break',
          'Posture Break',
          'Heavy hits and perfect defense can build enemy posture toward a break in the implemented framework.',
        ],
        [
          'combat-stagger',
          'Stagger',
          'The posture framework can interrupt an enemy when its posture breaks.',
        ],
        [
          'combat-riposte',
          'Riposte / critical window',
          'A posture break can open a punish window in code; the full player-facing loop is not currently verified.',
        ],
      ],
    ),
    entry(
      'recovery',
      'Combat resources',
      'stories/done/US-083-recovery-combat-abilities-and-input.md — N30',
      'combat-tiered-stamina',
      'Green, Yellow, Red, and Exhausted stamina',
      'Tier logic and the HUD exist, but the current player stamina does not regenerate.',
    ),
    ...entries(
      'playtest',
      'Combat resources',
      'stories/done/US-086-recovery-death-screen-kill-counter.md',
      [
        [
          'combat-health',
          'Health',
          'The HUD updates as the player takes damage, heals, dies, and respawns.',
        ],
        [
          'combat-spell-points',
          'Spell Points',
          'The HUD displays SP and Restoration spends the resource in the packaged path.',
        ],
      ],
    ),
    entry(
      'implemented',
      'Combat resources',
      'stories/done/US-007-posture-stagger-system.md',
      'combat-stability',
      'Player Stability',
      'The resistance-to-stagger model exists in design and combat code, without a dedicated packaged readout.',
    ),
  ],
  'Magic & status': [
    ...entries(
      'recovery',
      'Rank 1 launch spells',
      ['ProjectMordecai issue #20', 'stories/backlog/US-087-recovery-fireball-and-blink.md'],
      [
        [
          'spell-fireball',
          'Fireball',
          'Projectile code and spell content exist, but the current packaged cast spends SP without firing or dealing damage.',
        ],
      ],
    ),
    ...entries(
      'implemented',
      'Rank 1 launch spells',
      'stories/done/US-020-damage-spells.md',
      [
        [
          'spell-cone-of-cold',
          'Cone of Cold',
          'A cold-damage cone is implemented and automation-tested, without current packaged player evidence.',
        ],
        [
          'spell-magic-missile',
          'Magic Missile',
          'A channel of homing force projectiles is implemented and automation-tested.',
        ],
      ],
    ),
    entry(
      'recovery',
      'Rank 1 launch spells',
      'ProjectMordecai issue #21',
      'spell-stone-skin',
      'Stone Skin',
      'The armor buff exists, but its player-facing status indicator currently reads only “Status.”',
    ),
    entry(
      'recovery',
      'Rank 1 launch spells',
      ['ProjectMordecai issue #25', 'stories/backlog/US-087-recovery-fireball-and-blink.md'],
      'spell-blink',
      'Blink',
      'Teleport and i-frame code exist, but Blink can spend SP without moving when an enemy blocks the route.',
    ),
    ...entries(
      'implemented',
      'Rank 1 launch spells',
      'stories/done/US-021-utility-spells.md',
      [
        [
          'spell-sleep',
          'Sleep',
          'Single-target sleep, action blocking, and wake-on-damage behavior are automation-tested.',
        ],
        [
          'spell-fire-ward',
          'Fire Ward',
          'A self-cast fire-damage shield is implemented and automation-tested.',
        ],
      ],
    ),
    entry(
      'implemented',
      'Rank 1 launch spells',
      'stories/done/US-022-support-spells.md',
      'spell-bless',
      'Bless',
      'A non-stacking physical and magical damage buff is implemented and automation-tested.',
    ),
    entry(
      'playtest',
      'Rank 1 launch spells',
      'stories/done/US-086-recovery-death-screen-kill-counter.md — restoration_heals',
      'spell-restoration',
      'Restoration',
      'The heal-over-time raises health and spends three SP in the packaged combat path.',
    ),
    ...entries(
      'uncertain',
      'Rank 1 launch spells',
      'stories/done/US-023-tactical-spells.md',
      [
        [
          'spell-snare',
          'Snare',
          'The story is filed under done, but every acceptance checkbox and required test remains unchecked.',
        ],
        [
          'spell-enfeeble',
          'Enfeeble',
          'The story is filed under done, but its Weakened application has no checked acceptance evidence.',
        ],
        [
          'spell-enchant-weapon',
          'Enchant Weapon',
          'The story is filed under done with unchecked criteria; weapon effects also have an open delivery bug.',
        ],
      ],
      'Repository bookkeeping conflicts with the unchecked story, so no completion claim is made.',
    ),
    ...entries(
      'implemented',
      'Rank 1 launch spells',
      'stories/done/US-060-tactical-spells-summon-evasion.md',
      [
        [
          'spell-illusion',
          'Illusion',
          'A timed, damageable decoy that draws enemy aggro is implemented and automation-tested.',
        ],
        [
          'spell-blur',
          'Blur',
          'A ranged-projectile evasion buff is implemented and automation-tested.',
        ],
      ],
    ),
    ...entries(
      'implemented',
      'Launch status effects',
      'Specs/status_effects_launch_set_v1.md; stories/PLAN.md — Epic 4',
      [
        ['status-burning', 'Burning', 'Fire damage over time that creates time pressure.'],
        ['status-bleeding', 'Bleeding', 'A wound state that suppresses healing until it clots.'],
        ['status-poisoned', 'Poisoned', 'A poison state that suppresses stamina regeneration.'],
        ['status-frostbitten', 'Frostbitten', 'Cold buildup that slows movement, attacks, and dodge recovery.'],
        ['status-shocked', 'Shocked', 'Electrical disruption that can interrupt timing and increase block cost.'],
        ['status-weakened', 'Weakened', 'A debuff that reduces posture damage output.'],
        ['status-brittle', 'Brittle', 'A debuff that increases posture damage taken and lowers stability.'],
        ['status-silenced', 'Silenced', 'A spell lockout with weapon actions left available.'],
        ['status-rooted', 'Rooted', 'Movement is locked while attacks, blocks, and spells remain available.'],
        ['status-blinded', 'Blinded', 'A perception debuff affecting ranged help and detection.'],
        ['status-fear', 'Fear', 'A composure debuff that worsens stamina and guard stability.'],
        ['status-cursed', 'Cursed', 'A resource-rule debuff affecting healing, SP recovery, and buffs.'],
        ['status-exposed', 'Exposed', 'A short mark that makes the next hit more punishing.'],
        ['status-corroded', 'Corroded', 'An armor and equipment-preparation debuff.'],
        ['status-drenched', 'Drenched', 'A state that reduces fire damage but worsens shock and frost.'],
        ['status-focused', 'Focused', 'A buff earned by chaining perfect defensive actions.'],
      ],
      'Status framework stories are marked complete, but individual effects do not have current packaged acceptance.',
    ),
  ],
  'Fight loop & feedback': [
    ...entries(
      'playtest',
      'Current packaged loop',
      [
        'stories/done/US-086-recovery-death-screen-kill-counter.md',
        'stories/done/US-092-recovery-enemy-indicators.md',
        'stories/in-progress/US-091-recovery-hud-readouts.md',
      ],
      [
        ['feedback-health-hud', 'Health bar', 'Tracks damage, healing, death, and respawn.'],
        ['feedback-stamina-hud', 'Stamina bar', 'Displays the current stamina value and tier color.'],
        ['feedback-posture-hud', 'Posture bar', 'Displays player posture in the current combat HUD.'],
        ['feedback-sp-hud', 'Spell Point readout', 'Shows current and maximum SP.'],
        ['feedback-kill-counter', 'Kill counter', 'Counts player-caused kills and resets at death.'],
        ['feedback-death-screen', 'Death screen', 'Shows “You Died,” a countdown, and the completed life’s kills.'],
        ['feedback-respawn', 'Respawn and arena reset', 'Restores the player and resets the test targets.'],
        ['feedback-weapon-plate', 'Equipped-weapon plate', 'Shows the current weapon and updates after cycling.'],
        ['feedback-enemy-indicator', 'Enemy health indicator', 'One always-on red bar per living enemy.'],
      ],
    ),
    entry(
      'recovery',
      'Feedback still being recovered',
      'ProjectMordecai issue #79',
      'feedback-combo-counter',
      'Combo counter',
      'The counter exists, but it can disappear after a HUD rebuild during an active combo.',
    ),
    entry(
      'implemented',
      'Feedback still being recovered',
      'stories/done/US-065-floating-damage-numbers.md',
      'feedback-damage-numbers',
      'Floating damage numbers',
      'Damage-type-colored world numbers are implemented without current packaged acceptance evidence.',
    ),
    ...entries(
      'recovery',
      'Feedback still being recovered',
      ['ProjectMordecai issues #13, #21, and #35', 'stories/backlog/US-088-recovery-spell-cooldowns-hud.md'],
      [
        [
          'feedback-status-indicators',
          'Named status indicators',
          'The HUD can show a status, but the current label can lose the specific status name.',
        ],
        [
          'feedback-spell-cooldowns',
          'Four spell cooldown readouts',
          'Only two widgets exist and spells currently have no working cooldown state.',
        ],
      ],
    ),
    ...entries(
      'planned',
      'Presentation polish',
      'stories/PLAN.md — Epic 10 Phase 4',
      [
        ['feedback-status-vfx', 'Status-effect VFX', 'Niagara and animation feedback for the launch statuses.'],
        ['feedback-hud-polish', 'Final combat-HUD polish', 'Final Tin Tally layout, motion, icons, and visual refinement.'],
      ],
    ),
  ],
} satisfies Record<string, DetailedFeature[]>

const progression = {
  'Character growth': [
    ...entries(
      'implemented',
      'Primary attributes',
      ['stories/done/US-010-attribute-scaling.md', 'Specs/character_attributes_v1.md'],
      [
        ['attribute-strength', 'Strength (STR)', 'Scales physical damage and armor penetration.'],
        ['attribute-dexterity', 'Dexterity (DEX)', 'Scales attack speed and physical critical chance.'],
        ['attribute-endurance', 'Endurance (END)', 'Scales stamina and stamina regeneration.'],
        ['attribute-constitution', 'Constitution (CON)', 'Scales health and health regeneration.'],
        ['attribute-resolve', 'Resolve (RES)', 'Scales affliction resistance and recovery.'],
        ['attribute-discipline', 'Discipline (DIS)', 'Scales posture and posture recovery.'],
        ['attribute-intelligence', 'Intelligence (INT)', 'Scales Spell Points and SP regeneration.'],
        ['attribute-wisdom', 'Wisdom (WIS)', 'Scales magic damage and resistance penetration.'],
        ['attribute-charisma', 'Charisma (CHA)', 'Scales cast speed and magic critical chance.'],
      ],
    ),
    entry(
      'implemented',
      'Scaling model',
      'Specs/character_attributes_v1.md — scaling_rules',
      'progression-effective-mod',
      'Effective Mod scaling',
      'Attribute growth uses four diminishing-return bands instead of raw modifiers.',
    ),
    entry(
      'recovery',
      'Player-facing progression',
      'ProjectMordecai issue #9',
      'progression-character-sheet',
      'Character sheet',
      'The nine-attribute widget exists, but the packaged Character tab is blank.',
    ),
    ...entries(
      'planned',
      'Player-facing progression',
      'Specs/game_design_v2.md §5',
      [
        ['progression-level-cap', 'Level 60 cap', 'The planned maximum character level.'],
        [
          'progression-level-rewards',
          'Level rewards',
          'Levels are intended to grant skill points and minor baseline growth, not primary power.',
        ],
      ],
    ),
  ],
  'Skills & techniques': [
    entry(
      'implemented',
      'Skill framework',
      'stories/done/US-011-skill-framework.md',
      'skills-rank-framework',
      'Ranks 0–20',
      'The skill component and rank-progression framework are implemented.',
    ),
    ...entries(
      'planned',
      'Weapon skills',
      'Specs/skill_sheet_v1.1.md',
      [
        ['skill-longswords', 'Longswords', 'Sweep and spinning-sword mastery milestones.'],
        ['skill-greatswords', 'Greatswords', 'Wide cleaves, posture slams, and shockwave milestones.'],
        ['skill-shortswords', 'Shortswords', 'Fast chains, flurries, and mobility milestones.'],
        ['skill-daggers', 'Daggers', 'Rapid thrusts, back attacks, bleeding, and stealth milestones.'],
        ['skill-axes', 'Axes', 'Heavy chops, pulls, armor breaking, and wounded-target pressure.'],
        ['skill-maces', 'Maces', 'Guard breaking, posture damage, and anti-armor mastery.'],
        ['skill-spears', 'Spears', 'Reach, brace, pin, charge, and thrust-flurry mastery.'],
        ['skill-quarterstaff', 'Quarterstaff', 'Sweeps, vaults, spinning guard, and repositioning.'],
        ['skill-unarmed', 'Unarmed', 'Rapid strikes, posture palms, throws, and attack-speed mastery.'],
        ['skill-longbow', 'Longbow', 'Power draw, piercing, volley, and weak-point mastery.'],
        ['skill-shortbow', 'Shortbow', 'Snap shots, mobile shooting, volleys, and speed stacks.'],
        ['skill-crossbows', 'Crossbows', 'Armor piercing, posture bolts, explosions, and reload mastery.'],
        ['skill-two-weapon', 'Two-Weapon Fighting', 'Alternating strikes, deflection, rush combos, and cross-slashes.'],
      ],
    ),
    ...entries(
      'planned',
      'Defense & armor skills',
      'Specs/skill_sheet_v1.1.md',
      [
        ['skill-dodging', 'Dodging', 'Roll distance, perfect-dodge rewards, cancels, and afterimages.'],
        ['skill-parrying', 'Parrying', 'Posture counters, projectile reflects, and empowered follow-ups.'],
        ['skill-buckler', 'Buckler Shield', 'Mobile guard, shield jab, counter bash, and reflects.'],
        ['skill-scutum', 'Scutum Shield', 'Heavy protection, ally cover, pushes, and planted-wall stance.'],
        ['skill-heater', 'Heater Shield', 'Balanced guard, bashes, attack empowerment, and stamina return.'],
        ['skill-leather', 'Leather Armor', 'Mobility, cheaper dodges, and perfect-dodge speed.'],
        ['skill-chainmail', 'Chainmail Armor', 'Balanced defense, bleed resistance, and block efficiency.'],
        ['skill-plate', 'Plate Armor', 'High defense, posture resistance, and stagger resistance.'],
      ],
    ),
    ...entries(
      'planned',
      'Movement & exploration skills',
      'Specs/skill_sheet_v1.1.md',
      [
        ['skill-sneaking', 'Sneaking', 'Quiet movement, reduced detection, and stealth follow-ups.'],
        ['skill-climbing', 'Climbing', 'Faster climbing, ledge catches, and reduced stamina drain.'],
        ['skill-swimming', 'Swimming', 'Swim speed, breath, current resistance, and diving.'],
        ['skill-perception', 'Perception', 'Secrets, traps, weak points, tracks, and hidden interactables.'],
        ['skill-tracking', 'Tracking', 'Trail reading, target direction, patrol prediction, and pursuit speed.'],
        ['skill-cartography', 'Cartography', 'Map detail, landmarks, shortcuts, services, and hazards.'],
      ],
    ),
    ...entries(
      'planned',
      'Utility & interaction skills',
      'Specs/skill_sheet_v1.1.md',
      [
        ['skill-traps', 'Traps', 'Placed hazards, slowing, multiple placements, and lingering danger.'],
        ['skill-lockpicking', 'Lockpicking', 'Wider success windows, complex locks, and hidden-container discovery.'],
        ['skill-pickpocket', 'Pickpocket', 'Stealing, keys, reduced detection, and planting items.'],
        ['skill-first-aid', 'First Aid', 'Healing, bleed removal, moving treatment, and safer revives.'],
      ],
    ),
    ...entries(
      'planned',
      'Magic skills in the current sheet',
      'Specs/skill_sheet_v1.1.md',
      [
        ['skill-fireball', 'Fireball', 'Projectile, explosion, burning ground, and charged-cast milestones.'],
        ['skill-cone-cold', 'Cone of Cold', 'Wider cones, freeze buildup, ice patches, and delayed bursts.'],
        ['skill-magic-missile', 'Magic Missile', 'More missiles, stronger homing, stored bursts, and orbiting casts.'],
        ['skill-stone-skin', 'Stone Skin', 'Armor, interruption resistance, reflection, and shatter damage.'],
        ['skill-sleep', 'Sleep', 'Longer sleep, spread, wake-hit damage, and drowsiness.'],
        ['skill-blink', 'Blink', 'Distance, illusions, arrival damage, and a second charge.'],
        ['skill-illusion', 'Illusion', 'Longer decoys, aggro, swapping, and multiple images.'],
        ['skill-fire-ward', 'Fire Ward', 'Duration, empowerment, aura damage, and break explosions.'],
        ['skill-frost-ward', 'Frost Ward', 'A frost-absorbing ward named only in the skill sheet.'],
        ['skill-float', 'Float', 'Air time, air dash, fall safety, and hovering.'],
        ['skill-counter-spell', 'Counter Spell', 'Cast interruption, silence, cost refunds, and reflection.'],
      ],
    ),
    entry(
      'planned',
      'Milestone model',
      'Specs/game_design_v2.md §5',
      'skills-milestones',
      'Techniques at ranks 1, 5, 10, 15, and 20',
      'The milestone cadence is locked, but many sheet values remain placeholders and are not playable unlocks.',
    ),
    entry(
      'recovery',
      'Player-facing progression',
      'ProjectMordecai issue #10',
      'skills-tab',
      'Skills tab',
      'The display framework exists, but the packaged tab still shows “Coming Soon.”',
    ),
  ],
  'Earned feats': [
    ...entries(
      'implemented',
      'Feat framework',
      'stories/done/US-012-feat-system.md',
      [
        ['feat-common-tier', 'Common feats', 'Modest earned bonuses with no required drawback.'],
        ['feat-rare-tier', 'Rare feats', 'Strong specializations with a light condition or drawback.'],
        ['feat-legendary-tier', 'Legendary feats', 'Build-defining rewards with mandatory drawbacks.'],
        ['feat-stat-threshold', 'Stat Threshold conditions', 'Unlock when a tracked gameplay stat reaches a threshold.'],
        ['feat-event-count', 'Event Count conditions', 'Unlock after a cumulative gameplay event count.'],
        ['feat-tag-present', 'Tag Present conditions', 'Unlock while a required gameplay state is present.'],
        ['feat-skill-rank', 'Skill Rank conditions', 'Unlock when a named skill reaches a required rank.'],
      ],
    ),
    entry(
      'uncertain',
      'Authored feat content',
      'stories/done/US-012-feat-system.md — AC-012.21 and “What’s NOT in scope”',
      'feat-pyromaniac',
      'Pyromaniac',
      'The only named feat is a test sample for burning six enemies at once; no player content asset exists.',
      'The pipeline test passes, but the source explicitly says the full feat list was not authored.',
    ),
    entry(
      'uncertain',
      'Authored feat content',
      'stories/done/US-012-feat-system.md — TODO(DECISION)',
      'feat-full-roster',
      'Full feat roster',
      'No supported list of feat names, conditions, effects, or drawbacks exists beyond Pyromaniac.',
      'The design calls this out as missing authoring, so no roster is inferred.',
    ),
    entry(
      'recovery',
      'Player-facing progression',
      'ProjectMordecai issue #10',
      'feats-tab',
      'Feats tab',
      'The display widget exists, but the packaged tab still shows “Coming Soon.”',
    ),
  ],
} satisfies Record<string, DetailedFeature[]>

const items = {
  'Finding & carrying': [
    ...entries(
      'playtest',
      'Current test pickups',
      'stories/done/US-079-playable-inventory-arena.md',
      [
        ['item-health-potion', 'Health Potion', 'A stackable common consumable used to prove pickup and inventory routing.'],
        ['item-iron-ore', 'Iron Ore', 'A material that auto-stores in the resource ledger.'],
        ['item-town-stone', 'Town Stone', 'A town resource that auto-stores in the resource ledger.'],
        ['item-upgrade-key-test', 'Upgrade Key (test item)', 'A protected progression-item example visible in Inventory.'],
        ['item-mysterious-amulet', 'Mysterious Amulet', 'An unidentified purple magical-item test fixture.'],
        ['item-rusty-sword', 'Rusty Sword', 'A common weapon test fixture used by Inventory filters.'],
      ],
      'Verified in the packaged inventory loop; these are test fixtures, not a promised final loot roster.',
    ),
    ...entries(
      'playtest',
      'Carry model',
      'stories/done/US-079-playable-inventory-arena.md',
      [
        ['item-press-pickup', 'Press-to-pick-up', 'World labels and an F prompt make collection explicit.'],
        ['item-unlimited-carry', 'Unlimited carry', 'Normal items use a flat list with no bag-slot limit.'],
        ['item-auto-store', 'Auto-storage', 'Materials and town resources route to a ledger on pickup.'],
        ['item-flat-inventory', 'Flat Inventory list', 'The pause menu shows collected items without container nesting.'],
      ],
    ),
    ...entries(
      'implemented',
      'Supported item types',
      'Specs/item_schema_v2.md §3',
      [
        ['item-type-weapon', 'Weapon', 'Equippable weapon definitions and instances.'],
        ['item-type-armor', 'Armor', 'Wearable defensive equipment definitions.'],
        ['item-type-trinket', 'Trinket', 'Accessory-style equipment definitions.'],
        ['item-type-consumable', 'Consumable', 'Items used for healing, cures, or expedition effects.'],
        ['item-type-material', 'Material', 'Monster parts, herbs, ore, hides, and similar inputs.'],
        ['item-type-town-resource', 'Town Resource', 'Building-focused resources routed to town storage.'],
        ['item-type-magical', 'Magical Item', 'Curated named gear that can require identification.'],
        ['item-type-quest', 'Quest Item', 'Narrative or progression-bound items.'],
        ['item-type-upgrade-key', 'Upgrade Key', 'Unique protected resources that unlock progression.'],
        ['item-type-currency', 'Currency Proxy', 'Currency-like item data when a world pickup needs an item definition.'],
      ],
    ),
  ],
  'Reading & identifying': [
    ...entries(
      'implemented',
      'Rarity language',
      ['Specs/item_system_v1.md', 'Specs/item_schema_v2.md'],
      [
        ['rarity-common', 'Common', 'Baseline readable gear and supplies.'],
        ['rarity-green', 'Green', 'The first magical-item rarity tier.'],
        ['rarity-blue', 'Blue', 'A stronger curated magical-item tier.'],
        ['rarity-purple', 'Purple', 'A high-rarity curated magical-item tier.'],
        ['rarity-red', 'Red', 'A top curated tier, paired with Gold in the design shorthand.'],
        ['rarity-gold', 'Gold', 'The highest presentation tier in the six-tier site language.'],
      ],
    ),
    ...entries(
      'playtest',
      'Inventory reading',
      'stories/done/US-079-playable-inventory-arena.md',
      [
        ['item-filters', 'Category filters', 'All, Weapons, Armor, Trinkets, Consumables, Materials, Quest, and Magical filters are present.'],
        ['item-rarity-color', 'Rarity color and text', 'Rows visibly distinguish rarity and do not rely only on color.'],
        ['item-unidentified-state', 'Unidentified state', 'The amulet hides its final name and shows an Identify action.'],
        ['item-identified-state', 'Identified state', 'The action reveals “Mysterious Amulet” and removes the button.'],
        ['item-resource-ledger', 'Stored Resources ledger', 'Auto-stored Iron Ore and Town Stone appear separately from carried items.'],
      ],
    ),
    entry(
      'planned',
      'Town service',
      'Specs/village_system_v1.md §4.2',
      'item-mage-tower-identification',
      'Mage Tower identification visit',
      'Final identification is intended to happen through the Mage Tower, not the arena’s test button.',
    ),
  ],
  'Equipping & build identity': [
    ...entries(
      'playtest',
      'Current five-weapon loadout',
      'stories/done/US-078-playable-weapon-arena.md',
      [
        ['gear-longsword', 'Longsword', 'Balanced sweep weapon in the current arena loadout.'],
        ['gear-dagger', 'Dagger', 'Fast thrust weapon in the current arena loadout.'],
        ['gear-greatsword', 'Greatsword', 'Slow two-handed power weapon in the current arena loadout.'],
        ['gear-spear', 'Spear', 'Long-reach polearm in the current arena loadout.'],
        ['gear-mace', 'Mace', 'Blunt posture weapon in the current arena loadout.'],
      ],
    ),
    ...entries(
      'implemented',
      'Profile-only melee weapons',
      [
        'stories/done/US-025-blade-family-weapon-profiles.md',
        'stories/done/US-026-blunt-polearm-weapon-profiles.md',
      ],
      [
        ['gear-shortsword', 'Shortsword', 'Attack profiles exist, but no current arena DataAsset is equipped.'],
        ['gear-axe', 'Axe', 'Attack profiles exist, but no current arena DataAsset is equipped.'],
        ['gear-quarterstaff', 'Quarterstaff', 'Attack profiles exist, but no current arena DataAsset is equipped.'],
      ],
    ),
    entry(
      'recovery',
      'Profile-only melee weapons',
      'stories/done/US-083-recovery-combat-abilities-and-input.md — N29',
      'gear-unarmed',
      'Unarmed',
      'Profiles exist in the factory, but the live fallback has no attack content.',
    ),
    ...entries(
      'planned',
      'Ranged and alternate weapon families',
      ['stories/PLAN.md — Epic 6', 'Specs/skill_sheet_v1.1.md'],
      [
        ['gear-longbow', 'Longbow', 'A designed weapon skill; the weapon implementation story still needs design input.'],
        ['gear-shortbow', 'Shortbow', 'A designed weapon skill; the weapon implementation story still needs design input.'],
        ['gear-crossbow', 'Crossbow', 'A designed weapon skill; crossbow content still needs design input.'],
        ['gear-throwables', 'Throwables', 'Named in the roadmap without a final design.'],
        ['gear-wands', 'Wands', 'Named in the roadmap without a final design.'],
        ['gear-two-weapon', 'Two-Weapon Fighting', 'Named in the skill sheet and roadmap without implementation.'],
      ],
    ),
    ...entries(
      'planned',
      'Armor families',
      'Specs/skill_sheet_v1.1.md',
      [
        ['gear-leather', 'Leather Armor', 'Mobility-focused armor with dodge and stealth mastery.'],
        ['gear-chainmail', 'Chainmail Armor', 'Balanced protection with block and bleed benefits.'],
        ['gear-plate', 'Plate Armor', 'Heavy defense with posture and stagger resistance.'],
      ],
    ),
    ...entries(
      'planned',
      'Shield families',
      'Specs/skill_sheet_v1.1.md',
      [
        ['gear-buckler', 'Buckler Shield', 'A mobile parry-focused small shield.'],
        ['gear-scutum', 'Scutum Shield', 'A large protective shield with ally-cover potential.'],
        ['gear-heater', 'Heater Shield', 'A balanced guard-and-counter shield.'],
      ],
    ),
    entry(
      'recovery',
      'Found-item actions',
      'ProjectMordecai issue #27',
      'gear-use-equip-action',
      'Use / Equip action',
      'Picked-up items reach Inventory but do not yet offer the final player action.',
    ),
    entry(
      'recovery',
      'Found-item actions',
      'ProjectMordecai issue #36',
      'gear-weapon-effects',
      'Weapon effects',
      'Configured weapon effects do not currently reach the ability system.',
    ),
    entry(
      'planned',
      'Found-item actions',
      'stories/PLAN.md — US-072',
      'gear-equipment-panel',
      'Equipment panel',
      'Weapon sets and armor need their parent systems before the final menu panel.',
    ),
  ],
  'Loot in the world': [
    ...entries(
      'planned',
      'Believable placement and drops',
      'Specs/game_design_v2.md §6',
      [
        ['loot-believable-drops', 'Believable enemy drops', 'Creatures should drop plausible materials; wolves do not drop gold.'],
        ['loot-guaranteed-signature', 'Guaranteed wielded magic item', 'A boss or elite visibly using a magic weapon should drop it.'],
        ['loot-weapon-racks', 'Weapon racks', 'World-placed equipment should also function as environmental dressing.'],
        ['loot-armor-stands', 'Armor stands', 'Armor should be found in believable world placements.'],
        ['loot-chests', 'Chests', 'Containers hold curated equipment and progression rewards.'],
        ['loot-no-random-rare-grind', 'No random rare-weapon grind', 'Rare build items are curated rather than farmed from ordinary mobs.'],
      ],
    ),
    ...entries(
      'planned',
      'Named upgrade keys',
      'Specs/village_system_v1.md §1.3',
      [
        ['key-philosophers-stone', 'Philosopher’s Stone', 'A rare key associated with Mage Tower progression.'],
        ['key-heartwood-core', 'Heartwood Core', 'A rare key for organic or lumber-related progression.'],
        ['key-deepcore-prism', 'Deepcore Prism', 'A rare key associated with deep mining progression.'],
        ['key-saints-ember', 'Saint’s Ember', 'A named relic key in the village resource model.'],
        ['key-phase-lens', 'Phase Lens', 'A named relic key tied to phase technology.'],
        ['key-siege-sigil', 'Siege Sigil', 'A named relic key tied to defensive or siege progression.'],
      ],
    ),
    entry(
      'uncertain',
      'Curated magical items',
      'Specs/item_schema_v2.md',
      'loot-magic-item-roster',
      'Named magical-item roster',
      'The schema uses Emberfang only as an example; no supported production item roster is authored yet.',
      'Example schema data is not treated as promised game content.',
    ),
  ],
} satisfies Record<string, DetailedFeature[]>

const town = {
  'Resources & foundations': [
    entry(
      'playtest',
      'Current foundation',
      'stories/done/US-079-playable-inventory-arena.md',
      'town-resource-ledger',
      'Town-resource ledger',
      'Iron Ore and Town Stone auto-store and appear in the packaged Inventory ledger.',
    ),
    ...entries(
      'planned',
      'Common materials',
      'Specs/village_system_v1.md §1.1',
      [
        ['town-wood', 'Wood', 'A common building and upgrade material.'],
        ['town-stone', 'Stone', 'A common construction material.'],
        ['town-iron', 'Iron', 'A common metal input for village growth.'],
        ['town-fiber', 'Fiber', 'A common flexible material.'],
        ['town-herbs', 'Herbs', 'A common alchemical and clinic material.'],
        ['town-hides', 'Hides', 'A common monster and equipment material.'],
        ['town-monster-parts', 'Monster Parts', 'Common creature-derived progression resources.'],
      ],
    ),
    ...entries(
      'planned',
      'Refined materials',
      'Specs/village_system_v1.md §1.2',
      [
        ['town-lumber', 'Lumber', 'Refined wood produced by village infrastructure.'],
        ['town-cut-stone', 'Cut Stone', 'Refined construction stone.'],
        ['town-iron-ingots', 'Iron Ingots', 'Refined metal for higher-tier work.'],
        ['town-alchemical-extract', 'Alchemical Extract', 'A refined Alchemist input.'],
        ['town-arcane-ink', 'Arcane Ink', 'A refined Mage Tower research input.'],
      ],
    ),
    ...entries(
      'planned',
      'Upgrade keys and relics',
      'Specs/village_system_v1.md §1.3',
      [
        ['town-philosophers-stone', 'Philosopher’s Stone', 'Breaks an upgrade cap or unlocks a special arcane structure.'],
        ['town-heartwood-core', 'Heartwood Core', 'A rare infrastructure progression key.'],
        ['town-deepcore-prism', 'Deepcore Prism', 'A rare mining and infrastructure progression key.'],
        ['town-saints-ember', 'Saint’s Ember', 'A named village progression relic.'],
        ['town-phase-lens', 'Phase Lens', 'A named route or arcane progression relic.'],
        ['town-siege-sigil', 'Siege Sigil', 'A named defense and route progression relic.'],
      ],
    ),
    ...entries(
      'planned',
      'Settlement health',
      'Specs/village_system_v1.md §3',
      [
        ['town-population', 'Population', 'The number of villagers living in the settlement.'],
        ['town-housing-capacity', 'Housing Capacity', 'How many villagers the current housing can support.'],
        ['town-support-capacity', 'Support Capacity', 'A readable summary of food, health, safety, and livelihood support.'],
        ['town-healthy-margin', 'Healthy Margin', 'The buffer between support and population demand.'],
      ],
    ),
  ],
  'Buildings & services': [
    entry(
      'planned',
      'Major buildings',
      'Specs/village_system_v1.md §4.1',
      'building-alchemist',
      'Alchemist',
      'Stocks potions, cures, resistance tonics, and expedition consumables.',
    ),
    entry(
      'planned',
      'Major buildings',
      'Specs/village_system_v1.md §4.2',
      'building-mage-tower',
      'Mage Tower',
      'Provides identification, arcane research, spell insight, and magical route support; only the identification subsystem exists today.',
    ),
    ...entries(
      'planned',
      'Major buildings',
      ['Specs/village_system_v1.md §4', 'Specs/game_design_v2.md §7'],
      [
        ['building-blacksmith', 'Blacksmith', 'Reinforcement, repair, sharpening, preparation, and resistance sidegrades.'],
        ['building-clinic', 'Clinic', 'Recovery, cleansing, blessings, and resilience preparation.'],
        ['building-keep-walls', 'Keep, Walls, and Defenses', 'Safety, event resilience, and civic expansion support.'],
        ['building-lumber-yard', 'Lumber Yard', 'Produces and supports wood-based village growth.'],
        ['building-mine', 'Mine', 'Produces ore and supports deeper material progression.'],
        ['building-market', 'Market', 'Supports the settlement economy and services.'],
        ['building-housing', 'Housing', 'Raises Housing Capacity for village growth.'],
      ],
    ),
    ...entries(
      'planned',
      'Building tiers',
      'Specs/village_system_v1.md §2',
      [
        ['building-tier-functional', 'Functional', 'Tier 1: the service comes online.'],
        ['building-tier-improved', 'Improved', 'Tier 2: stronger or more reliable output.'],
        ['building-tier-advanced', 'Advanced', 'Tier 3: advanced service capabilities.'],
        ['building-tier-masterwork', 'Masterwork', 'Tier 4: the intended top building tier.'],
      ],
    ),
  ],
  'People & priorities': [
    ...entries(
      'planned',
      'Delegated jobs',
      'Specs/game_design_v2.md §7',
      [
        ['town-job-miners', 'Miners', 'Assigned labor for ore and mine output.'],
        ['town-job-lumber', 'Lumber workers', 'Assigned labor for wood and lumber output.'],
        ['town-job-research', 'Researchers', 'Assigned specialists for arcane or civic research.'],
        ['town-job-guards', 'Guards', 'Assigned villagers who improve safety and event resilience.'],
      ],
    ),
    ...entries(
      'planned',
      'Strategic management',
      ['stories/PLAN.md — Epic 9', 'Specs/village_system_v1.md'],
      [
        ['town-job-assignment', 'NPC job assignment', 'The player delegates work instead of performing repetitive chores.'],
        ['town-initiatives', 'One to three active initiatives', 'A small visible queue of current settlement priorities.'],
        ['town-specialists', 'Specialist arrivals', 'Village growth attracts people who unlock new services.'],
        ['town-events', 'Town events', 'Occasional focused missions affect workers, resources, or defenses.'],
      ],
    ),
  ],
  'Back to the expedition': [
    ...entries(
      'planned',
      'Alchemist provisioning',
      'Specs/village_system_v1.md §4.1',
      [
        ['service-health-potions', 'Health potions', 'Renewable healing stock with a limited restock pace.'],
        ['service-antidotes', 'Antidotes and cures', 'Preparation against poison and other afflictions.'],
        ['service-resistance-tonics', 'Resistance tonics', 'Consumable preparation for elemental or status pressure.'],
        ['service-special-consumables', 'Specialty expedition consumables', 'Route- or challenge-specific supplies.'],
      ],
    ),
    ...entries(
      'planned',
      'Blacksmith and Clinic preparation',
      'Specs/village_system_v1.md §§4.3–4.4',
      [
        ['service-reinforcement', 'Reinforcement', 'Longer-term equipment improvement.'],
        ['service-repair', 'Repair', 'Renewable equipment maintenance.'],
        ['service-sharpening', 'Sharpening', 'Temporary damage or posture preparation.'],
        ['service-resist-sets', 'Resistance sidegrades', 'Alternative gear preparation for known threats.'],
        ['service-recovery', 'Recovery services', 'Clinic support after difficult expeditions.'],
        ['service-cleansing', 'Cleansing', 'Removal or mitigation of harmful status pressure.'],
        ['service-blessings', 'Blessings', 'Preparation buffs tied to village quality.'],
      ],
    ),
    ...entries(
      'planned',
      'World access',
      'Specs/game_design_v2.md §7',
      [
        ['service-fast-travel', 'Fast-travel routes', 'Village growth unlocks safer movement between regions.'],
        ['service-shortcuts', 'World shortcuts', 'Town investment opens new or faster old-zone paths.'],
        ['service-barriers', 'Magical barrier support', 'Mage Tower research helps open arcane routes.'],
      ],
    ),
    ...entries(
      'planned',
      'Example town events',
      'Specs/game_design_v2.md §7',
      [
        ['event-protect-workers', 'Protect Workers', 'A focused mission to defend gathering labor.'],
        ['event-reclaim-mine', 'Reclaim the Mine from Goblins', 'A focused mission to restore a village resource site.'],
        ['event-defend-caravan', 'Defend the Caravan', 'A focused mission protecting village supply movement.'],
      ],
      'These are documented examples, not a confirmed complete mission roster.',
    ),
  ],
} satisfies Record<string, DetailedFeature[]>

const world = {
  'Exploration foundation': [
    ...entries(
      'playtest',
      'Current blockout',
      [
        'stories/done/US-001-project-foundation.md',
        'stories/done/US-100-recovery-playtest-test-maps.md',
      ],
      [
        ['world-fixed-camera', 'Fixed diorama camera', 'Follows the player without player-controlled rotation.'],
        ['world-keyboard-move', 'Keyboard movement', 'WASD movement passes packaged checks on the movement map.'],
        ['world-sprint', 'Sprint', 'Left Shift sprint toggle passes packaged checks.'],
        ['world-jump', 'Jump', 'Space and gamepad A jump paths are implemented; keyboard jump passes the movement checks.'],
        ['world-movement-map', 'MovementTestMap', 'An enemy-free grid for repeatable movement and menu checks.'],
        ['world-combat-map', 'CombatTestMap', 'A controlled grid with fixed targets for repeatable combat checks.'],
      ],
    ),
    ...entries(
      'recovery',
      'Open control and camera gaps',
      ['ProjectMordecai issues #26, #33, #34, and #85'],
      [
        ['world-gamepad-move', 'Gamepad movement', 'Invalid stick key names and a current jump-mode bug block full acceptance.'],
        ['world-facing', 'Mouse and right-stick facing', 'Facing remains pinned instead of following aim.'],
        ['world-wall-visibility', 'Player visibility behind near walls', 'No cutaway or fade keeps the player visible near foreground walls.'],
      ],
    ),
  ],
  'Authored world structure': [
    ...entries(
      'planned',
      'Cell framework milestones',
      'stories/PLAN.md — Epic 8 Phase 1',
      [
        ['world-cell-metadata', 'Cell metadata and core world types', 'Biome, cell, height, gate, and exit data for authored spaces.'],
        ['world-gameplay-markup', 'Gameplay markup and cell registry', 'Queryable markers for paths, gates, encounters, loot, and returns.'],
        ['world-cell-validation', 'Cell validation reports', 'Deterministic checks across individual cells and their connections.'],
        ['world-blockout-template', 'Blockout template cell', 'A repeatable camera-readable starting cell for content work.'],
      ],
    ),
    ...entries(
      'planned',
      'Pocket purposes',
      'Specs/map_style_technical_design_v1.md §3.2',
      [
        ['world-node-path', 'Path cell', 'A compact traversal connection.'],
        ['world-node-arena', 'Arena cell', 'A readable combat pocket.'],
        ['world-node-gate', 'Gate cell', 'A route blocked by a visible future requirement.'],
        ['world-node-vista', 'Vista cell', 'A landmark and route-reading space.'],
        ['world-node-secret', 'Secret cell', 'An optional space with readable hints.'],
        ['world-node-service', 'Service cell', 'A town or field-service space.'],
        ['world-node-dungeon', 'Dungeon Entrance cell', 'A clear transition into a main or micro-dungeon.'],
        ['world-node-shortcut', 'Shortcut Return cell', 'A return route opened from the far side.'],
        ['world-node-transition', 'Transition cell', 'A legible connection between regions or biome beats.'],
      ],
    ),
    ...entries(
      'planned',
      'Combat-pocket archetypes',
      'Specs/map_style_technical_design_v1.md §7.2',
      [
        ['world-pocket-open', 'Open Pocket', 'A broad readable combat floor.'],
        ['world-pocket-lane', 'Lane Pocket', 'A narrow space where thrusts and approach lines matter.'],
        ['world-pocket-ring', 'Ring Pocket', 'A circular movement and positioning challenge.'],
        ['world-pocket-crossroads', 'Crossroads Pocket', 'A multi-approach encounter space.'],
        ['world-pocket-ambush', 'Ambush Pocket', 'A readable but pressured entry setup.'],
        ['world-pocket-hazard', 'Hazard Pocket', 'A fight shaped by environmental danger.'],
        ['world-pocket-elevation', 'Elevation Pocket', 'A fight shaped by shallow height tiers.'],
        ['world-pocket-boss-ante', 'Boss Antechamber', 'A preparation and pacing space before a boss.'],
      ],
    ),
  ],
  'Six-biome journey': [
    ...entries(
      'planned',
      'Biomes',
      'Specs/world_design_v1.md',
      [
        ['biome-verdant', 'Verdant Wilds', 'A lush region about denial, overgrowth, and hidden decay.'],
        ['biome-searing', 'Searing Expanse', 'A desert of buried cities and machinery about control.'],
        ['biome-mire', 'Mire of Echoes', 'A foggy submerged region about avoidance.'],
        ['biome-crystal', 'Crystal Caverns', 'A frozen-time crystal region about preservation.'],
        ['biome-storm', 'Storm Peaks', 'A vertical floating-ruin region about obsession.'],
        ['biome-withered', 'Withered Kingdom', 'A preserved but lifeless final region about acceptance.'],
      ],
    ),
    ...entries(
      'planned',
      'Campaign structure',
      'Specs/game_design_v2.md §8',
      [
        ['world-main-dungeons', 'Main dungeons', 'One major dungeon is planned for each biome.'],
        ['world-micro-dungeons', 'Optional micro-dungeons', 'Compact optional challenge spaces within the regions.'],
        ['world-roaming-elites', 'Roaming elites', 'Higher-threat enemies that make exploration routes dynamic.'],
      ],
    ),
    ...entries(
      'planned',
      'World arc',
      'Specs/world_design_v1.md',
      [
        ['world-ancient-age', 'Ancient Age: Automation', 'The old attempt to replace fragile life with permanent systems.'],
        ['world-current-age', 'Current Age: Necromancy', 'The present attempt to prevent endings through undeath.'],
        ['world-player-era', 'Player Era: Acceptance', 'The player’s chance to allow a living, changing world.'],
        ['world-continuants', 'Continuants', 'Machine maintainers questioning whether endless continuation has purpose.'],
        ['world-control-ending', 'Control Ending', 'The player preserves the world by becoming the next Lich King.'],
        ['world-acceptance-ending', 'Acceptance Ending', 'Systems fail, the world changes, and people move on.'],
      ],
    ),
  ],
  'Traversal & return': [
    ...entries(
      'planned',
      'Biome tools',
      'Specs/world_design_v1.md',
      [
        ['tool-explosives', 'Explosives', 'Break Verdant barriers and expose hidden decay.'],
        ['tool-magnetic', 'Magnetic Device', 'Move and control machinery in the Searing Expanse and older routes.'],
        ['tool-invisibility', 'Invisibility Potion', 'Bypass enemies and open stealth routes from the Mire.'],
        ['tool-phase-talisman', 'Phase Talisman', 'Pass through barriers at the cost of health.'],
        ['tool-glider', 'Glider Cloak', 'Cross long gaps and support Storm Peaks traversal.'],
      ],
    ),
    entry(
      'uncertain',
      'Biome tools',
      'Specs/world_design_v1.md — Automaton Age',
      'tool-shock-device',
      'Shock Device',
      'Named as an ancient player-tool origin, but no biome unlock or implementation plan is assigned.',
    ),
    ...entries(
      'planned',
      'Traversal and discovery skills',
      ['Specs/skill_sheet_v1.1.md', 'stories/PLAN.md — Epic 8 Phase 2'],
      [
        ['world-sneaking', 'Sneaking', 'Quiet routes and reduced enemy detection.'],
        ['world-climbing', 'Climbing', 'Ledge and rough-surface traversal.'],
        ['world-swimming', 'Swimming', 'Water routes, breath, and current navigation.'],
        ['world-perception', 'Perception', 'Hidden objects, traps, and secret hints.'],
        ['world-tracking', 'Tracking', 'Creature trails and patrol reading.'],
        ['world-cartography', 'Cartography', 'Map detail, landmarks, shortcuts, and hazards.'],
        ['world-lockpicking', 'Lockpicking', 'Locked-route and container interaction.'],
        ['world-traps', 'Traps', 'Hazard discovery and player-placed traps.'],
      ],
    ),
    ...entries(
      'planned',
      'Gate language',
      ['Specs/game_design_v2.md §8', 'Specs/map_style_technical_design_v1.md §3.3'],
      [
        ['gate-explosive-wall', 'Explosive walls', 'Visible breakable barriers for later return.'],
        ['gate-magnetic', 'Magnetic rails and objects', 'Ancient machinery routes requiring magnetic control.'],
        ['gate-invisibility', 'Invisibility bypasses', 'Paths that reward stealth or unseen movement.'],
        ['gate-phase', 'Phase barriers', 'Solid-looking barriers crossed with phasing.'],
        ['gate-glider', 'Glider gaps', 'Long crossings opened by the Glider Cloak.'],
        ['gate-bridges', 'Bridge projects', 'Town investment restores or constructs crossings.'],
        ['gate-drainage', 'Drainage projects', 'Town infrastructure opens submerged routes.'],
        ['gate-siege', 'Siege tools', 'Settlement capability opens fortified paths.'],
      ],
    ),
  ],
} satisfies Record<string, DetailedFeature[]>

const enemies = {
  'Current arena enemy': [
    ...entries(
      'playtest',
      'Frontliner test family',
      [
        'stories/in-progress/US-085-recovery-frontliner-content.md',
        'stories/done/US-084-recovery-enemy-attack-path.md',
        'stories/done/US-092-recovery-enemy-indicators.md',
      ],
      [
        ['enemy-frontliner', 'Frontliner', 'A visible 200-health red placeholder that closes distance and attacks.'],
        ['enemy-basic-slash', 'Basic Slash', 'A readable melee profile that can damage and kill the player.'],
        ['enemy-aggro', 'Aggro and approach', 'Frontliners detect the player and move into profile-derived range.'],
        ['enemy-health-indicator', 'Enemy health indicator', 'One always-on red bar per living enemy.'],
        ['enemy-death-reset', 'Enemy death and arena reset', 'Killed targets disappear, then return at full health after player respawn.'],
      ],
    ),
    entry(
      'recovery',
      'Frontliner test family',
      'stories/in-progress/US-085-recovery-frontliner-content.md — FireSlash TODO',
      'enemy-fire-slash',
      'Fire Slash',
      'The content is referenced, but the current attacker uses Basic Slash and packaged Burning checks only warn.',
    ),
  ],
  'Readable encounter roles': [
    ...entries(
      'planned',
      'Designed roles',
      'Specs/enemy_archetypes_v1.md §3',
      [
        ['role-harasser', 'Harasser / Skirmisher', 'Mobile pressure that punishes tunnel vision.'],
        ['role-bruiser', 'Bruiser', 'Slow, committed, high-threat melee attacks.'],
        ['role-artillery', 'Artillery', 'Ranged pressure that forces movement.'],
        ['role-controller', 'Controller', 'Roots, slows, silence, fear, and battlefield shaping.'],
        ['role-support', 'Support', 'Healing, buffs, shields, and rear-line sustain.'],
        ['role-summoner', 'Summoner', 'Adds enemies and changes encounter composition over time.'],
        ['role-tank', 'Tank / Sentinel', 'Anchors lanes or objectives with stability and protection.'],
        ['role-assassin', 'Assassin', 'Burst pressure from stealth or sudden movement.'],
        ['role-area-denial', 'Area Denial', 'Hazards and zones that make safe space unsafe.'],
        ['role-phase-driver', 'Boss Phase Driver', 'Changes arena rules or cadence during a boss fight.'],
      ],
    ),
  ],
  'Threat & composition': [
    ...entries(
      'planned',
      'Enemy tiers',
      'Specs/enemy_archetypes_v1.md §2',
      [
        ['tier-basic', 'Basic', 'Baseline enemies used to establish encounter language.'],
        ['tier-elite', 'Elite', 'Stronger specialist enemies with higher threat.'],
        ['tier-champion', 'Champion', 'A high-threat tier between Elite and boss-scale encounters.'],
        ['tier-miniboss', 'Miniboss', 'A focused major threat below a region boss.'],
        ['tier-boss', 'Boss', 'A multi-rule encounter anchoring a region or act.'],
        ['tier-summon', 'Summon', 'A temporary enemy created by another ability or encounter.'],
      ],
    ),
    ...entries(
      'planned',
      'Readability and systems',
      'Specs/enemy_archetypes_v1.md',
      [
        ['enemy-windup-read', 'Windup clarity', 'Threat-appropriate preparation the fixed camera can read.'],
        ['enemy-audio-cues', 'Audio cues', 'Sound communicates attack timing and off-center threats.'],
        ['enemy-ground-markers', 'Ground markers', 'Used selectively for area danger and ranged pressure.'],
        ['enemy-resistances', 'Resistances and vulnerabilities', 'Elemental and status matchups create counterplay.'],
        ['enemy-synergy-tags', 'Role synergy', 'Composition tags describe which enemy jobs reinforce one another.'],
      ],
    ),
  ],
  'Biome rosters & bosses': [
    ...entries(
      'planned',
      'Named biome enemies',
      'Specs/world_design_v1.md',
      [
        ['enemy-dust-automaton', 'Dust Automaton', 'A Searing Expanse machine enemy.'],
        ['enemy-sentinel-frame', 'Sentinel Frame', 'A Searing Expanse enforcement machine.'],
        ['enemy-bog-wraith', 'Bog Wraith', 'A Mire of Echoes spirit enemy.'],
        ['enemy-rot-beast', 'Rot Beast', 'A Mire creature shaped by decay.'],
        ['enemy-drowned-automaton', 'Drowned Automaton', 'Ancient machinery submerged in the Mire.'],
        ['enemy-crystal-phantom', 'Crystal Phantom', 'A Crystal Caverns spectral enemy.'],
        ['enemy-echo-clone', 'Echo Clone', 'A repeated or delayed threat in the Crystal Caverns.'],
        ['enemy-storm-construct', 'Storm Construct', 'A machine enemy in the Storm Peaks.'],
        ['enemy-aerial-wraith', 'Aerial Wraith', 'An airborne Storm Peaks threat.'],
        ['enemy-undead-knight', 'Undead Knight', 'A Withered Kingdom martial enemy.'],
        ['enemy-royal-wraith', 'Royal Wraith', 'A spectral remnant of the final kingdom.'],
      ],
    ),
    ...entries(
      'planned',
      'Named bosses',
      'Specs/world_design_v1.md',
      [
        ['boss-thorn-guardian', 'Thorn Guardian', 'Regenerates, raises barriers, and traps with overgrowth.'],
        ['boss-iron-warden', 'Iron Warden', 'Uses strict patterns and grid-based attacks.'],
        ['boss-drowned-king', 'Drowned King', 'Hides attacks, phases in water, and delays damage.'],
        ['boss-crystal-seer', 'Crystal Seer', 'Repeats attacks, freezes zones, and creates delayed echoes.'],
        ['boss-tempest-ascendant', 'Tempest Ascendant', 'An aerial fight built around constant movement.'],
        ['boss-lich-king', 'Lich King', 'Uses player-like abilities and manipulates time, space, and fight state.'],
      ],
    ),
    entry(
      'uncertain',
      'Roster coverage',
      'Specs/world_design_v1.md — Verdant Wilds',
      'enemy-verdant-roster-gap',
      'Verdant Wilds enemy roster',
      'The region and boss are named, but the source does not name its ordinary enemy family.',
      'No enemy names are inferred for this biome.',
    ),
  ],
} satisfies Record<string, DetailedFeature[]>

export const systemFeatureInventory: Record<
  SystemSlug,
  Record<string, DetailedFeature[]>
> = {
  combat,
  progression,
  items,
  town,
  world,
  enemies,
}
