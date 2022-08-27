import { test, expect } from "@playwright/test";

test("Visit the homepage and click on the nav menu", async ({ page }) => {
  // Open the url Modal
  await page.goto("/");

  const navButton = await page.locator("#nav-menu-button");
  const urlOption = await page.locator("#URL-option");

  await navButton.click();
  await expect(urlOption).toBeVisible();

  await urlOption.click();

  // Test the url Modal
  const urlOutput = await page.locator("#URL-output");
  const urlLabel = await page.locator("#URL-input-label");
  const urlSubmit = await page.locator("#URL-submit-button");
  const snackbar = await page.locator("#URL-snackbar");
  // Empty and invalid URL fields
  await urlLabel.fill("");
  await expect(urlLabel).toHaveValue("");
  await urlLabel.fill("www.google.com");
  await expect(urlLabel).toHaveValue("www.google.com");
  await urlSubmit.click();
  await expect(snackbar).toBeVisible();

  // Valid URL field
  await urlLabel.fill("https://www.google.com");
  await expect(urlLabel).toHaveValue("https://www.google.com");
  await urlSubmit.click();
  await expect(urlOutput).toBeVisible();
  await expect(snackbar).toBeHidden();

  // localhost:3000/adajh
  const fullUrl = await urlOutput.textContent();
  const short = fullUrl?.split("3000/")[1];
  await page.goto(`/${short}`);
  await expect(page.url()).toContain("www.google.com");
});
