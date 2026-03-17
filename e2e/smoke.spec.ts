import { test, expect, type Page } from '@playwright/test'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function goHash(page: Page, tab: string) {
  await page.goto(`/#${tab}`)
  await page.waitForLoadState('networkidle')
}

async function expectNoConsoleErrors(page: Page, fn: () => Promise<void>) {
  const errors: string[] = []
  const handler = (msg: import('@playwright/test').ConsoleMessage) => {
    if (msg.type() === 'error') errors.push(msg.text())
  }
  page.on('console', handler)
  await fn()
  page.off('console', handler)
  expect(errors, 'Unexpected console errors').toEqual([])
}

// ---------------------------------------------------------------------------
// 1. App Shell — Load & Title
// ---------------------------------------------------------------------------

test.describe('App Shell', () => {
  test('loads with correct title', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Essential Goods/)
  })

  test('root element renders React app', async ({ page }) => {
    await page.goto('/')
    const root = page.locator('#root')
    await expect(root).toBeAttached()
    const children = root.locator('> *')
    await expect(children.first()).toBeVisible({ timeout: 10_000 })
  })

  test('Evident ecosystem nav is present', async ({ page }) => {
    await page.goto('/')
    await expect(
      page.locator('nav[aria-label="Evident ecosystem"]'),
    ).toBeAttached()
  })

  test('footer is present', async ({ page }) => {
    await page.goto('/')
    await expect(
      page.locator('footer[aria-label="Site footer"]'),
    ).toBeAttached()
  })

  test('starts in dark mode', async ({ page }) => {
    await page.goto('/')
    const html = page.locator('html')
    await expect(html).toHaveClass(/dark/)
  })
})

// ---------------------------------------------------------------------------
// 2. Tab Navigation — Every tab renders content
// ---------------------------------------------------------------------------

const PRIMARY_TABS = [
  'home',
  'explore',
  'compare',
  'analytics',
  'generations',
  'volatility',
  'learn',
  'methodology',
  'settings',
  'sources',
] as const

test.describe('Tab Routes — render without blank screen', () => {
  for (const tab of PRIMARY_TABS) {
    test(`#${tab} renders content`, async ({ page }) => {
      await goHash(page, tab)
      const root = page.locator('#root')
      await expect(root).toBeAttached()
      // Wait for meaningful content to appear
      await page.waitForFunction(
        () => (document.querySelector('#root')?.textContent?.length ?? 0) > 50,
        { timeout: 15_000 },
      )
    })
  }
})

// ---------------------------------------------------------------------------
// 3. Home View — Hero Section
// ---------------------------------------------------------------------------

test.describe('Home View', () => {
  test('renders app heading', async ({ page }) => {
    await goHash(page, 'home')
    await page.waitForFunction(
      () => (document.querySelector('#root')?.textContent?.length ?? 0) > 50,
      { timeout: 15_000 },
    )
  })

  test('displays product cards or categories', async ({ page }) => {
    await goHash(page, 'home')
    await page.waitForFunction(
      () => document.querySelectorAll('article, [class*="card"]').length > 0,
      { timeout: 15_000 },
    )
  })
})

// ---------------------------------------------------------------------------
// 4. Explore / Catalog View
// ---------------------------------------------------------------------------

test.describe('Explore', () => {
  test('catalog displays items', async ({ page }) => {
    await goHash(page, 'explore')
    const items = page.locator('article, [class*="card" i], table tbody tr, [role="listitem"]').first()
    await expect(items).toBeVisible({ timeout: 10_000 })
  })
})

// ---------------------------------------------------------------------------
// 5. Compare View — Selection Interface
// ---------------------------------------------------------------------------

test.describe('Compare', () => {
  test('compare view renders content', async ({ page }) => {
    await goHash(page, 'compare')
    await page.waitForFunction(
      () => (document.querySelector('#root')?.textContent?.length ?? 0) > 50,
      { timeout: 15_000 },
    )
  })
})

// ---------------------------------------------------------------------------
// 6. Analytics Dashboard
// ---------------------------------------------------------------------------

test.describe('Analytics', () => {
  test('analytics dashboard renders content', async ({ page }) => {
    await goHash(page, 'analytics')
    await page.waitForFunction(
      () => (document.querySelector('#root')?.textContent?.length ?? 0) > 50,
      { timeout: 15_000 },
    )
  })
})

// ---------------------------------------------------------------------------
// 7. Generational Dashboard
// ---------------------------------------------------------------------------

test.describe('Generations', () => {
  test('generational view renders content', async ({ page }) => {
    await goHash(page, 'generations')
    await page.waitForFunction(
      () => (document.querySelector('#root')?.textContent?.length ?? 0) > 50,
      { timeout: 15_000 },
    )
  })
})

// ---------------------------------------------------------------------------
// 8. Settings — Wage Configuration
// ---------------------------------------------------------------------------

test.describe('Settings', () => {
  test('settings view renders content', async ({ page }) => {
    await goHash(page, 'settings')
    await page.waitForFunction(
      () => (document.querySelector('#root')?.textContent?.length ?? 0) > 50,
      { timeout: 15_000 },
    )
  })
})

// ---------------------------------------------------------------------------
// 9. Methodology — Documentation Content
// ---------------------------------------------------------------------------

test.describe('Methodology', () => {
  test('methodology page renders explanatory text', async ({ page }) => {
    await goHash(page, 'methodology')
    const paragraphs = page.locator('p')
    const count = await paragraphs.count()
    expect(count).toBeGreaterThanOrEqual(1)
  })
})

// ---------------------------------------------------------------------------
// 10. Desktop Navigation Bar
// ---------------------------------------------------------------------------

test.describe('Desktop Navigation', () => {
  test('desktop nav has multiple items', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    const navItems = page.locator('nav button, nav a').filter({ hasNot: page.locator('[aria-label="Evident ecosystem"] *') })
    const count = await navItems.count()
    expect(count).toBeGreaterThanOrEqual(5)
  })
})

// ---------------------------------------------------------------------------
// 11. Mobile Navigation Drawer
// ---------------------------------------------------------------------------

test.describe('Mobile Navigation', () => {
  test.use({ viewport: { width: 375, height: 812 } })

  test('hamburger menu is visible on mobile', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    const hamburger = page.locator('button[aria-label*="menu" i], button[aria-label*="navigation" i], button[aria-label*="nav" i]').first()
    await expect(hamburger).toBeVisible({ timeout: 10_000 })
  })

  test('mobile nav drawer opens', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    const hamburger = page.locator('button[aria-label*="menu" i], button[aria-label*="navigation" i], button[aria-label*="nav" i]').first()
    if (await hamburger.isVisible({ timeout: 5_000 }).catch(() => false)) {
      await hamburger.click()
      // Drawer should reveal nav links
      await page.waitForFunction(
        () => document.querySelectorAll('nav a, nav button').length > 5,
        { timeout: 5_000 },
      )
    }
  })
})

// ---------------------------------------------------------------------------
// 12. Error-Free Boot
// ---------------------------------------------------------------------------

test.describe('Error-Free Boot', () => {
  test('app loads without console errors', async ({ page }) => {
    await expectNoConsoleErrors(page, async () => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      const root = page.locator('#root')
      await expect(root.locator('> *').first()).toBeVisible({ timeout: 10_000 })
    })
  })
})
