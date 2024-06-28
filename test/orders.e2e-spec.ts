import { expect, test } from "@playwright/test";

test("list orders", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });

  expect(
    page.getByRole("cell", { name: "Customer 1", exact: true }),
  ).toBeVisible();

  expect(
    page.getByRole("cell", { name: "Customer 1", exact: true }),
  ).toBeVisible();
});

test("test pagination", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });

  await page.getByRole("button", { name: "Next Page" }).click();

  expect(
    page.getByRole("cell", { name: "Customer 11", exact: true }),
  ).toBeVisible();

  expect(
    page.getByRole("cell", { name: "Customer 20", exact: true }),
  ).toBeVisible();

  await page.getByRole("button", { name: "last Page" }).click();

  expect(
    page.getByRole("cell", { name: "Customer 51", exact: true }),
  ).toBeVisible();

  expect(
    page.getByRole("cell", { name: "Customer 60", exact: true }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Before Page" }).click();

  expect(
    page.getByRole("cell", { name: "Customer 41", exact: true }),
  ).toBeVisible();

  expect(
    page.getByRole("cell", { name: "Customer 51", exact: true }),
  ).toBeVisible();

  await page.getByRole("button", { name: "First Page" }).click();

  expect(
    page.getByRole("cell", { name: "Customer 1", exact: true }),
  ).toBeVisible();

  expect(
    page.getByRole("cell", { name: "Customer 10", exact: true }),
  ).toBeVisible();
});
