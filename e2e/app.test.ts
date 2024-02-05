import { expect, test } from "@playwright/test";

test("should display initial search results on page load", async ({ page }) => {
	await page.goto("/");
	await page.waitForResponse("/api/cats");
	await expect(page.getByRole("listitem")).toHaveCount(20);
});

test("should allow filtering search results by kind", async ({ page }) => {
	await page.goto("/");
	await page.waitForResponse("/api/cats");
	await page.getByRole("combobox", { name: "Cat kind" }).selectOption("Himalayan");
	await page.getByRole("button", { name: "Search" }).click();
	await page.waitForResponse("/api/cats?kind=Himalayan");
	await expect(page.getByRole("listitem").first()).toContainText("(Himalayan)");
	await expect(page).toHaveURL('/?kind=Himalayan')
});

test("should display a loading spinner while fetching search results", async ({ page }) => {
	const spinner = page.locator('[role="status"] > svg');

	await page.goto("/");
	await expect(spinner).toBeVisible();
	await page.waitForResponse("/api/cats");
	await expect(spinner).not.toBeVisible();

	await page.getByRole("combobox", { name: "Cat kind" }).selectOption("Himalayan");
	await page.getByRole("button", { name: "Search" }).click();
	await expect(spinner).toBeVisible();
	await page.waitForResponse("/api/cats?kind=Himalayan");
	await expect(spinner).not.toBeVisible();
});

test("should display an error when fetching search results failed", async ({ page }) => {
	await page.route("/api/cats", (route) => {
		return route.fulfill({ status: 500 });
	});

	await page.goto("/");
	await page.waitForResponse("/api/cats");
	await expect(page.getByRole("main")).toContainText("Internal Server Error");
});

test("should set lang attribute on html element", async ({ page }) => {
	await page.goto("/");
	await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("should have a skiplink", async ({ page }) => {
	const link = page.getByRole("link", { name: "Skip to main content" });

	await page.goto("/");
	await page.keyboard.press("Tab");
	await expect(link).toBeFocused();

	await link.click();
	await expect(page.getByRole("main")).toBeFocused();
});

test("should have a favicon", async ({ request }) => {
	const response = await request.get("/favicon.ico");
	await expect(response.status()).toBe(200);
});

test("should have schema.org metadata", async ({ page }) => {
	await page.goto("/");
	const metadata = await page.locator('script[type="application/ld+json"]').evaluate((element) => {
		console.log(element)
		return element.innerHTML;
	});
	await expect(metadata).toMatchSnapshot();
});
