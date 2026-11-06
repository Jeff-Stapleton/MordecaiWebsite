# System feature inventory

The public system pages use two deliberately separate layers:

- `src/data/systemProgress.ts` contains the short category summaries and broad
  weekly overview. These remain visible while an accordion is closed.
- `src/data/systemFeatureInventory.ts` contains individually named features,
  plain-language descriptions, status evidence, and maintainer source
  references. Page totals count only these entries.
- `src/data/systemFeatureMechanics.ts` contains optional nested attack
  profiles, spell behavior and ranks, building/service detail, biome
  progression, and boss mechanics. These explain an existing feature and are
  never counted as additional features.

This prevents a broad item such as “Fourteen Rank 1 spells” and its fourteen
named spells from being counted twice.

## Nested mechanics rules

- Nested mechanics describe an existing feature; they do not change its
  progress status or any page total.
- Nested labels combine implementation state with evidence specificity:
  `Done · playtest evidence`, `Partial · implemented profile`, `Todo ·
  designed mechanic`, `Todo · design example`, `Unknown · not specified`, and
  `Broken · known issue`. An implemented profile proves code or content exists;
  it does not prove the complete player-facing feature works.
- Weapon profile numbers are shown only where implementation stories provide
  them, and are labeled as initial tuning placeholders.
- Skill ranks always render ranks 1–20 when a rank source exists. Ranks 5, 10,
  15, and 20 are labeled milestones. Ordinary implemented-spell ranks show the
  shared framework’s +5% power step while stating that no distinct technique is
  authored. Design-only spells and weapon ranks explicitly say when no bonus is
  specified.
- A source conflict is displayed rather than silently choosing the more
  flattering version.
- Features without useful supported depth do not receive an empty nested
  accordion.

## Status rules

The same five-state color mapping applies to named features and every nested
mechanic or rank row. Text labels remain visible, so color is never the only
status signal.

| State and left bar | Use it when |
| --- | --- |
| Done — green | The specific feature or nested fact passed the relevant packaged playtest or otherwise has direct completion evidence. |
| Todo / planned — blue | A current spec, roadmap, or story designs the feature or mechanic without implementation evidence. |
| Partially implemented — yellow | Code, assets, a profile, or story automation exists, but the complete player-facing feature is not playtest-verified. |
| Unknown — grey | Sources conflict or do not specify enough detail to support an implementation claim. “Not yet specified” belongs here, not in Todo. |
| Known broken — red | A current issue or packaged check identifies a player-facing failure. This takes precedence over partial or implemented evidence. |

Never promote a child because its parent system or epic is complete. Update the
individual entry and its evidence only after checking that feature.

## Weekly update

1. Review new ProjectMordecai specs, story changes, merged pull requests, open
   issues, and packaged playtest evidence.
2. Update the feature entry's `stage`, `evidence`, and `sources`.
3. Add newly supported named entries to the appropriate source-backed group.
   Do not fill gaps by inference.
4. Update `systemFeatureMechanics.ts` only when a source supports genuinely
   useful depth. Keep implementation facts separate from future rank design.
5. Update the broad category overview only when its public summary has changed.
6. Advance `progressStatusReviewedOn`.
7. Run `npm test`, `npm run lint`, and `npm run build`.

## Inventory coverage

The 6 November 2026 snapshot reviewed:

- `Specs/` design documents, including combat, attributes, skill sheet, item
  schema, village, world, map style, enemy archetypes, and launch statuses;
- `stories/PLAN.md` plus relevant done, in-progress, and backlog user stories;
- current ProjectMordecai issues and merged implementation evidence;
- the packaged playtest acceptance evidence recorded by recovery stories.

The inventory explicitly names:

- melee and designed ranged weapon families, fourteen launch spells, and
  sixteen launch statuses;
- all nine attributes and the 42 entries in the current skill sheet;
- current inventory test fixtures, supported item types, equipment families,
  rarity tiers, and six named upgrade keys;
- village materials, building/service families, jobs, and example events;
- all six biomes, named traversal tools, world-structure concepts, and endings;
- enemy roles and tiers, eleven named biome enemies, and six named bosses.

Nested coverage adds:

- attack profiles and rank tracks for all nine implemented melee families;
- design profiles and rank tracks for Longbow, Shortbow, Crossbow, and
  Two-Weapon Fighting, plus explicit profile gaps for Throwables and Wands;
- current behavior and rank coverage for all fourteen launch spells, including
  the exact arena profiles documented for Fireball, Blink, Stone Skin, and
  Restoration;
- milestone rank coverage for the three additional skill-sheet-only spells:
  Frost Ward, Float, and Counter Spell, each clearly labeled design-only;
- services, tier limits, and requirements gaps for Alchemist, Mage Tower,
  Blacksmith, Clinic, and Keep/Walls/Defenses;
- environment, enemies, boss mechanics, and traversal unlocks for all six
  biomes, plus the five assigned tools and uncertain Shock Device;
- nested mechanics for all six named bosses on the Enemies page.

## Honest gaps and exclusions

- `US-023` is filed under `stories/done`, but Snare, Enfeeble, and Enchant
  Weapon have unchecked acceptance criteria and tests. They remain uncertain.
- Fireball’s skill-sheet Rank 1 text describes channeled force projectiles,
  while the implementation story defines one fire projectile. Both are shown.
- Cone of Cold’s skill-sheet Rank 1 cell duplicates Stone Skin’s armor text.
  It is flagged as corrupt rather than presented as a cold-spell mechanic.
- Fire Ward’s proposal says “magic damage,” while its skill sheet and
  implementation use fire-only absorption. The conflict remains visible.
- Stone Skin’s implementation story treats its power as flat damage reduction,
  while the playable-arena story labels the arena value as shield HP. Both
  interpretations are surfaced.
- Bless has implemented behavior but no authored skill entry or rank table.
- The full-rank spell proposal covers eight spells. Fireball, Cone of Cold,
  Magic Missile, Stone Skin, and Sleep have milestone-only sheets; their
  ordinary ranks are explicitly unspecified.
- All authored weapon/spell values containing placeholders remain described as
  placeholders. No `{x} × rank` values are turned into invented numbers.
- The status framework exists, but each launch status lacks current packaged
  verification. They are not labeled as playtest-verified.
- The skill sheet still contains value placeholders. Its named entries are
  design coverage, not proof of playable techniques.
- `Specs/skill_sheet_v1.1.md` is treated as the current skill source.
  `Specs/skill_sheet_v1.md` contains older or alternate milestone names; those
  rows are excluded as version drift rather than merged into a fictitious
  combined progression.
- Pyromaniac is the only named feat and is explicitly a pipeline test sample.
  No production feat roster has been authored.
- Current inventory pickups are test fixtures, not a promised launch-loot
  roster. `Emberfang` is excluded because it is only a schema example.
- Hex, Venom, and Conjure are DLC-reserved proposal material and are excluded
  from the launch-spell inventory. Proposal-name drift such as Frost Nova and
  Healing Light does not replace the canonical Cone of Cold and Restoration.
- Shock Device is named in world history but has no assigned biome unlock, so
  its state is uncertain.
- Village buildings share four tier names, but the design provides no
  building-specific costs, prerequisites, or tier-by-tier unlock table.
- Verdant Wilds has a named boss but no named standard-enemy family. No roster
  is invented. Goblin Skirmisher, Skeletal Archer, and Corrupted Knight are
  schema examples and are excluded.
- Town event names are documented examples, not a claim that the complete
  mission roster is authored.

Source references are repository-relative unless they name a GitHub issue.
