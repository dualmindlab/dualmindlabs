import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const sections = ["About", "Work", "Experience", "Skills", "Contact"];

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  // Wait for hydration before filling controlled inputs or using animated controls.
  await expect(page.locator(".hero-ctas")).toHaveCSS("opacity", "1");
});

test("current portfolio sections and navigation work", async ({ page, isMobile }) => {
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Full-stack");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Applied AI");
  const nav = page.getByRole("navigation");
  const menu = nav.getByRole("button", { name: "Toggle menu" });
  if (isMobile) {
    await menu.click();
    await expect(menu).toHaveAttribute("aria-expanded", "true");
  }
  for (const label of sections) {
    const link = nav.getByRole("link", { name: label, exact: true });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("href", `#${label.toLowerCase()}`);
    await expect(page.locator(`#${label.toLowerCase()}`).getByRole("heading", { level: 2 })).toHaveCount(1);
  }
  await nav.getByRole("link", { name: "Work", exact: true }).click();
  await expect(page).toHaveURL(/#work$/);
  await expect(page.getByRole("heading", { name: "Featured case studies." })).toBeVisible();
  if (isMobile) await expect(menu).toHaveAttribute("aria-expanded", "false");
});

test("hero actions fit a typical laptop viewport", async ({ page, isMobile }) => {
  test.skip(isMobile, "Desktop layout acceptance check");
  for (const viewport of [{ width: 1366, height: 768 }, { width: 1440, height: 900 }]) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    const hero = page.locator("#hero");
    await expect(hero.locator(".hero-ctas")).toHaveCSS("opacity", "1");
    for (const locator of [hero.getByRole("heading", { level: 1 }), hero.getByRole("link", { name: /view projects/i }), hero.getByRole("link", { name: /résumé/i })]) {
      const bounds = await locator.boundingBox();
      expect(bounds).not.toBeNull();
      expect(bounds!.y).toBeGreaterThanOrEqual(0);
      expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(viewport.height);
    }
  }
});

test("Smart Shaadi technical details expand with the keyboard", async ({ page }) => {
  const article = page.locator("#work article").filter({ has: page.getByRole("heading", { name: "Smart Shaadi", exact: true }) });
  const details = article.locator("details");
  await expect(details).not.toHaveAttribute("open");
  await expect(article.getByText(/read-only tool calling/)).toBeVisible();
  await expect(article.getByText(/Pre-launch: company registration/)).toBeVisible();
  await details.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(details).toHaveAttribute("open", "");
  await expect(details.getByText(/768-dimensional/)).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(details).not.toHaveAttribute("open");
  await expect(article.getByRole("link", { name: /open full screenshot/i })).toHaveAttribute("href", "/media/smart-shaadi.jpg");
});

test("all project screenshots load and retain their status labels", async ({ page }) => {
  const work = page.locator("#work");
  await expect(work.locator("article")).toHaveCount(9);
  const projects = [
    ["Smart Shaadi", "smart-shaadi", "PRE-LAUNCH"],
    ["WebSCADA — SpaceAutoTech", "spaceautotech", "BACKEND OFFLINE"],
    ["PMStore", "pmstore", "LIVE"],
    ["TaptiFS", "taptifs", "LIVE"],
    ["Colonel's Pickle", "colonels-pickle", "LIVE"],
    ["Pulse Logic", "pulselogic", "CLIENT DEMO"],
    ["Marksman", "marksmanspro", "CLIENT DEMO"],
    ["Gulaabi Clean", "gulaabi-clean", "IN TESTING"],
    ["Deployment Corner", "deployment-corner", "LIVE"],
  ];
  for (const [name, file, status] of projects) {
    const article = work.locator("article").filter({ has: page.getByRole("heading", { name, exact: true }) });
    await article.scrollIntoViewIfNeeded();
    await expect(article.getByText(status, { exact: true })).toBeVisible();
    const image = article.getByRole("img");
    await expect.poll(() => image.evaluate((el: HTMLImageElement) => new URL(el.src).pathname)).toBe(`/media/${file}.jpg`);
    await expect.poll(() => image.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
  }
});

test("contact links and resume use the supplied destinations", async ({ page, request }) => {
  const contact = page.locator("#contact");
  await expect(contact.getByRole("link", { name: "LinkedIn", exact: true })).toHaveAttribute("href", "https://www.linkedin.com/in/ashwin-hingve-28576b238/");
  await expect(contact.getByRole("link", { name: "X (Twitter)", exact: true })).toHaveAttribute("href", "https://x.com/AshwinHingve");
  await expect(contact.getByRole("link", { name: "Email", exact: true })).toHaveAttribute("href", "mailto:ashwin.hingave123@gmail.com");
  await expect(page.locator("#hero").getByRole("link", { name: /résumé/i })).toHaveAttribute("href", "/Ashwin_Hingve_Resume.pdf");
  const resume = await request.get("/Ashwin_Hingve_Resume.pdf");
  expect(resume.ok()).toBe(true);
  expect((await resume.body()).subarray(0, 5).toString()).toBe("%PDF-");
});

test("contact form validates required inputs before opening an email draft", async ({ page }) => {
  const contact = page.locator("#contact");
  await contact.scrollIntoViewIfNeeded();
  await contact.getByRole("button", { name: /send message/i }).click();
  await expect(contact.getByLabel("Name", { exact: true })).toBeFocused();
  await contact.getByLabel("Name", { exact: true }).fill("Portfolio visitor");
  await contact.getByRole("textbox", { name: "Email", exact: true }).fill("invalid-email");
  await contact.getByLabel("Message", { exact: true }).fill("Project enquiry");
  expect(await contact.locator("form").evaluate((form: HTMLFormElement) => form.checkValidity())).toBe(false);
  await contact.getByRole("textbox", { name: "Email", exact: true }).fill("visitor@example.com");
  expect(await contact.locator("form").evaluate((form: HTMLFormElement) => form.checkValidity())).toBe(true);
  // Do not submit valid data: that opens the visitor's external email client.
});

test("sharing metadata and structured profile match the portfolio", async ({ page, request }) => {
  await expect(page).toHaveTitle("Ashwin Hingve · Full-Stack Engineer");
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", "https://dualmindlabs.com/media/og-image.jpg");
  await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute("content", "1200");
  await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute("content", "630");
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute("content", "https://dualmindlabs.com/media/og-image.jpg");
  await expect(page.locator('meta[name="twitter:creator"]')).toHaveAttribute("content", "@AshwinHingve");
  const schema = JSON.parse(await page.locator('script[type="application/ld+json"]').innerText());
  expect(schema.sameAs).toContain("https://x.com/AshwinHingve");
  expect(schema.sameAs).toContain("https://www.linkedin.com/in/ashwin-hingve-28576b238/");
  expect((await request.get("/media/og-image.jpg")).ok()).toBe(true);
});

test("responsive page has no horizontal overflow", async ({ page }) => {
  for (const id of ["hero", "work", "contact"]) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
});

test("portfolio passes WCAG A and AA accessibility checks", async ({ page }) => {
  test.setTimeout(60_000);
  await expect(page.locator(".hero-ctas")).toHaveCSS("opacity", "1");
  // Trigger each entrance once and wait for its final opacity before scanning.
  await page.evaluate(() => {
    document.querySelectorAll<HTMLElement>("main section:not(#hero) [style]").forEach((el) => {
      if (el.style.opacity === "0") el.dataset.auditEntrance = "true";
    });
  });
  for (const entrance of await page.locator('[data-audit-entrance="true"]').all()) {
    await entrance.scrollIntoViewIfNeeded();
    await expect(entrance).toHaveCSS("opacity", "1");
  }
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(results.violations.map(({ id, nodes }) => ({
    id, nodes: nodes.map(({ target, failureSummary }) => ({ target, failureSummary })),
  }))).toEqual([]);
});
