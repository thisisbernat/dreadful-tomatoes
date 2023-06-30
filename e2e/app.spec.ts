import { test, expect } from '@playwright/test'

test.describe('Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/')
  })

  test('should render the header section', async ({ page }) => {
    await expect(page.getByTestId('main-logo')).toBeVisible()
    const searchInput = page.getByTestId('search-input')
    await expect(searchInput).toBeVisible()
    await expect(searchInput).toHaveValue('')
    await expect(searchInput).toHaveAttribute('placeholder', 'Title')
  })

  test('should render the main section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Popular Movies' })).toBeVisible()
    const movieCards = page.getByTestId('movie-card')
    await expect(movieCards).toHaveCount(10)
  })

  test('should render the footer section', async ({ page, context }) => {
    const footerLogo = page.getByTestId('footer-logo')
    await expect(footerLogo).toBeVisible()

    const appStoreButton = page.getByTestId('app-store-button')
    await expect(appStoreButton).toBeVisible()

    const applePagePromise = context.waitForEvent('page')
    await appStoreButton.click()
    const applePage = await applePagePromise
    await applePage.waitForLoadState()
    await expect(applePage).toHaveURL(/.*apple.com/)
    await applePage.close()

    const googlePlayButton = page.getByTestId('google-play-button')
    await expect(googlePlayButton).toBeVisible()

    const pagePromise = context.waitForEvent('page')
    await googlePlayButton.click()
    const googlePage = await pagePromise
    await googlePage.waitForLoadState()
    await expect(googlePage).toHaveURL(/.*play.google.com/)
    await googlePage.close()

    await expect(page.getByText('Copyright 2022 Dreadful Tomatoes. All rights reserved.')).toBeVisible()
  })
})

test.describe('Search', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/')
  })

  test('should search by title', async ({ page }) => {
    const searchInput = page.getByTestId('search-input')
    await searchInput.fill('wolf')
    await expect(searchInput).toHaveValue('wolf')

    await page.waitForResponse(
      response => response.url().includes('https://static.rviewer.io') && response.status() === 200
    )

    const movieCards = page.getByTestId('movie-card')
    await expect(movieCards).toHaveCount(1)
    const title = await movieCards.allInnerTexts()
    expect(title).toContain('The Wolf of Wall Street')
  })

  test('shoud warn me when no movies are found', async ({ page }) => {
    const searchInput = page.getByTestId('search-input')
    await searchInput.fill('ñ')
    await expect(searchInput).toHaveValue('ñ')

    await page.waitForResponse(
      response => response.url().includes('https://static.rviewer.io') && response.status() === 200
    )

    await expect(page.getByText('No movies found containing')).toBeVisible()
  })
})

test.describe('Pagination', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/')
  })

  test('should change page by clicking on the next button', async ({ page }) => {
    const firstPageMovieCards = page.getByTestId('movie-card')
    await expect(firstPageMovieCards).toHaveCount(10)
    const firstPageTitles = await firstPageMovieCards.allInnerTexts()

    const nextPageButton = page.getByTestId('pagination-next')
    await nextPageButton.click()

    await page.waitForResponse(
      response => response.url().includes('https://static.rviewer.io') && response.status() === 200
    )

    const nextPageMovieCards = page.getByTestId('movie-card')
    await expect(nextPageMovieCards).toHaveCount(10)
    const nextPageTitles = await nextPageMovieCards.allInnerTexts()

    expect(firstPageTitles).not.toEqual(nextPageTitles)
  })

  test('should give color the pagination buttons accordingly', async ({ page }) => {
    const firstPageBtn = page.getByRole('button', { name: '1' })
    await expect(firstPageBtn).toBeVisible()
    await expect(firstPageBtn).toHaveCSS('background-color', 'rgb(255, 0, 0)')

    const secondPageBtn = page.getByRole('button', { name: '2' })
    await expect(secondPageBtn).toBeVisible()
    await expect(secondPageBtn).toHaveCSS('background-color', 'rgba(255, 0, 0, 0.6)')

    const nextPageButton = page.getByTestId('pagination-next')
    await nextPageButton.click()

    await page.waitForResponse(
      response => response.url().includes('https://static.rviewer.io') && response.status() === 200
    )

    const newFirstPageBtn = page.getByRole('button', { name: '1' })
    await expect(newFirstPageBtn).toBeVisible()
    await expect(newFirstPageBtn).toHaveCSS('background-color', 'rgba(255, 0, 0, 0.6)')

    const newSecondPageBtn = page.getByRole('button', { name: '2' })
    await expect(newSecondPageBtn).toBeVisible()
    await expect(newSecondPageBtn).toHaveCSS('background-color', 'rgb(255, 0, 0)')
  })
})

test.describe('Movie details', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/')
  })

  test('should show details when hover over card', async ({ page }) => {
    const movieCards = page.getByTestId('movie-card')
    await movieCards.nth(0).hover()

    const years = page.getByTestId('movie-year')
    await expect(years.nth(0)).toBeVisible()
    await expect(years.nth(1)).not.toBeVisible()

    const descriptions = page.getByTestId('movie-description')
    await expect(descriptions.nth(0)).toBeVisible()
    await expect(descriptions.nth(1)).not.toBeVisible()

    await movieCards.nth(1).hover()

    const newYears = page.getByTestId('movie-year')
    await expect(newYears.nth(0)).not.toBeVisible()
    await expect(newYears.nth(1)).toBeVisible()

    const newDescriptions = page.getByTestId('movie-description')
    await expect(newDescriptions.nth(0)).not.toBeVisible()
    await expect(newDescriptions.nth(1)).toBeVisible()
  })
})
