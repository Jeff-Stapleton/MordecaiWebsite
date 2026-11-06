import { expect, test } from '@playwright/test'
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
  })
}

test('accordion supports pointer, Enter, and Space interactions', async ({
  page,
}) => {
  await page.goto('/combat')

  const accordion = page.locator('details.progress-category').first()
  const summary = accordion.locator('summary')

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

  await weapons.locator('summary').click()
  await spells.locator('summary').click()

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
