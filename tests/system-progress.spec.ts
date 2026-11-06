import { expect, test, type Locator } from '@playwright/test'
import { systemFeatureInventory } from '../src/data/systemFeatureInventory'

const categoryTitles = {
  combat: [
    'Attacks & weapons',
    'Defense & pressure',
    'Magic & status',
    'Fight loop & feedback',
  ],
  progression: ['Character growth', 'Skills & techniques', 'Earned feats'],
  items: [
    'Finding & carrying',
    'Reading & identifying',
    'Equipping & build identity',
    'Loot in the world',
  ],
  town: [
    'Resources & foundations',
    'Buildings & services',
    'People & priorities',
    'Back to the expedition',
  ],
  world: [
    'Exploration foundation',
    'Authored world structure',
    'Six-biome journey',
    'Traversal & return',
  ],
  enemies: [
    'Current arena enemy',
    'Readable encounter roles',
    'Threat & composition',
    'Biome rosters & bosses',
  ],
} as const

const stableFeatureTotals = {
  combat: 78,
  progression: 68,
  items: 69,
  town: 61,
  world: 67,
  enemies: 45,
} as const

async function expectSingleColumn(list: Locator) {
  const columns = await list.evaluate(
    (element) => getComputedStyle(element).gridTemplateColumns,
  )
  expect(columns.trim().split(/\s+/)).toHaveLength(1)

  const items = list.locator(':scope > li')
  const count = await items.count()
  expect(count).toBeGreaterThan(0)

  let previousBottom = Number.NEGATIVE_INFINITY
  let expectedX: number | undefined
  for (let index = 0; index < count; index += 1) {
    const box = await items.nth(index).boundingBox()
    expect(box).not.toBeNull()
    if (!box) continue

    expectedX ??= box.x
    expect(Math.abs(box.x - expectedX)).toBeLessThan(1)
    expect(box.y).toBeGreaterThanOrEqual(previousBottom - 1)
    previousBottom = box.y + box.height
  }
}

test('inventory covers every current category with maintainable evidence', () => {
  const allIds = new Set<string>()

  for (const [system, expectedCategories] of Object.entries(categoryTitles)) {
    const inventory =
      systemFeatureInventory[system as keyof typeof systemFeatureInventory]

    expect(Object.keys(inventory)).toEqual(expectedCategories)

    for (const category of Object.values(inventory)) {
      expect(category.length).toBeGreaterThan(0)

      for (const feature of category) {
        expect(feature.id).not.toBe('')
        expect(allIds.has(feature.id), `duplicate id: ${feature.id}`).toBe(false)
        allIds.add(feature.id)
        expect(feature.title).not.toBe('')
        expect(feature.description).not.toBe('')
        expect(feature.evidence).not.toBe('')
        expect(feature.sources.length).toBeGreaterThan(0)
        expect(feature.sources.every(Boolean)).toBe(true)

        if (feature.mechanics) {
          expect(feature.mechanics.summary).not.toBe('')
          expect(feature.mechanics.sources.length).toBeGreaterThan(0)
          expect(feature.mechanics.groups.length).toBeGreaterThan(0)

          for (const group of feature.mechanics.groups) {
            expect(group.title).not.toBe('')
            expect(group.items.length).toBeGreaterThan(0)
            for (const mechanic of group.items) {
              expect(mechanic.label).not.toBe('')
              expect(mechanic.description).not.toBe('')
            }
          }
        }
      }
    }
  }
})

test('requested weapon and spell examples are individually tracked', () => {
  const combatEntries = Object.values(systemFeatureInventory.combat).flat()
  const titles = combatEntries.map(({ title }) => title)

  for (const title of ['Greatsword', 'Dagger', 'Fireball', 'Blink']) {
    expect(titles).toContain(title)
  }
})

test('documented weapon and spell rosters have nested mechanics', () => {
  const ids = [
    'combat-longsword',
    'combat-greatsword',
    'combat-shortsword',
    'combat-dagger',
    'combat-axe',
    'combat-mace',
    'combat-spear',
    'combat-quarterstaff',
    'combat-unarmed',
    'combat-longbow',
    'combat-shortbow',
    'combat-crossbow',
    'combat-throwables',
    'combat-wands',
    'combat-two-weapon',
    'spell-fireball',
    'spell-cone-of-cold',
    'spell-magic-missile',
    'spell-stone-skin',
    'spell-blink',
    'spell-sleep',
    'spell-fire-ward',
    'spell-bless',
    'spell-restoration',
    'spell-snare',
    'spell-enfeeble',
    'spell-enchant-weapon',
    'spell-illusion',
    'spell-blur',
    'skill-frost-ward',
    'skill-float',
    'skill-counter-spell',
  ]
  const inventory = [
    ...Object.values(systemFeatureInventory.combat).flat(),
    ...Object.values(systemFeatureInventory.progression).flat(),
  ]

  for (const id of ids) {
    expect(
      inventory.find((feature) => feature.id === id)?.mechanics,
      `${id} is missing mechanics`,
    ).toBeDefined()
  }
})

test('Town and World examples have grounded nested mechanics', () => {
  const town = Object.values(systemFeatureInventory.town).flat()
  const world = Object.values(systemFeatureInventory.world).flat()

  for (const id of [
    'building-alchemist',
    'building-mage-tower',
    'building-blacksmith',
    'building-clinic',
    'building-keep-walls',
  ]) {
    expect(town.find((feature) => feature.id === id)?.mechanics).toBeDefined()
  }

  for (const id of [
    'biome-verdant',
    'biome-searing',
    'biome-mire',
    'biome-crystal',
    'biome-storm',
    'biome-withered',
  ]) {
    expect(world.find((feature) => feature.id === id)?.mechanics).toBeDefined()
  }
})

test('all six systems expose useful nested depth without changing totals', () => {
  for (const [system, categories] of Object.entries(systemFeatureInventory)) {
    const nestedCount = Object.values(categories)
      .flat()
      .filter((feature) => feature.mechanics).length
    expect(nestedCount, `${system} has no nested mechanics`).toBeGreaterThan(0)
  }
})

test('feature and mechanic lists stay single-column on every system page', async ({
  page,
}) => {
  for (const viewport of [
    { width: 1440, height: 1200 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport)

    for (const system of Object.keys(categoryTitles)) {
      await page.goto(`/${system}`)

      const category = page
        .locator('details.progress-category')
        .filter({ has: page.locator('details.feature-mechanics') })
        .first()
      await category.locator(':scope > summary').click()

      await expectSingleColumn(category.locator('.feature-list'))

      const mechanics = category.locator('details.feature-mechanics').first()
      await mechanics.locator(':scope > summary').click()
      await expectSingleColumn(mechanics.locator('.mechanic-list').first())
    }
  }
})

test('every ranked weapon and launch spell renders ranks 1 through 20', () => {
  const combat = Object.values(systemFeatureInventory.combat).flat()
  const rankedIds = [
    'combat-longsword',
    'combat-greatsword',
    'combat-shortsword',
    'combat-dagger',
    'combat-axe',
    'combat-mace',
    'combat-spear',
    'combat-quarterstaff',
    'combat-unarmed',
    'combat-longbow',
    'combat-shortbow',
    'combat-crossbow',
    'combat-two-weapon',
    'spell-fireball',
    'spell-cone-of-cold',
    'spell-magic-missile',
    'spell-stone-skin',
    'spell-blink',
    'spell-sleep',
    'spell-fire-ward',
    'spell-bless',
    'spell-restoration',
    'spell-snare',
    'spell-enfeeble',
    'spell-enchant-weapon',
    'spell-illusion',
    'spell-blur',
    'skill-frost-ward',
    'skill-float',
    'skill-counter-spell',
  ]
  const inventory = [
    ...combat,
    ...Object.values(systemFeatureInventory.progression).flat(),
  ]

  for (const id of rankedIds) {
    const feature = inventory.find((entry) => entry.id === id)
    const ranks = feature?.mechanics?.groups.find((group) =>
      group.title.includes('ranks 1–20'),
    )
    expect(ranks?.items, `${id} is missing a complete rank track`).toHaveLength(
      20,
    )
    expect(ranks?.items[0].label).toContain('Rank 1')
    expect(ranks?.items[19].label).toContain('Rank 20')
  }
})

for (const [system, expectedCategories] of Object.entries(categoryTitles)) {
  test(`${system} presents collapsed, counted category accordions`, async ({
    page,
  }) => {
    await page.goto(`/${system}`)

    const accordions = page.locator('details.progress-category')
    await expect(accordions).toHaveCount(expectedCategories.length)

    for (let index = 0; index < expectedCategories.length; index += 1) {
      const accordion = accordions.nth(index)
      const summary = accordion.locator('summary')

      await expect(accordion).not.toHaveAttribute('open', '')
      await expect(summary.getByRole('heading', { level: 3 })).toHaveText(
        expectedCategories[index],
      )
      await expect(summary.locator('.progress-category__description')).toBeVisible()
      await expect(summary.locator('.overview-feature').first()).toBeVisible()
      await expect(accordion.locator('.feature-item').first()).not.toBeVisible()
    }

    const displayedTotal = Number(
      await page.locator('.progress-totals dd').first().textContent(),
    )
    const expectedTotal = Object.values(
      systemFeatureInventory[system as keyof typeof systemFeatureInventory],
    ).flat().length
    expect(displayedTotal).toBe(expectedTotal)
    expect(displayedTotal).toBe(
      stableFeatureTotals[system as keyof typeof stableFeatureTotals],
    )
  })
}

test('accordion supports pointer, Enter, and Space interactions', async ({
  page,
}) => {
  await page.goto('/combat')

  const accordion = page.locator('details.progress-category').first()
  const summary = accordion.locator(':scope > summary')

  await summary.click()
  await expect(accordion).toHaveAttribute('open', '')
  await expect(accordion.locator('.feature-item').first()).toBeVisible()
  await expect(summary.locator('.when-open')).toBeVisible()

  await summary.focus()
  await expect(summary).toBeFocused()
  await summary.press('Enter')
  await expect(accordion).not.toHaveAttribute('open', '')

  await summary.press('Space')
  await expect(accordion).toHaveAttribute('open', '')
})

test('weapons and spells expose individual statuses and evidence', async ({
  page,
}) => {
  await page.goto('/combat')

  const weapons = page
    .locator('details.progress-category')
    .filter({ hasText: 'Attacks & weapons' })
  const spells = page
    .locator('details.progress-category')
    .filter({ hasText: 'Magic & status' })

  await weapons.locator(':scope > summary').click()
  await spells.locator(':scope > summary').click()

  for (const name of ['Greatsword', 'Dagger', 'Fireball', 'Blink']) {
    const item = page.locator('.feature-item').filter({
      has: page.getByRole('heading', { name, exact: true }),
    })
    await expect(item).toBeVisible()
    await expect(item.locator('.feature-item__label')).not.toBeEmpty()
    await expect(item.locator('.feature-item__evidence')).toContainText(
      'Why this status:',
    )
  }
})

test('five-state bars stay consistent in both themes and broken evidence wins', async ({
  page,
}) => {
  const themeColors = {
    diorama: {
      done: 'rgb(76, 203, 110)',
      todo: 'rgb(107, 184, 255)',
      partial: 'rgb(255, 194, 61)',
      unknown: 'rgb(138, 148, 144)',
      broken: 'rgb(255, 90, 60)',
    },
    'high-contrast': {
      done: 'rgb(124, 255, 170)',
      todo: 'rgb(156, 207, 255)',
      partial: 'rgb(255, 212, 92)',
      unknown: 'rgb(184, 191, 188)',
      broken: 'rgb(255, 138, 112)',
    },
  } as const

  const assertBars = async (
    locator: Locator,
    expected: (typeof themeColors)[keyof typeof themeColors],
  ) => {
    const bars = await locator.evaluateAll((elements) =>
      elements.map((element) => ({
        state: element.getAttribute('data-progress-state'),
        color: getComputedStyle(element).borderLeftColor,
      })),
    )
    expect(bars.length).toBeGreaterThan(0)

    for (const bar of bars) {
      expect(bar.state).not.toBeNull()
      expect(bar.color).toBe(expected[bar.state as keyof typeof expected])
    }
  }

  for (const [theme, expected] of Object.entries(themeColors)) {
    await page.goto('/combat')
    if (theme === 'high-contrast') {
      await page.getByRole('button', { name: 'High contrast' }).click()
    }

    const key = page.locator('.progress-key')
    for (const [state, color] of Object.entries(expected)) {
      const swatch = key.locator(`[data-progress-state="${state}"]`)
      await expect(swatch).toHaveCount(1)
      await expect(swatch).toHaveCSS('background-color', color)
    }
    await expect(key).toContainText('Done')
    await expect(key).toContainText('Todo')
    await expect(key).toContainText('Partial')
    await expect(key).toContainText('Unknown')
    await expect(key).toContainText('Broken')
    if (theme === 'high-contrast') {
      await expect(key.locator('li').first()).toHaveCSS('color', 'rgb(0, 0, 0)')
    }

    for (const system of Object.keys(categoryTitles)) {
      await page.goto(`/${system}`)
      await assertBars(page.locator('.feature-item'), expected)
      await assertBars(page.locator('.mechanic-item'), expected)
      if (theme === 'high-contrast') {
        await expect(page.locator('.feature-item h4').first()).toHaveCSS(
          'color',
          'rgb(0, 0, 0)',
        )
      }
    }
  }

  await page.goto('/combat')
  const magic = page
    .locator('details.progress-category')
    .filter({ hasText: 'Magic & status' })
  await magic.locator(':scope > summary').click()

  const fireball = magic.locator('.feature-item').filter({
    has: page.getByRole('heading', { name: 'Fireball', exact: true }),
  })
  await expect(fireball).toHaveAttribute('data-progress-state', 'broken')
  await fireball.locator('summary').click()
  await expect(
    fireball.locator('.mechanic-item').filter({ hasText: 'Current recovery gap' }),
  ).toHaveAttribute('data-progress-state', 'broken')
  await expect(
    fireball
      .locator('.mechanic-item')
      .filter({ hasText: 'Implemented Rank 1 profile' }),
  ).toHaveAttribute('data-progress-state', 'partial')
  await expect(
    fireball.locator('.mechanic-item').filter({ hasText: 'Design conflict' }),
  ).toHaveAttribute('data-progress-state', 'unknown')
  await expect(
    fireball
      .locator('.mechanic-item')
      .filter({ has: page.getByText('Rank 5 · Milestone', { exact: true }) }),
  ).toHaveAttribute('data-progress-state', 'todo')

  const restoration = magic.locator('.feature-item').filter({
    has: page.getByRole('heading', { name: 'Restoration', exact: true }),
  })
  await restoration.locator('summary').click()
  await expect(
    restoration.locator('.mechanic-item').filter({ hasText: 'Packaged evidence' }),
  ).toHaveAttribute('data-progress-state', 'done')
})

test('open accordions remain usable in high contrast and on mobile', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/world')

  const first = page.locator('details.progress-category').first()
  await first.locator('summary').click()
  await page.getByRole('button', { name: 'High contrast' }).click()

  await expect(first).toHaveAttribute('open', '')
  await expect(first.locator('.feature-item').first()).toBeVisible()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'high-contrast')
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
    390,
  )
})

test('Dagger mechanics expand independently with pointer, Enter, and Space', async ({
  page,
}) => {
  await page.goto('/combat')

  const parent = page.locator('details.progress-category').first()
  await parent.locator(':scope > summary').click()

  const dagger = parent.locator('.feature-item').filter({
    has: page.getByRole('heading', { name: 'Dagger', exact: true }),
  })
  const nested = dagger.locator('details.feature-mechanics')
  const summary = nested.locator('summary')

  await summary.click()
  await expect(parent).toHaveAttribute('open', '')
  await expect(nested).toHaveAttribute('open', '')
  await expect(dagger.getByText('Light 5 · finisher')).toBeVisible()

  await summary.focus()
  await summary.press('Enter')
  await expect(nested).not.toHaveAttribute('open', '')
  await expect(parent).toHaveAttribute('open', '')

  await summary.press('Space')
  await expect(nested).toHaveAttribute('open', '')
  await expect(parent).toHaveAttribute('open', '')
})

test('Fireball exposes implementation, conflict, and honest rank coverage', async ({
  page,
}) => {
  await page.goto('/combat')

  const parent = page
    .locator('details.progress-category')
    .filter({ hasText: 'Magic & status' })
  await parent.locator(':scope > summary').click()

  const fireball = parent.locator('.feature-item').filter({
    has: page.getByRole('heading', { name: 'Fireball', exact: true }),
  })
  await fireball.locator('summary').click()

  await expect(fireball.getByText('Implemented Rank 1 profile')).toBeVisible()
  await expect(fireball.getByText('Design conflict')).toBeVisible()

  const ranks = fireball.locator('.mechanic-group').filter({
    has: page.getByRole('heading', { name: 'Skill ranks 1–20' }),
  })
  await expect(ranks.locator('.mechanic-item')).toHaveCount(20)
  await expect(ranks.getByText('Rank 5 · Milestone')).toBeVisible()
  await expect(
    ranks
      .locator('.mechanic-item')
      .filter({ has: page.getByText('Rank 2', { exact: true }) })
  ).toContainText('ordinary +5% power step')
})

test('Town building and World biome nested examples are useful and source-backed', async ({
  page,
}) => {
  await page.goto('/town')
  const townParent = page
    .locator('details.progress-category')
    .filter({ hasText: 'Buildings & services' })
  await townParent.locator(':scope > summary').click()
  const alchemist = townParent.locator('.feature-item').filter({
    has: page.getByRole('heading', { name: 'Alchemist', exact: true }),
  })
  await alchemist.locator('summary').click()
  await expect(alchemist.getByText('Four-tier framework')).toBeVisible()
  await expect(alchemist.getByText('Tier 4 · Masterwork')).toBeVisible()
  await expect(townParent).toHaveAttribute('open', '')

  await page.goto('/world')
  const worldParent = page
    .locator('details.progress-category')
    .filter({ hasText: 'Six-biome journey' })
  await worldParent.locator(':scope > summary').click()
  const verdant = worldParent.locator('.feature-item').filter({
    has: page.getByRole('heading', { name: 'Verdant Wilds', exact: true }),
  })
  await verdant.locator('summary').click()
  await expect(verdant.getByText('Thorn Guardian')).toBeVisible()
  await expect(verdant.getByText('No standard enemy family')).toBeVisible()
  await expect(worldParent).toHaveAttribute('open', '')
})

test('nested mechanics remain usable on mobile in high contrast', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/town')
  await page.getByRole('button', { name: 'High contrast' }).click()

  const parent = page
    .locator('details.progress-category')
    .filter({ hasText: 'Buildings & services' })
  await parent.locator(':scope > summary').click()
  const mageTower = parent.locator('.feature-item').filter({
    has: page.getByRole('heading', { name: 'Mage Tower', exact: true }),
  })
  await mageTower.locator('summary').click()

  await expect(mageTower.getByText('Supported services')).toBeVisible()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'high-contrast')
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(390)
})
