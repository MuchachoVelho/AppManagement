import { test, expect } from "@playwright/test";

test("sign up successfully", async ({ page }) => {
  await page.goto("/sign-up", { waitUntil: "networkidle" });

  await page.getByLabel("App Name").fill("silva");

  await page.getByLabel("Manager Name").fill("muchacho");

  await page.getByLabel("Your email").fill("muchacho@gmail.com");

  await page.getByLabel("Your phone").fill("545452145");

  await page.getByRole("button", { name: "Finish registration" }).click();

  const toast = page.getByText("Registred with success");

  expect(toast).toBeVisible();
});

test("sign up wrongfully", async ({ page }) => {
  await page.goto("/sign-up", { waitUntil: "networkidle" });

  await page.getByLabel("App Name").fill("silva");

  await page.getByLabel("Manager Name").fill("muchachoa");

  await page.getByLabel("Your email").fill("muchacho@gmail.com");

  await page.getByLabel("Your phone").fill("545452145");

  await page.getByRole("button", { name: "Finish registration" }).click();

  const toast = page.getByText("Something went wrong");

  expect(toast).toBeVisible();
});

test("navigate to sign in page", async ({ page }) => {
  await page.goto("/sign-up", { waitUntil: "networkidle" });

  await page.getByRole("link", { name: "Sign In" }).click();

  expect(page.url()).toContain("/sign-in");
});
