import { expect, test } from "@playwright/test";

test("update profile successfuly", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await page.getByRole("button").nth(1).click();
  await page.getByRole("menuitem", { name: "Perfil store" }).click();

  await page.getByLabel("Name").fill("muchacho");
  await page.getByLabel("Description").fill("silvinha");

  await page.getByRole("button", { name: "Salvar" }).click();

  await page.waitForLoadState("networkidle");

  const toast = page.getByText("Profile updated with success");
  expect(toast).toBeVisible();

  await page.getByRole("button", { name: "Cancelar" }).click();

  expect(page.getByRole("button", { name: "muchacho" })).toBeVisible();
});
