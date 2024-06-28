import { test, expect } from "@playwright/test";

test("sign in wrongfully", async ({ page }) => {
  await page.goto("/sign-in", { waitUntil: "networkidle" });

  await page.getByLabel("Your email").fill("silvffsdsd@gmail.com");
  await page.getByRole("button", { name: "access dashboard" }).click();

  const toast = page.getByText("Invalid email");

  expect(toast).toBeVisible();
});

test("navigate to new page", async ({ page }) => {
  await page.goto("/sign-in", { waitUntil: "networkidle" });

  await page.getByRole("link", { name: "New account" }).click();

  expect(page.url()).toContain("/sign-up");
});
