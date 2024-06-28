import { expect, test } from "@playwright/test";

test("display day orders amount metric", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  expect(page.getByText("$20,005.00", { exact: true })).toBeVisible();
  expect(page.getByText("+15Em relacao ao mes passado")).toBeVisible();

  await page.waitForTimeout(2000);
});

test("display month cancelled orders amount metric", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  expect(page.getByText("200", { exact: true })).toBeVisible();
  expect(page.getByText("+8%Em relacao ao mes passado")).toBeVisible();
});

test("display month revenue amount metric", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  expect(page.getByText("20", { exact: true })).toBeVisible();
  expect(page.getByText("--5% Em relacao a ontem")).toBeVisible();
});
test("display cancels amount metric", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  expect(page.getByText("5", { exact: true })).toBeVisible();
  expect(page.getByText("-5%Em relacao ao mes passado")).toBeVisible();
});
