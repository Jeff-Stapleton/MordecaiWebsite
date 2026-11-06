# System feature inventory

The public system pages use two deliberately separate layers:

- `src/data/systemProgress.ts` contains the short category summaries and broad
  weekly overview. These remain visible while an accordion is closed.
- `src/data/systemFeatureInventory.ts` contains individually named features,
  plain-language descriptions, status evidence, and maintainer source
  references. Page totals count only these entries.

This prevents a broad item such as “Fourteen Rank 1 spells” and its fourteen
named spells from being counted twice.

## Status rules

| Status | Use it when |
| --- | --- |
| Verified in playtest | The current packaged build passed a real-input player-path check. |
| Implemented—not playtest verified | Code, assets, and/or story automation support the feature, but the current package has not been verified. |
| Implemented—recovery needed | The implementation exists, but a current issue or packaged check identifies a player-facing gap. |
| Designed / planned | A current spec, roadmap, or story names the feature without implementation evidence. |
| Source state uncertain | Sources conflict or do not support a reliable claim. |

Never promote a child because its parent system or epic is complete. Update the
individual entry and its evidence only after checking that feature.

## Weekly update

1. Review new ProjectMordecai specs, story changes, merged pull requests, open
   issues, and packaged playtest evidence.
2. Update the feature entry's `stage`, `evidence`, and `sources`.
3. Add newly supported named entries to the appropriate source-backed group.
   Do not fill gaps by inference.
4. Update the broad category overview only when its public summary has changed.
5. Advance `progressStatusReviewedOn`.
6. Run `npm test`, `npm run lint`, and `npm run build`.

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

## Honest gaps and exclusions

- `US-023` is filed under `stories/done`, but Snare, Enfeeble, and Enchant
  Weapon have unchecked acceptance criteria and tests. They remain uncertain.
- The status framework exists, but each launch status lacks current packaged
  verification. They are not labeled as playtest-verified.
- The skill sheet still contains value placeholders. Its named entries are
  design coverage, not proof of playable techniques.
- Pyromaniac is the only named feat and is explicitly a pipeline test sample.
  No production feat roster has been authored.
- Current inventory pickups are test fixtures, not a promised launch-loot
  roster. `Emberfang` is excluded because it is only a schema example.
- Hex, Venom, and Conjure are DLC-reserved proposal material and are excluded
  from the launch-spell inventory. Proposal-name drift such as Frost Nova and
  Healing Light does not replace the canonical Cone of Cold and Restoration.
- Shock Device is named in world history but has no assigned biome unlock, so
  its state is uncertain.
- Verdant Wilds has a named boss but no named standard-enemy family. No roster
  is invented. Goblin Skirmisher, Skeletal Archer, and Corrupted Knight are
  schema examples and are excluded.
- Town event names are documented examples, not a claim that the complete
  mission roster is authored.

Source references are repository-relative unless they name a GitHub issue.
