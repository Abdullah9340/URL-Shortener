import { test, expect } from "@playwright/test";

test("Visit the homepage and click on the nav menu", async ({ page }) => {
  // Open the QR Modal
  await page.goto("/");

  const navButton = await page.locator("#nav-menu-button");
  const qrOption = await page.locator("#QR-option");

  await navButton.click();
  await expect(qrOption).toBeVisible();

  await qrOption.click();

  // Test the QR Modal
  const qrImage = await page.locator("#QR-image");
  const qrLabel = await page.locator("#QR-input-label");
  const qrSubmit = await page.locator("#QR-submit-button");
  const snackbar = await page.locator("#QR-snackbar");
  // Empty and invalid URL fields
  await qrLabel.fill("");
  await expect(qrLabel).toHaveValue("");
  await qrLabel.fill("www.google.com");
  await expect(qrLabel).toHaveValue("www.google.com");
  await qrSubmit.click();
  await expect(snackbar).toBeVisible();

  // Valid URL field
  await qrLabel.fill("https://www.google.com");
  await expect(qrLabel).toHaveValue("https://www.google.com");
  await qrSubmit.click();
  await expect(qrImage).toBeVisible();
  await expect(snackbar).toBeHidden();
});
