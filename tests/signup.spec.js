// tests/signup.spec.js
import { test, expect } from '@playwright/test';

test.describe('Signup Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/signup'); // Adjust if your dev server is different
  });

  test('should show validation errors for empty fields', async ({ page }) => {
    await page.click('button[type="submit"]');

    await expect(page.locator('text=Name is required.')).toBeVisible();
    await expect(page.locator('text=Email is required.')).toBeVisible();
    await expect(page.locator('text=Phone number is required.')).toBeVisible();
    await expect(page.locator('text=Password is required.')).toBeVisible();
    await expect(page.locator('text=Please confirm your password.')).toBeVisible();
    await expect(page.locator('text=You must agree to the terms.')).toBeVisible();
  });

//   test('should show password strength error', async ({ page }) => {
//     await page.fill('input[name="name"]', 'Test User');
//     await page.fill('input[name="email"]', 'test@example.com');
//     await page.fill('input[name="phone"]', '1234567890');
//     await page.fill('input[name="password"]', 'weakpass');
//     await page.fill('input[name="confirmPassword"]', 'weakpass');
//     await page.check('input[name="acceptedTerms"]');
//     await page.click('button[type="submit"]');

//     await expect(page.locator('text=Must include uppercase, number, special character.')).toBeVisible();
//   });

  test('should show password mismatch error', async ({ page }) => {
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="phone"]', '1234567890');
    await page.fill('input[name="password"]', 'StrongPass1!');
    await page.fill('input[name="confirmPassword"]', 'DifferentPass1!');
    await page.check('input[name="acceptedTerms"]');
    await page.click('button[type="submit"]');

    await expect(page.locator('text=Passwords do not match.')).toBeVisible();
  });

  test('should register successfully with valid input', async ({ page }) => {
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', `testuser+${Date.now()}@example.com`);
    await page.fill('input[name="phone"]', '1234567890');
    await page.fill('input[name="password"]', 'StrongPass1!');
    await page.fill('input[name="confirmPassword"]', 'StrongPass1!');
    await page.check('input[name="acceptedTerms"]');
    await page.click('button[type="submit"]');

    await page.waitForURL('**/home');
    await expect(page).toHaveURL(/.*\/home/);
  });
});
