// tests/login.spec.js
import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000'); // Your login page path
  });

  test('should show validation errors for empty fields', async ({ page }) => {
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Email is required.')).toBeVisible();
    await expect(page.locator('text=Password is required.')).toBeVisible();
  });

//   test('should show error for wrong email', async ({ page }) => {
//     await page.fill('input[name="email"]', 'euniceogunshol@gmail.com');
//     await page.fill('input[name="password"]', 'Heaven12$');
//     await page.click('button[type="submit"]');
//     await expect(page.locator('text=Login failed. Check credentials.')).toBeVisible();
//   });

//   test('should show error for wrong password', async ({ page }) => {
//     await page.fill('input[name="email"]', 'euniceogunshola@gmail.com'); // Update
//     await page.fill('input[name="password"]', 'Heaven12');
//     await page.click('button[type="submit"]');
//     await expect(page.locator('text=Login failed. Check credentials.')).toBeVisible();
//   });
test('should show error for wrong email', async ({ page }) => {
  await page.fill('input[name="email"]', 'wrongemail@example.com');
  await page.fill('input[name="password"]', 'Heaven12$');
  await page.click('button[type="submit"]');

  const emailError = page.locator('text=Login failed. Check credentials.').nth(0);
  await expect(emailError).toBeVisible();
});

test('should show error for wrong password', async ({ page }) => {
  await page.fill('input[name="email"]', 'euniceogunshola@gmail.com');
  await page.fill('input[name="password"]', 'WrongPassword123');
  await page.click('button[type="submit"]');

  const passwordError = page.locator('text=Login failed. Check credentials.').nth(1);
  await expect(passwordError).toBeVisible();
});


  test('should login successfully with valid credentials', async ({ page }) => {
    await page.fill('input[name="email"]', 'euniceogunshola@gmail.com'); // Update
    await page.fill('input[name="password"]', 'Heaven12$');
    await page.click('button[type="submit"]');

    await page.waitForURL('**/home');
    await expect(page).toHaveURL(/.*\/home/);
  });
});
