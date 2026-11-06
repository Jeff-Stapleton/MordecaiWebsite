import type {
  FeatureMechanics,
  MechanicItem,
  MechanicSupport,
} from './systemProgress'

type RankDescriptions = Partial<Record<number, string>>

const milestoneRanks = new Set([5, 10, 15, 20])

function rankProgression(
  descriptions: RankDescriptions,
  support: MechanicSupport = 'designed',
  ordinaryDescription?: (rank: number) => string,
): MechanicItem[] {
  return Array.from({ length: 20 }, (_, index) => {
    const rank = index + 1
    const description = descriptions[rank]
    const isMilestone = milestoneRanks.has(rank)
    const ordinary = ordinaryDescription?.(rank)

    return {
      label: `Rank ${rank}${isMilestone ? ' · Milestone' : ''}`,
      description:
        description ??
        ordinary ??
        'No distinct unlock or per-rank bonus is specified for this rank in the current source.',
      support: description ? support : ordinary ? 'implemented' : 'unspecified',
      milestone: isMilestone,
    }
  })
}

function item(
  label: string,
  description: string,
  support: MechanicSupport,
): MechanicItem {
  return { label, description, support }
}

function weapon(
  summary: string,
  profileItems: MechanicItem[],
  ranks: RankDescriptions | undefined,
  sources: string[],
): FeatureMechanics {
  const groups: FeatureMechanics['groups'] = [
    {
      title: 'Attack profiles',
      summary:
        'Profile numbers are documented initial tuning placeholders; the relative weapon feel is the durable design intent.',
      items: profileItems,
    },
  ]

  if (ranks) {
    groups.push({
      title: 'Skill ranks 1–20',
      summary:
        'Only authored ranks are described. Ranks without a distinct source entry are explicitly marked unspecified.',
      items: rankProgression(ranks),
    })
  } else {
    groups.push({
      title: 'Skill progression',
      items: [
        item(
          'Ranks not authored',
          'This weapon family is named in the roadmap, but no rank-by-rank skill table exists.',
          'unspecified',
        ),
      ],
    })
  }

  return { summary, groups, sources }
}

const weaponRanks: Record<string, RankDescriptions> = {
  longsword: {
    1: 'Arcing physical sweep; range, arc, and damage scale with rank, but the sheet still uses value placeholders.',
    5: 'Heavy attack becomes a charged spinning attack.',
    10: 'Light attack gains a faster three-swing combo.',
    15: 'Heavy gains range and leaves a two-second damaging cyclone.',
    20: 'At full health, the light-combo swings fire short-ranged projectiles.',
  },
  greatsword: {
    1: 'Powerful wide physical cleave; source values remain placeholders.',
    5: 'Heavy becomes a charged overhead slam with heavy posture damage.',
    10: 'Light attacks gain a two-swing combo ending in a cleave.',
    15: 'Heavy slam creates a damaging impact shockwave.',
    20: 'The light-combo finisher launches a short-ranged crescent of force.',
  },
  shortsword: {
    1: 'Quick physical sweep; source values remain placeholders.',
    5: 'Heavy becomes a channeled flurry.',
    10: 'Light attacks gain a rapid four-hit combo with a lunging finisher.',
    15: 'The heavy flurry can briefly move with its target.',
    20: 'Combo finishers grant a short movement-speed burst.',
  },
  dagger: {
    1: 'Rapid physical jab against the first target in range; source values remain placeholders.',
    5: 'Heavy becomes a shadow poke with bonus damage from behind.',
    10: 'Light attacks gain a rapid four-hit combo with bonus bleed buildup.',
    15: 'Heavy becomes a stab flurry that can pass through light targets.',
    20: 'A combo-finisher kill briefly cloaks the wielder.',
  },
  axe: {
    1: 'Overhead physical strike against the first target in range; source values remain placeholders.',
    5: 'Heavy becomes a hooking pull that drags light targets closer.',
    10: 'Light attacks gain a three-hit combo ending in an armor-breaking chop.',
    15: 'Heavy gains a wider arc and staggers nearby targets.',
    20: 'The light-combo finisher deals bonus damage to wounded targets.',
  },
  mace: {
    1: 'Crushing physical overhead strike against the first target in range; source values remain placeholders.',
    5: 'Heavy becomes a guard-breaking smash with bonus posture damage.',
    10: 'Light attacks gain a three-hit combo ending in an overhead blow.',
    15: 'Heavy creates a small damaging shockwave.',
    20: 'The light-combo finisher deals bonus damage to armored targets.',
  },
  spear: {
    1: 'Long-reaching physical thrust against the first target in range; source values remain placeholders.',
    5: 'Heavy becomes a sweeping brace that keeps nearby targets back.',
    10: 'Light attacks gain a three-hit combo ending in a pinning thrust.',
    15: 'Heavy becomes an impaling charge that carries targets backward.',
    20: 'The light-combo finisher releases a rapid thrust flurry.',
  },
  quarterstaff: {
    1: 'Quick physical sweep across a front arc; source values remain placeholders.',
    5: 'Heavy becomes a vaulting overhead gap-closer.',
    10: 'Light attacks gain a flowing three-hit combo with increased range.',
    15: 'Heavy creates a spinning guard that damages nearby targets.',
    20: 'The light-combo finisher launches the wielder into a repositioning step.',
  },
  unarmed: {
    1: 'Rapid physical jab against the first target in range; source values remain placeholders.',
    5: 'Heavy becomes a palm strike with heavy posture damage.',
    10: 'Light attacks gain a rapid five-hit combo ending in a rising blow.',
    15: 'Heavy can grapple and throw light targets.',
    20: 'Combo finishers briefly increase attack speed.',
  },
  longbow: {
    1: 'Fires one powerful physical projectile; source range and damage values remain placeholders.',
    5: 'Heavy becomes a power draw with greater projectile speed and damage.',
    10: 'Charged shots pierce the first target.',
    15: 'Heavy shots split into a volley after traveling a short distance.',
    20: 'Fully charged hits briefly reveal weak points.',
  },
  shortbow: {
    1: 'Rapidly fires one physical projectile; source range and damage values remain placeholders.',
    5: 'Heavy becomes an instant snap shot after a quick draw.',
    10: 'Dodging briefly empowers the next shot’s speed and damage.',
    15: 'Heavy fires a short volley.',
    20: 'Hits made while moving stack a brief attack-speed bonus.',
  },
  crossbow: {
    1: 'Instant powerful projectile with armor-piercing and physical damage; source values remain placeholders.',
    5: 'Heavy becomes a cranked bolt with bonus posture damage.',
    10: 'Shots deal more damage to armored targets.',
    15: 'Heavy bolts explode in a small impact radius.',
    20: 'Reloading after a kill becomes briefly much faster.',
  },
  dual: {
    1: 'Enters a timed dual-weapon stance with alternating physical strikes; source values remain placeholders.',
    5: 'Off-hand attacks can briefly deflect melee strikes during the combo.',
    10: 'Light attacks gain a rushing four-hit gap-closing combo.',
    15: 'Heavy becomes a spinning cross-slash against nearby targets.',
    20: 'The light-combo finisher strikes with both weapons for bonus damage.',
  },
}

const weapons: Record<string, FeatureMechanics> = {
  longsword: weapon(
    'Balanced slash weapon with three jump-avoidable sweeps and a committed spinning heavy.',
    [
      item('Light 1', '120° sweep at radius 200; 200/150/250 ms windup/active/recovery; power 12, stamina 8.', 'implemented'),
      item('Light 2', '150° sweep at radius 200; 180/170/250 ms; power 14, stamina 10.', 'implemented'),
      item('Light 3 · finisher', '180° sweep at radius 220; 250/200/350 ms; power 18, stamina 14.', 'implemented'),
      item('Heavy', 'Committed 360° sweep at radius 220; 500/250/500 ms; power 28, stamina 25, high posture.', 'implemented'),
      item('Counterplay rule', 'Sweeps are low and jump-avoidable; light recovery can cancel into dodge, while heavy cannot.', 'implemented'),
    ],
    weaponRanks.longsword,
    ['stories/done/US-025-blade-family-weapon-profiles.md', 'Specs/skill_sheet_v1.1.md'],
  ),
  greatsword: weapon(
    'Slow two-handed slash weapon with two broad sweeps and a high-posture overhead slam.',
    [
      item('Light 1', '180° sweep at radius 250; 350/200/400 ms; power 20, stamina 14.', 'implemented'),
      item('Light 2 · finisher', '200° sweep at radius 260; 400/250/500 ms; power 26, stamina 18.', 'implemented'),
      item('Heavy', 'Committed circle slam at radius 180; 600/200/600 ms; power 35, stamina 30, very high posture.', 'implemented'),
      item('Counterplay rule', 'Sweeps can be jumped; the slam hits airborne targets and is avoided by leaving its impact point.', 'implemented'),
    ],
    weaponRanks.greatsword,
    ['stories/done/US-025-blade-family-weapon-profiles.md', 'Specs/skill_sheet_v1.1.md'],
  ),
  shortsword: weapon(
    'Fast slash weapon with three sweeps, a thrust finisher, and a committed thrust heavy.',
    [
      item('Lights 1–3', 'Quick 90°, 100°, then 110° sweeps at radius 150–160; power 8/9/10 and stamina 5/6/7.', 'implemented'),
      item('Light 4 · finisher', 'Airborne-hitting capsule thrust, length 170 and width 60; 180/150/250 ms; power 14, stamina 10.', 'implemented'),
      item('Heavy', 'Committed capsule thrust, length 180 and width 70; 300/150/350 ms; power 20, stamina 18.', 'implemented'),
      item('Counterplay rule', 'Sweeps can be jumped; thrusts hit airborne targets and favor a side-dodge response.', 'implemented'),
    ],
    weaponRanks.shortsword,
    ['stories/done/US-025-blade-family-weapon-profiles.md', 'Specs/skill_sheet_v1.1.md'],
  ),
  dagger: weapon(
    'Fastest implemented melee profile: five narrow piercing thrusts and a committed lunge.',
    [
      item('Light 1', 'Capsule thrust, length 120 and width 40; 100/80/120 ms; power 5, stamina 3.', 'implemented'),
      item('Light 2', 'Capsule thrust, length 120 and width 40; 90/80/120 ms; power 5, stamina 3.', 'implemented'),
      item('Light 3', 'Capsule thrust, length 120 and width 45; 80/80/110 ms; power 6, stamina 4.', 'implemented'),
      item('Light 4', 'Capsule thrust, length 125 and width 45; 80/80/110 ms; power 6, stamina 4.', 'implemented'),
      item('Light 5 · finisher', 'Capsule thrust, length 150 and width 50; 120/100/200 ms; power 10, stamina 8.', 'implemented'),
      item('Heavy · lunge', 'Committed capsule thrust, length 160 and width 50; 250/120/300 ms; power 22, stamina 15.', 'implemented'),
      item('Counterplay rule', 'Every Dagger attack hits airborne targets and is best answered by side-dodging or spacing.', 'implemented'),
    ],
    weaponRanks.dagger,
    ['stories/done/US-025-blade-family-weapon-profiles.md', 'Specs/skill_sheet_v1.1.md'],
  ),
  axe: weapon(
    'Front-loaded slash weapon with two wide sweeps and a committed overhead slam.',
    [
      item('Light 1', '140° sweep at radius 180; 280/180/350 ms; power 16, stamina 12.', 'implemented'),
      item('Light 2 · finisher', '160° sweep at radius 190; 320/200/400 ms; power 22, stamina 16.', 'implemented'),
      item('Heavy', 'Committed circle slam at radius 160; 500/200/550 ms; power 30, stamina 24.', 'implemented'),
      item('Counterplay rule', 'The sweeps can be jumped; the heavy slam hits airborne targets.', 'implemented'),
    ],
    weaponRanks.axe,
    ['stories/done/US-026-blunt-polearm-weapon-profiles.md', 'Specs/skill_sheet_v1.1.md'],
  ),
  mace: weapon(
    'Blunt posture-breaker mixing a side sweep with two airborne-hitting slams.',
    [
      item('Light 1', '150° sweep at radius 160; 300/180/400 ms; power 14, stamina 12.', 'implemented'),
      item('Light 2 · finisher', 'Circle slam at radius 140; 320/200/450 ms; power 18, stamina 14.', 'implemented'),
      item('Heavy · ground pound', 'Committed circle slam at radius 180; 600/200/600 ms; power 28, stamina 28, highest posture scalar.', 'implemented'),
      item('Counterplay rule', 'The opening sweep can be jumped; both slams hit airborne targets.', 'implemented'),
    ],
    weaponRanks.mace,
    ['stories/done/US-026-blunt-polearm-weapon-profiles.md', 'Specs/skill_sheet_v1.1.md'],
  ),
  spear: weapon(
    'Longest implemented melee reach: two thrusts, a sweep finisher, and a committed lunge.',
    [
      item('Light 1', 'Capsule thrust, length 280 and width 50; 200/150/280 ms; power 12, stamina 8.', 'implemented'),
      item('Light 2', 'Capsule thrust, length 290 and width 55; 220/160/280 ms; power 14, stamina 10.', 'implemented'),
      item('Light 3 · finisher', '160° polearm sweep at radius 250; 280/200/350 ms; power 18, stamina 14.', 'implemented'),
      item('Heavy · charging lunge', 'Committed capsule thrust, length 320 and width 60; 400/180/450 ms; power 26, stamina 22.', 'implemented'),
      item('Counterplay rule', 'Thrusts hit airborne targets; the sweep finisher is jump-avoidable.', 'implemented'),
    ],
    weaponRanks.spear,
    ['stories/done/US-026-blunt-polearm-weapon-profiles.md', 'Specs/skill_sheet_v1.1.md'],
  ),
  quarterstaff: weapon(
    'Versatile two-handed blunt chain moving from sweep to thrust to wide sweep.',
    [
      item('Light 1', '130° sweep at radius 240; 200/160/250 ms; power 10, stamina 7.', 'implemented'),
      item('Light 2', 'Capsule thrust, length 250 and width 50; 180/140/240 ms; power 11, stamina 8.', 'implemented'),
      item('Light 3 · finisher', '200° sweep at radius 250; 250/180/320 ms; power 15, stamina 12.', 'implemented'),
      item('Heavy', 'Committed 360° sweep at radius 260; 400/220/450 ms; power 22, stamina 20.', 'implemented'),
      item('Counterplay rule', 'Sweeps are jump-avoidable; the middle thrust hits airborne targets.', 'implemented'),
    ],
    weaponRanks.quarterstaff,
    ['stories/done/US-026-blunt-polearm-weapon-profiles.md', 'Specs/skill_sheet_v1.1.md'],
  ),
  unarmed: weapon(
    'Fallback blunt profile with three short punches and an overhead slam; current live fallback content is missing.',
    [
      item('Lights 1–2', 'Two capsule punch thrusts, length 100 and width 40; 80/60/100 ms; power 3, stamina 2.', 'implemented'),
      item('Light 3 · finisher', 'Capsule punch thrust, length 110 and width 45; 100/80/140 ms; power 5, stamina 4.', 'implemented'),
      item('Heavy', 'Committed overhead circle slam at radius 80; 200/100/250 ms; power 8, stamina 8.', 'implemented'),
      item('Live integration gap', 'The factory profiles exist, but the current unequipped arena fallback has no content.', 'unspecified'),
    ],
    weaponRanks.unarmed,
    ['stories/done/US-026-blunt-polearm-weapon-profiles.md', 'stories/done/US-083-recovery-combat-abilities-and-input.md — N29', 'Specs/skill_sheet_v1.1.md'],
  ),
  longbow: weapon(
    'Designed as a slow charged, piercing ranged family; no current weapon implementation story is complete.',
    [
      item('Standard shot', 'Slow, powerful projectile; the skill sheet does not supply final range or damage values.', 'designed'),
      item('Draw behavior', 'Hold to charge while rooted; planned charged shots gain piercing through rank progression.', 'designed'),
      item('Aim support', 'Projectile families are intended to use subtle fan-out aim assist without lock-on.', 'designed'),
    ],
    weaponRanks.longbow,
    ['Specs/player_attacks_agent_brief_v1.md §5', 'Specs/skill_sheet_v1.1.md'],
  ),
  shortbow: weapon(
    'Designed as a rapid, mobile projectile family; no current weapon implementation story is complete.',
    [
      item('Standard shot', 'Rapid, non-piercing projectile; final range, damage, and cadence are unspecified.', 'designed'),
      item('Flurry', 'The attack brief describes holding to root and unleash a flurry; final controls and values remain unspecified.', 'designed'),
      item('Aim support', 'Projectile families are intended to use subtle fan-out aim assist without lock-on.', 'designed'),
    ],
    weaponRanks.shortbow,
    ['Specs/player_attacks_agent_brief_v1.md §5', 'Specs/skill_sheet_v1.1.md'],
  ),
  crossbow: weapon(
    'Designed armor-piercing projectile family whose specific implementation remains unscoped.',
    [
      item('Standard shot', 'Instant powerful bolt with physical and armor-piercing damage; final values are placeholders.', 'designed'),
      item('Other profiles', 'Reload cadence and concrete light/heavy attack assets are not specified.', 'unspecified'),
    ],
    weaponRanks.crossbow,
    ['Specs/skill_sheet_v1.1.md'],
  ),
  dual: weapon(
    'Designed stance for alternating two-weapon strikes; concrete weapon pair rules remain unspecified.',
    [
      item('Dual stance', 'Timed stance alternates fast strikes from both weapons.', 'designed'),
      item('Equipment rules', 'Allowed weapon pairings, off-hand stats, and final input profile are not specified.', 'unspecified'),
    ],
    weaponRanks.dual,
    ['Specs/skill_sheet_v1.1.md'],
  ),
  throwables: weapon(
    'Named in the roadmap without an authored attack profile or skill-rank table.',
    [item('Attack parameters', 'Projectile types, inputs, damage, recovery, and ammunition behavior are not specified.', 'unspecified')],
    undefined,
    ['stories/PLAN.md — Epic 6'],
  ),
  wands: weapon(
    'Named in the roadmap without an authored attack profile or skill-rank table.',
    [item('Attack parameters', 'Projectile behavior, inputs, elements, and rank progression are not specified.', 'unspecified')],
    undefined,
    ['stories/PLAN.md — Epic 6'],
  ),
}

function spell(
  summary: string,
  behavior: MechanicItem[],
  ranks: RankDescriptions,
  sources: string[],
): FeatureMechanics {
  return {
    summary,
    groups: [
      {
        title: 'Current behavior and profile',
        summary:
          'Implementation evidence is separated from future rank design and known recovery gaps.',
        items: behavior,
      },
      {
        title: 'Skill ranks 1–20',
        summary:
          'Every rank uses the implemented framework’s +5% Spell Power step. Milestones are labeled at ranks 5, 10, 15, and 20; unauthored techniques are not invented.',
        items: rankProgression(
          ranks,
          'designed',
          (rank) =>
            `No distinct technique is authored at this rank. The implemented spell framework applies its ordinary +5% power step, for a ${(
              1 +
              rank * 0.05
            ).toFixed(2)}× rank multiplier when the spell is connected to that skill.`,
        ),
      },
      {
        title: 'Shared spell framework',
        items: [
          item(
            'SP cost and cooldown',
            'Every spell reads configurable SP cost and cooldown values from its DataAsset. Exact authored values are shown above when a source provides them; otherwise they remain unspecified.',
            'implemented',
          ),
          item(
            'Upcast framework',
            'The framework supports a default 2× SP cost and 1.5× Spell Power. The player input for choosing an upcast remains unspecified.',
            'implemented',
          ),
          item(
            'Cast phases',
            'Spells use Windup, Cast, and Recovery phases with configurable movement and interruption policy.',
            'implemented',
          ),
        ],
      },
    ],
    sources,
  }
}

function designedSpell(
  summary: string,
  ranks: RankDescriptions,
  sources: string[],
): FeatureMechanics {
  return {
    summary,
    groups: [
      {
        title: 'Design status',
        items: [
          item(
            'Skill-sheet design only',
            'The current source specifies milestone techniques, but no implementation story or in-game profile was found.',
            'designed',
          ),
          item(
            'Numeric profile',
            'SP cost, cooldown, cast phases, power, range, duration, and other tuning values are not specified.',
            'unspecified',
          ),
        ],
      },
      {
        title: 'Skill ranks 1–20',
        summary:
          'Only the authored milestone ranks have mechanics. Ordinary ranks are listed explicitly as unspecified rather than assigned fictitious bonuses.',
        items: rankProgression(ranks),
      },
    ],
    sources,
  }
}

const fullSpellRanks: Record<string, RankDescriptions> = {
  fireWard: {
    1: 'Cast a ward that absorbs a flat amount of magic damage before expiring.',
    2: 'Increase shield HP.',
    3: 'Increase duration.',
    4: 'Reduce SP cost.',
    5: 'Elemental Attune: adapt to the first absorbed element and resist it for the ward’s duration.',
    6: 'Increase shield HP.',
    7: 'Increase Elemental Attune resistance.',
    8: 'Reduce cooldown.',
    9: 'The ward partially recharges over time if it has not broken.',
    10: 'Reflect Pulse: when the ward breaks, damage the attacker.',
    11: 'Increase reflected damage.',
    12: 'Increase shield HP.',
    13: 'Reflect briefly Silences the attacker.',
    14: 'Reduce SP cost.',
    15: 'Null Aura: suppress nearby enemy casting while the ward is active.',
    16: 'Increase Null Aura radius.',
    17: 'Increase shield HP.',
    18: 'Null Aura also reduces enemy posture regeneration.',
    19: 'Reduce cooldown.',
    20: 'Aegis of Denial: a perfect block auto-casts the ward for free and grants a two-second full-immunity burst.',
  },
  illusion: {
    1: 'Summon a short-lived decoy that draws enemy aggro.',
    2: 'Increase decoy duration.',
    3: 'Increase decoy HP.',
    4: 'Reduce SP cost.',
    5: 'Mirror Bait: the decoy explodes on death and applies Exposed nearby.',
    6: 'Increase explosion radius.',
    7: 'Increase decoy duration.',
    8: 'The decoy mimics the last attack animation.',
    9: 'Reduce cooldown.',
    10: 'Dual Image: summon two decoys.',
    11: 'Increase decoy HP.',
    12: 'Decoys deal minor contact damage.',
    13: 'Increase Mirror Bait’s Exposed duration.',
    14: 'Reduce SP cost.',
    15: 'Phantom Swap: recast to exchange positions with a decoy.',
    16: 'Increase swap range.',
    17: 'Swapping grants brief invulnerability frames.',
    18: 'Increase decoy duration.',
    19: 'Reduce cooldown.',
    20: 'Hall of Mirrors: summon a ring of decoys whose confusion field makes enemies attack each other.',
  },
  blur: {
    1: 'Gain a short evasion buff: enemy accuracy falls and ranged attacks can miss.',
    2: 'Increase duration.',
    3: 'Increase evasion chance.',
    4: 'Reduce SP cost.',
    5: 'Afterimage: dodging during Blur leaves a damaging afterimage.',
    6: 'Increase afterimage damage.',
    7: 'Increase duration.',
    8: 'Increase evasion chance.',
    9: 'Reduce cooldown.',
    10: 'Flicker: a perfect dodge grants brief invisibility and breaks enemy targeting.',
    11: 'Increase invisibility duration.',
    12: 'Attacks from Flicker invisibility deal bonus damage.',
    13: 'Increase evasion chance.',
    14: 'Reduce SP cost.',
    15: 'Phase Drift: pass through enemies while Blur is active.',
    16: 'Increase duration.',
    17: 'Passing through enemies applies Blind.',
    18: 'Increase afterimage damage.',
    19: 'Reduce cooldown.',
    20: 'Untraceable: Blur persists until the caster takes a hit instead of using a fixed duration.',
  },
  snare: {
    1: 'Root one target briefly; it can still attack and block.',
    2: 'Increase root duration.',
    3: 'Increase range.',
    4: 'Reduce SP cost.',
    5: 'Thorned Bind: rooted targets take damage when they attack.',
    6: 'Increase thorn damage.',
    7: 'Increase root duration.',
    8: 'Apply a brief slow before the full root.',
    9: 'Reduce cooldown.',
    10: 'Spreading Roots: if the rooted target dies, root the nearest enemy.',
    11: 'Increase spread range.',
    12: 'Increase root duration.',
    13: 'Rooted enemies take bonus posture damage.',
    14: 'Reduce SP cost.',
    15: 'Petrify: spend extra SP for full action lockout, paired with reduced damage taken.',
    16: 'Increase Petrify duration.',
    17: 'Low-health petrified targets shatter for area damage.',
    18: 'Increase root duration.',
    19: 'Reduce cooldown.',
    20: 'Living Prison: create an area that Roots and Silences enemies and damages boss posture on cast.',
  },
  enchant: {
    1: 'Add minor elemental damage to melee attacks, matching the caster’s highest element.',
    2: 'Increase bonus damage.',
    3: 'Increase duration.',
    4: 'Reduce SP cost.',
    5: 'Status Imbue: enchanted hits build the matching elemental status.',
    6: 'Increase status buildup rate.',
    7: 'Increase duration.',
    8: 'Increase bonus damage.',
    9: 'Reduce cooldown.',
    10: 'Elemental Burst: light-combo finishers and charged heavies trigger an area explosion.',
    11: 'Increase burst damage.',
    12: 'Increase burst radius.',
    13: 'Increase duration.',
    14: 'Reduce SP cost.',
    15: 'Adaptive Edge: choose the element on cast instead of always using the highest.',
    16: 'Increase bonus damage.',
    17: 'Switching element during the effect costs no SP.',
    18: 'Enchanted weapon hits restore a small amount of SP.',
    19: 'Reduce cooldown.',
    20: 'Runic Overload: the enchantment persists and every fifth hit triggers Elemental Burst.',
  },
  enfeeble: {
    1: 'Apply Weakened to reduce the target’s posture damage.',
    2: 'Increase Weakened duration.',
    3: 'Increase range.',
    4: 'Reduce SP cost.',
    5: 'Corrode: also apply Corroded to reduce armor effectiveness and disable sharpen/repair benefits.',
    6: 'Increase Corroded duration.',
    7: 'Increase Weakened potency.',
    8: 'Spread Enfeeble to one nearby enemy on cast.',
    9: 'Reduce cooldown.',
    10: 'Expose: also apply Exposed so the next hit deals bonus damage.',
    11: 'Spread to two nearby enemies.',
    12: 'Increase all applied debuff durations.',
    13: 'Enfeebled enemies regenerate posture more slowly.',
    14: 'Reduce SP cost.',
    15: 'Hex Mark: the target takes bonus damage from all sources.',
    16: 'Increase the Hex Mark bonus.',
    17: 'Spread to three nearby enemies.',
    18: 'Increase all applied debuff durations.',
    19: 'Reduce cooldown.',
    20: 'Unravel: area Enfeeble at maximum potency, with immediate boss-posture damage.',
  },
  blink: {
    1: 'Short teleport in the aim direction with brief invulnerability frames.',
    2: 'Increase range.',
    3: 'Reduce recovery after teleporting.',
    4: 'Reduce SP cost.',
    5: 'Blink Strike: attacking within 0.5 seconds deals bonus damage.',
    6: 'Increase Blink Strike damage.',
    7: 'Increase range.',
    8: 'Leave a brief damaging distortion at the origin.',
    9: 'Reduce cooldown.',
    10: 'Phase Step: pass through thin walls and enemies.',
    11: 'Passing through enemies deals damage.',
    12: 'Increase range.',
    13: 'Reduce SP cost.',
    14: 'Blink can be cast while staggered.',
    15: 'Recall Anchor: hold to set an anchor, then recast to return.',
    16: 'Increase anchor duration.',
    17: 'Recalling triggers area damage at both positions.',
    18: 'Increase range.',
    19: 'Reduce cooldown.',
    20: 'Rift Walk: gain two charges; chained blinks leave a connecting damage trail.',
  },
  restoration: {
    1: 'Heal a moderate amount of HP over time.',
    2: 'Increase total healing.',
    3: 'Increase healing speed.',
    4: 'Reduce SP cost.',
    5: 'Cleanse: also remove one negative status.',
    6: 'Increase total healing.',
    7: 'Cleanse prioritizes the most dangerous status.',
    8: 'Reduce cast time.',
    9: 'Reduce cooldown.',
    10: 'Sanctuary: cast a ground area that heals over time.',
    11: 'Increase Sanctuary duration.',
    12: 'Increase Sanctuary radius.',
    13: 'Increase total healing.',
    14: 'Reduce SP cost.',
    15: 'Purify: cleanse all negative statuses and briefly grant status immunity.',
    16: 'Increase immunity duration.',
    17: 'Increase total healing.',
    18: 'Sanctuary also cleanses statuses on each tick.',
    19: 'Reduce cooldown.',
    20: 'Renewal: once per cast, hitting zero HP during the heal revives the target to 30% HP.',
  },
}

const milestoneSpellRanks: Record<string, RankDescriptions> = {
  fireball: {
    1: 'The sheet describes a channel of multiple force projectiles, conflicting with the implemented single fire projectile; source values are placeholders.',
    5: 'Increase the impact explosion size.',
    10: 'Direct hits leave burning ground briefly.',
    15: 'Impact splits into smaller embers.',
    20: 'Charged casts create a much larger explosion and knock back nearby targets.',
  },
  cone: {
    1: 'The source row accidentally repeats Stone Skin’s armor text, so no reliable authored Rank 1 description is available.',
    5: 'Increase cone width.',
    10: 'Repeated hits can briefly freeze slowed targets.',
    15: 'Leave an ice patch after casting.',
    20: 'Release a second delayed burst around the caster.',
  },
  missile: {
    1: 'Channel multiple homing force projectiles over time; source counts and values are placeholders.',
    5: 'Fire one additional projectile while channeling.',
    10: 'Projectiles seek nearby targets more aggressively.',
    15: 'Ending the channel releases stored projectiles at nearby enemies.',
    20: 'A full channel creates orbiting projectiles before firing.',
  },
  stone: {
    1: 'Grant armor for a duration; source values are placeholders.',
    5: 'Increase granted armor.',
    10: 'Light hits no longer interrupt the caster while active.',
    15: 'Reflect minor damage to melee attackers.',
    20: 'The shell damages nearby targets when it shatters.',
  },
  sleep: {
    1: 'Touch one target and put it to sleep for a duration; source values are placeholders.',
    5: 'Increase sleep duration.',
    10: 'At close range, Sleep can spread to one nearby target.',
    15: 'The first hit against a sleeping target deals bonus damage.',
    20: 'A target sleeping for the full duration spreads drowsiness nearby.',
  },
  frostWard: {
    1: 'Create a timed shield that absorbs all frost damage.',
    5: 'Increase ward duration.',
    10: 'Absorbing frost damage empowers the next spell or weapon attack.',
    15: 'The ward slows nearby attackers with a chilling aura.',
    20: 'When the shield breaks, it releases a wave of frost.',
  },
  float: {
    1: 'Continue floating above the ground for a duration after jumping.',
    5: 'Increase Float duration.',
    10: 'Jumping while floating grants a short air dash.',
    15: 'Prevent fall damage while Float is active.',
    20: 'Holding jump allows a brief stationary hover.',
  },
  counter: {
    1: 'Fire a quick beam that interrupts casting on the target it hits.',
    5: 'Increase the enemy-cast interruption window.',
    10: 'Interrupted targets are briefly Silenced.',
    15: 'A successful counter reduces the next spell’s cost.',
    20: 'A successful interruption reflects part of the spell at its caster.',
  },
}

const spells: Record<string, FeatureMechanics> = {
  fireball: spell(
    'A designed projectile spell whose current packaged path is broken; its skill-sheet identity also conflicts with implementation.',
    [
      item('Implemented Rank 1 profile', 'Spawn one configurable projectile in the aim direction; on hit, apply fire damage equal to Spell Power.', 'implemented'),
      item('Default projectile setup', 'Speed 2,000 cm/s, lifetime 3 seconds, radius 30 cm; values remain configurable in the Spell DataAsset.', 'implemented'),
      item('Arena DataAsset', '3 SP; 2-second cooldown; 0.2-second windup, 0.3-second cast, 0.3-second recovery; power 25; range 1,500; slow while casting.', 'implemented'),
      item('Current recovery gap', 'The packaged cast spends SP but does not currently spawn a projectile or deal damage.', 'playtest'),
      item('Design conflict', 'The skill sheet calls Rank 1 a channel of multiple force projectiles; that text does not match the implemented fire projectile.', 'unspecified'),
    ],
    milestoneSpellRanks.fireball,
    ['stories/done/US-020-damage-spells.md', 'stories/done/US-057-playable-magic-arena.md', 'stories/backlog/US-087-recovery-fireball-and-blink.md', 'Specs/skill_sheet_v1.1.md'],
  ),
  cone: spell(
    'A cold-damage cone with authored milestone upgrades but a corrupted Rank 1 skill-sheet row.',
    [
      item('Implemented Rank 1 profile', 'Query a front arc and apply cold damage equal to Spell Power to every enemy inside it.', 'implemented'),
      item('Targeting boundary', 'Targets behind or outside the arc are missed; targets exactly on the edge are included.', 'implemented'),
      item('Status gap', 'Frostbitten buildup was left as a design decision; current implementation evidence supports cold damage only.', 'unspecified'),
    ],
    milestoneSpellRanks.cone,
    ['stories/done/US-020-damage-spells.md', 'Specs/skill_sheet_v1.1.md'],
  ),
  missile: spell(
    'A channeled homing force spell that divides total Spell Power across its projectiles.',
    [
      item('Implemented Rank 1 profile', 'Fire a configurable number of projectiles over Cast Time; default count is five.', 'implemented'),
      item('Damage model', 'Each missile deals Spell Power divided by projectile count, so total channel damage equals Spell Power.', 'implemented'),
      item('Targeting', 'Each projectile homes toward the nearest valid target in range; without one, it follows aim direction.', 'implemented'),
    ],
    milestoneSpellRanks.missile,
    ['stories/done/US-020-damage-spells.md', 'Specs/skill_sheet_v1.1.md'],
  ),
  stone: spell(
    'A timed self-buff granting flat damage reduction, with future interruption, reflection, and shatter milestones.',
    [
      item('Implemented Rank 1 profile', 'Apply a timed Stone Skin effect granting configurable flat damage reduction.', 'implemented'),
      item('Arena DataAsset', '4 SP; 15-second cooldown; 0.3-second windup, 0.5-second cast, 0.3-second recovery; BasePower 50; 10-second duration; rooted while casting.', 'implemented'),
      item('Defensive-model conflict', 'US-020 treats BasePower as flat DamageReduction, while US-057 labels the arena value as shield HP.', 'unspecified'),
      item('Expiry', 'The status tag and damage reduction end when the configured duration expires.', 'implemented'),
      item('Current presentation gap', 'The packaged status indicator can show only “Status” instead of the spell name.', 'playtest'),
    ],
    milestoneSpellRanks.stone,
    ['stories/done/US-020-damage-spells.md', 'stories/done/US-057-playable-magic-arena.md', 'ProjectMordecai issue #21', 'Specs/skill_sheet_v1.1.md'],
  ),
  blink: spell(
    'Near-instant aim-direction teleport with collision clamping and brief invulnerability.',
    [
      item('Implemented Rank 1 profile', 'Teleport forward by configured Range; clamp before walls using a line trace and safety buffer.', 'implemented'),
      item('Defense window', 'Apply brief invulnerability after teleport; the documented default is 0.2 seconds.', 'implemented'),
      item('Arena DataAsset', '2 SP; 4-second cooldown; no windup or cast time; 0.2-second recovery; range 500; free movement.', 'implemented'),
      item('Current recovery gap', 'The packaged cast can spend SP without moving when an enemy blocks the route.', 'playtest'),
    ],
    fullSpellRanks.blink,
    ['stories/done/US-021-utility-spells.md', 'stories/done/US-057-playable-magic-arena.md', 'stories/backlog/US-087-recovery-fireball-and-blink.md', 'Specs/new_spells_proposal.md'],
  ),
  sleep: spell(
    'Single-target action lockout that ends immediately when the sleeping target takes damage.',
    [
      item('Implemented Rank 1 profile', 'Trace to the first enemy in aim range and apply Sleeping for a configurable duration.', 'implemented'),
      item('While sleeping', 'The target cannot move, attack, or activate abilities.', 'implemented'),
      item('Wake rule', 'Any health loss removes Sleep immediately.', 'implemented'),
    ],
    milestoneSpellRanks.sleep,
    ['stories/done/US-021-utility-spells.md', 'Specs/skill_sheet_v1.1.md'],
  ),
  fireWard: spell(
    'Self shield currently implemented for fire damage only; the full-rank proposal starts broader, creating a known scope conflict.',
    [
      item('Implemented Rank 1 profile', 'Create a configurable shield that absorbs fire damage until depleted or expired.', 'implemented'),
      item('Damage filter', 'Physical, cold, force, and other non-fire damage pass through.', 'implemented'),
      item('Design conflict', 'The full-rank proposal says Rank 1 absorbs magic damage, while the skill sheet and implementation use fire-only absorption.', 'unspecified'),
    ],
    fullSpellRanks.fireWard,
    ['stories/done/US-021-utility-spells.md', 'Specs/new_spells_proposal.md', 'Specs/skill_sheet_v1.1.md'],
  ),
  bless: spell(
    'Implemented non-stacking physical-and-magical damage buff, but no authored skill-rank table exists.',
    [
      item('Implemented Rank 1 behavior', 'Apply configurable bonuses to physical and magical damage multipliers for a configured duration.', 'implemented'),
      item('Recast rule', 'Recasting refreshes duration without stacking another bonus.', 'implemented'),
      item('Progression gap', 'Bless is not an explicit entry in the skill sheet; its skill tie and rank unlocks remain a design decision.', 'unspecified'),
    ],
    {},
    ['stories/done/US-022-support-spells.md'],
  ),
  restoration: spell(
    'Self heal-over-time whose current implementation covers only the Rank 1 recovery behavior.',
    [
      item('Implemented Rank 1 profile', 'Heal once per second over a configured duration; total healing is Spell Power and cannot exceed Max Health.', 'implemented'),
      item('Recast rule', 'Recasting refreshes duration and recalculates the heal amount.', 'implemented'),
      item('Arena DataAsset', '3 SP; 10-second cooldown; 0.2-second windup, 0.4-second cast, 0.2-second recovery; total heal 40 over 5 seconds; slow while casting.', 'implemented'),
      item('Packaged evidence', 'The current combat path visibly raises Health and spends three SP.', 'playtest'),
    ],
    fullSpellRanks.restoration,
    ['stories/done/US-022-support-spells.md', 'stories/done/US-057-playable-magic-arena.md', 'stories/done/US-086-recovery-death-screen-kill-counter.md', 'Specs/new_spells_proposal.md'],
  ),
  snare: spell(
    'Designed single-target root; implementation state remains uncertain because its story is filed as done with unchecked criteria.',
    [
      item('Planned Rank 1 behavior', 'Trace to one target and Root it for a configurable duration; movement stops, but attacks and blocks remain available.', 'designed'),
      item('Implementation evidence gap', 'Every acceptance criterion and test in US-023 remains unchecked.', 'unspecified'),
    ],
    fullSpellRanks.snare,
    ['stories/done/US-023-tactical-spells.md', 'Specs/new_spells_proposal.md'],
  ),
  enfeeble: spell(
    'Designed target debuff beginning with Weakened; implementation state remains uncertain.',
    [
      item('Planned Rank 1 behavior', 'Trace to one target and apply configurable Weakened, reducing its physical damage multiplier.', 'designed'),
      item('Implementation evidence gap', 'Every acceptance criterion and test in US-023 remains unchecked.', 'unspecified'),
    ],
    fullSpellRanks.enfeeble,
    ['stories/done/US-023-tactical-spells.md', 'Specs/new_spells_proposal.md'],
  ),
  enchant: spell(
    'Designed elemental melee buff; implementation state remains uncertain and element selection is unresolved.',
    [
      item('Planned Rank 1 behavior', 'Apply a timed self-buff adding elemental damage to melee hits.', 'designed'),
      item('Element conflict', 'US-023 defaults Rank 1 to Fire, while the rank proposal says to match the highest element.', 'unspecified'),
      item('Implementation evidence gap', 'Every acceptance criterion and test in US-023 remains unchecked.', 'unspecified'),
    ],
    fullSpellRanks.enchant,
    ['stories/done/US-023-tactical-spells.md', 'Specs/new_spells_proposal.md'],
  ),
  illusion: spell(
    'Damageable timed decoy that draws enemy aggro; later ranks add explosions, copies, swapping, and confusion.',
    [
      item('Implemented Rank 1 profile', 'Spawn a decoy just ahead of the caster with configurable HP and duration.', 'implemented'),
      item('Aggro behavior', 'Enemies in range prefer the decoy over the player.', 'implemented'),
      item('Limits', 'The current actor is a minimal targetable decoy; it does not mirror actions as the older skill-sheet row suggests.', 'unspecified'),
    ],
    fullSpellRanks.illusion,
    ['stories/done/US-060-tactical-spells-summon-evasion.md', 'Specs/new_spells_proposal.md', 'Specs/skill_sheet_v1.1.md'],
  ),
  blur: spell(
    'Timed ranged-evasion buff; melee remains unaffected at Rank 1.',
    [
      item('Implemented Rank 1 profile', 'Apply a configurable chance for incoming ranged projectile attacks to miss.', 'implemented'),
      item('Damage boundary', 'Melee attacks are unaffected at Rank 1.', 'implemented'),
      item('Expiry', 'Evasion and the Blurred status end with the configured duration.', 'implemented'),
    ],
    fullSpellRanks.blur,
    ['stories/done/US-060-tactical-spells-summon-evasion.md', 'Specs/new_spells_proposal.md'],
  ),
  frostWard: designedSpell(
    'A frost-absorbing ward with authored milestone upgrades but no implementation evidence.',
    milestoneSpellRanks.frostWard,
    ['Specs/skill_sheet_v1.1.md'],
  ),
  float: designedSpell(
    'An aerial-mobility spell with authored float, air-dash, fall-safety, and hover milestones but no implementation evidence.',
    milestoneSpellRanks.float,
    ['Specs/skill_sheet_v1.1.md'],
  ),
  counter: designedSpell(
    'A casting-interruption beam with authored silence, cost-reduction, and reflection milestones but no implementation evidence.',
    milestoneSpellRanks.counter,
    ['Specs/skill_sheet_v1.1.md'],
  ),
}

function townBuilding(
  summary: string,
  services: string[],
  notes: MechanicItem[],
  sources: string[],
): FeatureMechanics {
  return {
    summary,
    groups: [
      {
        title: 'Supported services',
        items: services.map((service) => {
          const [label, ...description] = service.split(' — ')
          return item(label, description.join(' — '), 'designed')
        }),
      },
      {
        title: 'Four-tier framework',
        summary:
          'The source names the shared tiers but does not assign this building exact costs, prerequisites, or tier-by-tier service unlocks.',
        items: [
          item('Tier 1 · Functional', 'Building-specific benefit and unlock requirements are not yet specified.', 'unspecified'),
          item('Tier 2 · Improved', 'Building-specific benefit and unlock requirements are not yet specified.', 'unspecified'),
          item('Tier 3 · Advanced', 'Building-specific benefit and unlock requirements are not yet specified.', 'unspecified'),
          item('Tier 4 · Masterwork', 'Building-specific benefit and unlock requirements are not yet specified.', 'unspecified'),
        ],
      },
      {
        title: 'Rules and requirements',
        items: notes,
      },
    ],
    sources,
  }
}

const town: Record<string, FeatureMechanics> = {
  alchemist: townBuilding(
    'The renewable expedition-provisioning node: preparation pressure comes from stock and restock, not bag limits.',
    [
      'Health potions — renewable healing stock.',
      'Antidotes and cures — preparation against afflictions.',
      'Resistance tonics — preparation for known damage and status pressure.',
      'Specialty consumables — expedition-specific supplies.',
    ],
    [
      item('Stock rule', 'The village prepares only a limited amount at once; using supplies makes a return to town strategically useful.', 'designed'),
      item('Upgrade direction', 'Upgrades are intended to improve potion quality, increase available quantities, and speed restocking; the source does not map those benefits to named tiers.', 'designed'),
      item('Material costs', 'Exact herbs, extracts, quantities, construction costs, and restock times are not specified.', 'unspecified'),
    ],
    ['Specs/village_system_v1.md §§2, 4.1'],
  ),
  mageTower: townBuilding(
    'Town appraisal and arcane-analysis center, with identification reinforcing the expedition-return loop.',
    [
      'Magical-item identification — reveal an unidentified item before full use.',
      'Arcane research — long-term magical analysis.',
      'Spell modification and insight — future spell support.',
      'Magical barriers and routes — world-access support.',
    ],
    [
      item('Current subsystem', 'Identification state and a test Inventory action are implemented; no visitable Mage Tower scene is verified.', 'implemented'),
      item('Use rule', 'Unidentified magical items remain safely carryable but are not fully usable before identification.', 'designed'),
      item('Example unlock', 'The design document gives “Philosopher’s Stone unlocks Mage Tower tier” as an example, not a committed upgrade matrix.', 'example'),
      item('Unlock requirements', 'Building cost, specialist requirement, research tree, and per-tier unlocks are not specified.', 'unspecified'),
    ],
    ['Specs/village_system_v1.md §§2, 4.2', 'Specs/game_design_v2.md', 'stories/done/US-033-unidentified-items-town-gating.md'],
  ),
  blacksmith: townBuilding(
    'Renewable equipment preparation and sidegrade support rather than a repeated recipe-crafting station.',
    [
      'Reinforcement — longer-term equipment improvement.',
      'Repair — renewable maintenance.',
      'Sharpening — temporary weapon preparation.',
      'Equipment preparation — expedition readiness.',
      'Sidegrade support and resistance sets — matchup-focused alternatives.',
    ],
    [
      item('Service boundary', 'The Blacksmith supports found equipment; the source does not promise routine gear crafting.', 'designed'),
      item('Unlock requirements', 'Costs, specialists, materials per service, bonuses, and per-tier unlocks are not specified.', 'unspecified'),
    ],
    ['Specs/village_system_v1.md §§2, 4.3'],
  ),
  clinic: townBuilding(
    'Recovery and survivability institution whose quality improves expedition readiness.',
    [
      'Recovery services — post-expedition support.',
      'Cleansing and blessings — status and preparation support.',
      'Survivability preparation — readiness before leaving town.',
      'Passive health and resilience — benefits tied to village quality.',
    ],
    [
      item('Benefit values', 'Exact healing, resilience, blessing, cleanse, and passive-growth values are not specified.', 'unspecified'),
      item('Unlock requirements', 'Costs, specialists, and per-tier service unlocks are not specified.', 'unspecified'),
    ],
    ['Specs/village_system_v1.md §§2, 4.4'],
  ),
  defenses: townBuilding(
    'Civic safety and visible long-term advancement through the Keep, Walls, and Defenses.',
    [
      'Village safety — protection for residents and services.',
      'Event resilience — support during settlement threats.',
      'Civic expansion — higher-tier growth support.',
      'Visible advancement — symbolic proof of village progress.',
    ],
    [
      item('Structure split', 'The source groups Keep, Walls, and Defenses together; separate building trees are not specified.', 'unspecified'),
      item('Unlock requirements', 'Costs, Siege Sigil use, defense values, and per-tier unlocks are not specified.', 'unspecified'),
    ],
    ['Specs/village_system_v1.md §§2, 4.5'],
  ),
  tiers: {
    summary:
      'Shared long-term framework for most major buildings; it is not evidence that every building already has four authored upgrades.',
    groups: [
      {
        title: 'Tier meanings',
        items: [
          item('Tier 1 · Functional', 'The first named tier; exact universal benefit is not specified.', 'designed'),
          item('Tier 2 · Improved', 'The second named tier; exact universal benefit is not specified.', 'designed'),
          item('Tier 3 · Advanced', 'The third named tier; exact universal benefit is not specified.', 'designed'),
          item('Tier 4 · Masterwork', 'The intended top tier; exact universal benefit is not specified.', 'designed'),
        ],
      },
      {
        title: 'Coverage limit',
        items: [
          item('Launch scope', 'The design explicitly says not every building must launch with every tier fully implemented.', 'designed'),
          item('Requirements', 'No cross-building cost table or prerequisite graph is authored.', 'unspecified'),
        ],
      },
    ],
    sources: ['Specs/village_system_v1.md §2'],
  },
}

function biome(
  summary: string,
  theme: string,
  environment: string[],
  enemies: string[],
  boss: string,
  bossMechanics: string[],
  unlock: MechanicItem,
): FeatureMechanics {
  return {
    summary,
    groups: [
      {
        title: 'Theme and discoveries',
        items: [
          item('Emotional theme', theme, 'designed'),
          ...environment.map((entry) => item('Environment', entry, 'designed')),
        ],
      },
      {
        title: 'Encounters and boss',
        items: [
          ...(enemies.length
            ? enemies.map((enemy) => item('Named enemy', enemy, 'designed'))
            : [
                item(
                  'Standard enemies',
                  'No standard enemy family is named for this biome.',
                  'unspecified',
                ),
              ]),
          item('Boss', boss, 'designed'),
          ...bossMechanics.map((mechanic) =>
            item('Boss mechanic', mechanic, 'designed'),
          ),
        ],
      },
      {
        title: 'World unlock',
        items: [unlock],
      },
    ],
    sources: ['Specs/world_design_v1.md'],
  }
}

const world: Record<string, FeatureMechanics> = {
  verdant: biome(
    'Lush opening region whose repeated beauty hides unnatural decay.',
    'Denial — “Everything is fine.”',
    ['Lush and vibrant growth.', 'Subtle unnatural repetition.', 'Overgrown ruins and machines overtaken by nature.'],
    [],
    'Thorn Guardian',
    ['Regenerates.', 'Creates barriers.', 'Uses overgrowth to trap the player.'],
    item('Explosives', 'Earned here to break barriers and reveal hidden decay; exact quest, requirement, and explosive limits are unspecified.', 'designed'),
  ),
  searing: biome(
    'Desert of sand, metal, buried cities, and exposed machinery built around rigid control.',
    'Control — removing chaos also removed life.',
    ['Desert of sand and metal.', 'Buried cities.', 'Exposed ancient machinery.'],
    ['Dust Automatons.', 'Sentinel Frames.'],
    'Iron Warden',
    ['Enforces strict patterns.', 'Punishes deviation.', 'Uses grid-based attacks.'],
    item('Magnetic Device', 'Earned here to control objects and manipulate the environment; exact acquisition and target rules are unspecified.', 'designed'),
  ),
  mire: biome(
    'Foggy submerged region where buried history and delayed danger express avoidance.',
    'Avoidance — “Bury it.”',
    ['Foggy swamp.', 'Rotting structures.', 'Submerged ruins.'],
    ['Bog Wraiths.', 'Rot Beasts.', 'Drowned Automatons.'],
    'Drowned King',
    ['Uses hidden attacks.', 'Phases in water.', 'Uses delayed damage patterns.'],
    item('Invisibility Potion', 'Earned here to avoid enemies and open stealth paths; duration, supply, and acquisition are unspecified.', 'designed'),
  ),
  crystal: biome(
    'Crystalline region of frozen scenes and time distortion built around preservation.',
    'Preservation — “Freeze this moment forever.”',
    ['Crystalline structures.', 'Frozen scenes.', 'Time distortion.'],
    ['Crystal Phantoms.', 'Echo Clones.'],
    'Crystal Seer',
    ['Repeats attacks.', 'Freezes zones.', 'Creates delayed echoes.'],
    item('Phase Talisman', 'Earned here to phase through barriers at the explicit cost of health; exact drain and acquisition are unspecified.', 'designed'),
  ),
  storm: biome(
    'Vertical floating-ruin region shaped by wind, altitude, and endless striving.',
    'Obsession — “Rise above everything.”',
    ['Floating ruins.', 'Strong winds.', 'Vertical traversal.'],
    ['Storm Constructs.', 'Aerial Wraiths.'],
    'Tempest Ascendant',
    ['Aerial combat.', 'Constant movement.', 'Anti-ground mechanics.'],
    item('Glider Cloak', 'Earned here to enable long-distance traversal; flight model, limits, and acquisition are unspecified.', 'designed'),
  ),
  withered: biome(
    'Preserved but lifeless final city confronting the result of refusing to let go.',
    'Acceptance / Final Truth — a static world is not a living one.',
    ['Preserved but lifeless city.', 'Citizens frozen in time.'],
    ['Undead Knights.', 'Royal Wraiths.'],
    'Lich King',
    ['Uses player abilities.', 'Controls time and space.', 'Resets fight states.'],
    item('Biome unlock', 'No new traversal tool is assigned to the Withered Kingdom in the source.', 'unspecified'),
  ),
  explosives: {
    summary: 'Verdant Wilds traversal reward for breaking barriers and exposing hidden decay.',
    groups: [{ title: 'Supported behavior', items: [item('World use', 'Break barriers and reveal hidden decay.', 'designed'), item('Missing details', 'Acquisition, charges, combat use, and eligible barrier rules are unspecified.', 'unspecified')] }],
    sources: ['Specs/world_design_v1.md — Verdant Wilds'],
  },
  magnetic: {
    summary: 'Searing Expanse device for controlling objects and manipulating ancient machinery.',
    groups: [{ title: 'Supported behavior', items: [item('World use', 'Control objects and manipulate the environment.', 'designed'), item('Missing details', 'Acquisition, valid targets, range, and puzzle rules are unspecified.', 'unspecified')] }],
    sources: ['Specs/world_design_v1.md — Searing Expanse'],
  },
  invisibility: {
    summary: 'Mire of Echoes unlock for bypassing enemies and opening stealth paths.',
    groups: [{ title: 'Supported behavior', items: [item('World use', 'Avoid enemies and enable stealth paths.', 'designed'), item('Missing details', 'Duration, renewable supply, detection rules, and acquisition are unspecified.', 'unspecified')] }],
    sources: ['Specs/world_design_v1.md — Mire of Echoes'],
  },
  phase: {
    summary: 'Crystal Caverns relic that crosses phase barriers by spending health.',
    groups: [{ title: 'Supported behavior', items: [item('World use', 'Phase through barriers.', 'designed'), item('Explicit cost', 'Using the talisman drains health.', 'designed'), item('Missing details', 'Drain amount, lethal-safety rule, duration, and acquisition are unspecified.', 'unspecified')] }],
    sources: ['Specs/world_design_v1.md — Crystal Caverns'],
  },
  glider: {
    summary: 'Storm Peaks cloak that enables long-distance traversal.',
    groups: [{ title: 'Supported behavior', items: [item('World use', 'Cross long distances and support vertical traversal.', 'designed'), item('Missing details', 'Glide physics, stamina, launch rules, and acquisition are unspecified.', 'unspecified')] }],
    sources: ['Specs/world_design_v1.md — Storm Peaks'],
  },
  shock: {
    summary: 'Ancient tool origin named in world lore but not assigned to the six-biome progression path.',
    groups: [{ title: 'Supported behavior', items: [item('Lore source', 'Named as a tool originating in the Automaton Age.', 'designed'), item('Gameplay gap', 'No acquisition biome, traversal behavior, requirement, or implementation plan is specified.', 'unspecified')] }],
    sources: ['Specs/world_design_v1.md — Automaton Age'],
  },
}

function boss(
  name: string,
  biomeName: string,
  mechanics: string[],
): FeatureMechanics {
  return {
    summary: `${name} is the designed boss for ${biomeName}; implementation parameters and phase scripts are not authored.`,
    groups: [
      {
        title: 'Documented encounter identity',
        items: mechanics.map((mechanic) =>
          item('Designed mechanic', mechanic, 'designed'),
        ),
      },
      {
        title: 'Implementation limits',
        items: [
          item(
            'Unspecified',
            'Health, damage, moveset timings, phases, arena layout, rewards, and implementation state are not specified.',
            'unspecified',
          ),
        ],
      },
    ],
    sources: ['Specs/world_design_v1.md'],
  }
}

const bosses = {
  thorn: boss('Thorn Guardian', 'Verdant Wilds', [
    'Regenerates.',
    'Creates barriers.',
    'Uses overgrowth to trap the player.',
  ]),
  iron: boss('Iron Warden', 'Searing Expanse', [
    'Enforces strict patterns.',
    'Punishes deviation.',
    'Uses grid-based attacks.',
  ]),
  drowned: boss('Drowned King', 'Mire of Echoes', [
    'Uses hidden attacks.',
    'Phases in water.',
    'Uses delayed damage patterns.',
  ]),
  crystal: boss('Crystal Seer', 'Crystal Caverns', [
    'Repeats attacks.',
    'Freezes zones.',
    'Creates delayed echoes.',
  ]),
  tempest: boss('Tempest Ascendant', 'Storm Peaks', [
    'Uses aerial combat.',
    'Requires constant movement.',
    'Uses anti-ground mechanics.',
  ]),
  lich: boss('Lich King', 'Withered Kingdom', [
    'Uses player abilities.',
    'Controls time and space.',
    'Resets fight states.',
  ]),
}

function aliases(
  mechanics: FeatureMechanics,
  ids: string[],
): Record<string, FeatureMechanics> {
  return Object.fromEntries(ids.map((id) => [id, mechanics]))
}

export const featureMechanicsById: Record<string, FeatureMechanics> = {
  ...aliases(weapons.longsword, [
    'combat-longsword',
    'gear-longsword',
    'skill-longswords',
  ]),
  ...aliases(weapons.greatsword, [
    'combat-greatsword',
    'gear-greatsword',
    'skill-greatswords',
  ]),
  ...aliases(weapons.shortsword, [
    'combat-shortsword',
    'gear-shortsword',
    'skill-shortswords',
  ]),
  ...aliases(weapons.dagger, [
    'combat-dagger',
    'gear-dagger',
    'skill-daggers',
  ]),
  ...aliases(weapons.axe, ['combat-axe', 'gear-axe', 'skill-axes']),
  ...aliases(weapons.mace, ['combat-mace', 'gear-mace', 'skill-maces']),
  ...aliases(weapons.spear, ['combat-spear', 'gear-spear', 'skill-spears']),
  ...aliases(weapons.quarterstaff, [
    'combat-quarterstaff',
    'gear-quarterstaff',
    'skill-quarterstaff',
  ]),
  ...aliases(weapons.unarmed, [
    'combat-unarmed',
    'gear-unarmed',
    'skill-unarmed',
  ]),
  ...aliases(weapons.longbow, [
    'combat-longbow',
    'gear-longbow',
    'skill-longbow',
  ]),
  ...aliases(weapons.shortbow, [
    'combat-shortbow',
    'gear-shortbow',
    'skill-shortbow',
  ]),
  ...aliases(weapons.crossbow, [
    'combat-crossbow',
    'gear-crossbow',
    'skill-crossbows',
  ]),
  ...aliases(weapons.dual, [
    'combat-two-weapon',
    'gear-two-weapon',
    'skill-two-weapon',
  ]),
  ...aliases(weapons.throwables, ['combat-throwables', 'gear-throwables']),
  ...aliases(weapons.wands, ['combat-wands', 'gear-wands']),

  ...aliases(spells.fireball, ['spell-fireball', 'skill-fireball']),
  ...aliases(spells.cone, ['spell-cone-of-cold', 'skill-cone-cold']),
  ...aliases(spells.missile, ['spell-magic-missile', 'skill-magic-missile']),
  ...aliases(spells.stone, ['spell-stone-skin', 'skill-stone-skin']),
  ...aliases(spells.blink, ['spell-blink', 'skill-blink']),
  ...aliases(spells.sleep, ['spell-sleep', 'skill-sleep']),
  ...aliases(spells.fireWard, ['spell-fire-ward', 'skill-fire-ward']),
  'spell-bless': spells.bless,
  'spell-restoration': spells.restoration,
  'spell-snare': spells.snare,
  'spell-enfeeble': spells.enfeeble,
  'spell-enchant-weapon': spells.enchant,
  ...aliases(spells.illusion, ['spell-illusion', 'skill-illusion']),
  'spell-blur': spells.blur,
  'skill-frost-ward': spells.frostWard,
  'skill-float': spells.float,
  'skill-counter-spell': spells.counter,

  'building-alchemist': town.alchemist,
  'building-mage-tower': town.mageTower,
  'item-mage-tower-identification': town.mageTower,
  'building-blacksmith': town.blacksmith,
  'building-clinic': town.clinic,
  'building-keep-walls': town.defenses,
  ...aliases(town.tiers, [
    'building-tier-functional',
    'building-tier-improved',
    'building-tier-advanced',
    'building-tier-masterwork',
  ]),

  'biome-verdant': world.verdant,
  'biome-searing': world.searing,
  'biome-mire': world.mire,
  'biome-crystal': world.crystal,
  'biome-storm': world.storm,
  'biome-withered': world.withered,
  'tool-explosives': world.explosives,
  'tool-magnetic': world.magnetic,
  'tool-invisibility': world.invisibility,
  'tool-phase-talisman': world.phase,
  'tool-glider': world.glider,
  'tool-shock-device': world.shock,

  'boss-thorn-guardian': bosses.thorn,
  'boss-iron-warden': bosses.iron,
  'boss-drowned-king': bosses.drowned,
  'boss-crystal-seer': bosses.crystal,
  'boss-tempest-ascendant': bosses.tempest,
  'boss-lich-king': bosses.lich,
}
