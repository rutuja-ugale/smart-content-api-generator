import { test, expect } from '@playwright/test';

test('verify UI rendering and prompt submission flow', async ({ page }) => {
  await page.goto('/');

  // Check header title exists
  await expect(page.locator('h1')).toContainText('Smart Content & API Generator Agent');

  // Input requirement prompt
  const input = page.locator('#prompt-input');
  await input.fill('Create a blog post card widget');

  // Click generate button
  const button = page.locator('#generate-btn');
  await button.click();

  // Verify result section renders output correctly
  const resultSection = page.locator('#result-section');
  await expect(resultSection).toBeVisible({ timeout: 10000 });
  await expect(resultSection).toContainText('/api/v1/create-a-blog-post-card-widget');
});
