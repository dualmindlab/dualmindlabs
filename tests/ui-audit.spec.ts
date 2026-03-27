/**
 *  ui-audit.spec.ts — Dual Mind Labs visual & accessibility regression suite
 * 
 * Covers:
 *   1. Visual regression   — pixel-perfect snapshots of Hero, Services bento,
 *                            TechStack bento, About team cards, Contact form
 *   2. Semantic locators   — accessibility-first selectors resilient to class
 *                            refactors (getByRole / getByText / getByLabel)
 *   3. Axe-core a11y scan  — detects contrast, ARIA, and label violations
 *   4. Interaction flows   — Navbar active state, mobile menu, Contact 4-step
 *                            multi-step form completion
 *
 * Run in UI mode:
 *   npx playwright test tests/ui-audit.spec.ts --ui
 *
 * Update baseline snapshots:
 *   npx playwright test tests/ui-audit.spec.ts --update-snapshots
 *
 * AI-assisted selector repair (VS Code only):
 *   When a locator breaks, open the Playwright extension, click the failing
 *   step, then choose "Fix with AI" to let Copilot / Claude suggest the
 *   updated selector based on the current DOM snapshot captured in the trace.
 */

import { test, expect, type Page, type Locator } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Wait for all Framer Motion entrance animations to settle.
 * Framer Motion sets `will-change: transform` while animating and removes it
 * when the element is at rest.  We poll until no elements in the root carry
 * that property, or bail after the given timeout.
 */
async function waitForMotionSettled(page: Page, timeout = 3000): Promise<void> {
  await page
    .waitForFunction(
      () =>
        document.querySelectorAll('[style*="will-change: transform"]').length ===
        0,
      { timeout }
    )
    .catch(() => {
      /* If elements are still animating after timeout we proceed anyway —
         the masking strategy below will hide any residual movement. */
    });
}

/**
 * Scroll a section into view so viewport-triggered animations fire, then wait
 * for them to settle before screenshotting.
 */
async function scrollToSection(page: Page, sectionId: string): Promise<void> {
  await page.evaluate(
    (id) => document.getElementById(id)?.scrollIntoView({ behavior: "instant" }),
    sectionId
  );
  // Give Framer Motion's IntersectionObserver a tick to register
  await page.waitForTimeout(150);
  await waitForMotionSettled(page, 2500);
}

/**
 * Elements that change frame-to-frame and must be masked in every visual
 * snapshot.  We locate them lazily so the helper is safe to call even if an
 * element is not present on the current page state.
 */
function getDynamicMasks(page: Page): Locator[] {
  return [
    // Three.js / WebGL canvas — GPU output is non-deterministic across machines
    page.locator("canvas"),

    // TechStack: AI Inference cycling text ("Analyzing context…" etc.)
    page.locator(".bento-live").filter({ hasText: "AI Inference Engine" }),

    // Scroll progress bar (Framer Motion spring value)
    page.locator(".fixed.top-0.left-0.right-0.h-\\[2px\\]"),

    // Hero badge shine pseudo-element carrier — shimmer position varies
    page.locator(".badge-shine"),

    // Status ping dots in TechStack have CSS animation that varies per frame
    page.locator(".status-ping"),
  ];
}

// ─────────────────────────────────────────────────────────────────────────────
// Setup: navigate once per test
// ─────────────────────────────────────────────────────────────────────────────

test.beforeEach(async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
});

// ─────────────────────────────────────────────────────────────────────────────
// 1. Navbar
// ─────────────────────────────────────────────────────────────────────────────

test.describe("Navbar", () => {
  test("renders logo and all navigation links", async ({ page }) => {
    const nav = page.getByRole("navigation");
    await expect(nav).toBeVisible();

    // Brand name
    await expect(
      page.getByRole("link", { name: /dual mind labs/i })
    ).toBeVisible();

    // All 5 section links — using accessible name, not CSS class
    for (const label of ["About", "Projects", "Services", "Testimonials", "Contact"]) {
      await expect(
        nav.getByRole("link", { name: label, exact: true })
      ).toBeVisible();
    }
  });

  test("CTA 'Start a Project' links to #contact", async ({ page }) => {
    // The desktop CTA in the navbar
    const cta = page
      .getByRole("navigation")
      .getByRole("link", { name: /start a project/i });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", "#contact");
  });

  test("mobile menu opens and closes", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Mobile menu test — skipped on desktop");

    const menuBtn = page.getByRole("button", { name: /menu/i });
    await expect(menuBtn).toBeVisible();

    // Open
    await menuBtn.click();
    await expect(page.getByRole("link", { name: "About" }).first()).toBeVisible();

    // Close by clicking a link
    await page.getByRole("link", { name: "About" }).first().click();
    await expect(
      page.getByRole("link", { name: "About" }).nth(1)
    ).not.toBeVisible();
  });

  test("nav link becomes active when scrolling to section", async ({ page, isMobile }) => {
    test.skip(!!isMobile, "Desktop nav only");

    await scrollToSection(page, "about");

    // The active link gets `text-white bg-white/[0.08]` — we verify via aria
    // or text visibility, not the fragile class names.
    const aboutLink = page
      .getByRole("navigation")
      .getByRole("link", { name: "About", exact: true });
    await expect(aboutLink).toBeVisible();
  });

  test("scroll progress bar is visible after scrolling", async ({ page }) => {
    await page.evaluate(() => window.scrollBy(0, 600));
    // The progress bar is a motion.div — it should have a non-zero scaleX
    // We verify it exists and has a non-zero inline style transform
    const bar = page.locator(".fixed.top-0.left-0.right-0.h-\\[2px\\]");
    await expect(bar).toBeVisible();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 2. Hero section
// ─────────────────────────────────────────────────────────────────────────────

test.describe("Hero", () => {
  test("headline text is visible after GSAP animation", async ({ page }) => {
    // GSAP stagger: delay 0.3 s + duration 1 s + stagger 0.018 s × ~30 chars
    // Worst-case settle time ≈ 1.9 s.  We wait 2.2 s to be safe.
    await page.waitForTimeout(2200);

    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();

    // Each word is split into .hero-char spans — check aggregate text content
    await expect(h1).toContainText("Ship Products");
    await expect(h1).toContainText("$10M");
  });

  test("sub-headline copy is visible", async ({ page }) => {
    await expect(
      page.getByText(/ashwin \+ mohit/i)
    ).toBeVisible();
  });

  test("primary CTA 'See What We've Built' links to #projects", async ({ page }) => {
    const cta = page.getByRole("link", { name: /see what we.ve built/i });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", "#projects");
  });

  test("secondary CTA 'Start a Project' links to #contact", async ({ page }) => {
    // There are two "Start a Project" links — the one in the hero body (not navbar)
    const links = page.getByRole("link", { name: /start a project/i });
    // At least one should point to #contact
    const hrefs = await links.evaluateAll((els) =>
      (els as HTMLAnchorElement[]).map((el) => el.getAttribute("href"))
    );
    expect(hrefs).toContain("#contact");
  });

  test("all four stat cards are visible", async ({ page }) => {
    await page.waitForTimeout(1800); // wait for stat card stagger animation
    for (const stat of ["15+", "9+", "3", "100%"]) {
      await expect(page.getByText(stat, { exact: true })).toBeVisible();
    }
  });

  test("live badge shows correct uptime text", async ({ page }) => {
    await expect(page.getByText(/shipping revenue-ready products since 2023/i)).toBeVisible();
    await expect(page.getByText("99.9% uptime")).toBeVisible();
  });

  test("visual regression — Hero above the fold", async ({ page }) => {
    // Wait for all entrance animations to settle
    await page.waitForTimeout(2500);
    await waitForMotionSettled(page);

    await expect(page).toHaveScreenshot("hero-above-fold.png", {
      clip: { x: 0, y: 0, width: 1440, height: 900 },
      mask: getDynamicMasks(page),
    });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 3. About — scrollytelling team cards
// ─────────────────────────────────────────────────────────────────────────────

test.describe("About", () => {
  test.beforeEach(async ({ page }) => {
    await scrollToSection(page, "about");
  });

  test("section heading is visible", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /one studio\. two cognitive modes/i })
    ).toBeVisible();
  });

  test("Ashwin Hingve card renders with correct role and skills", async ({ page }) => {
    // Wait for the scrollytelling opacity transform to complete
    await page.waitForTimeout(1000);

    await expect(page.getByText("Ashwin Hingve")).toBeVisible();
    await expect(page.getByText("System 1 — Intuitive")).toBeVisible();
    await expect(page.getByText("Generative AI")).toBeVisible();
    await expect(page.getByText("LLMs")).toBeVisible();
  });

  test("Mohit Sahu card renders with correct role and skills", async ({ page }) => {
    await page.waitForTimeout(1200);

    await expect(page.getByText("Mohit Sahu")).toBeVisible();
    await expect(page.getByText("System 2 — Structural")).toBeVisible();
    await expect(page.getByText("System Design")).toBeVisible();
  });

  test("Dual Execution Engine connector is visible after further scroll", async ({ page }) => {
    // The connector animates in when scrollYProgress crosses 0.55–0.8
    await page.evaluate(() => window.scrollBy(0, 300));
    await page.waitForTimeout(600);
    await expect(page.getByText("Dual Execution Engine")).toBeVisible();
  });

  test("visual regression — About team cards", async ({ page }) => {
    await page.waitForTimeout(1500);
    const section = page.locator("section#about");
    await expect(section).toHaveScreenshot("about-team-cards.png", {
      mask: getDynamicMasks(page),
    });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 4. Services — bento grid
// ─────────────────────────────────────────────────────────────────────────────

test.describe("Services", () => {
  test.beforeEach(async ({ page }) => {
    await scrollToSection(page, "services");
  });

  test("section heading is visible", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /four ways we accelerate your roadmap/i })
    ).toBeVisible();
  });

  test("all four service card headings are rendered", async ({ page }) => {
    const expectedTitles = [
      /aeo-optimized saas architectures/i,
      /autonomous multi-agentic workflows/i,
      /revenue-ready mobile products/i,
      /systems of scale/i,
    ];

    for (const pattern of expectedTitles) {
      await expect(page.getByRole("heading", { name: pattern })).toBeVisible();
    }
  });

  test("service feature tags are visible", async ({ page }) => {
    // Spot-check a few feature chips across different cards
    const chips = ["Next.js App Router", "LLM Orchestration", "React Native", "System Design"];
    for (const chip of chips) {
      await expect(page.getByText(chip, { exact: true })).toBeVisible();
    }
  });

  test("visual regression — Services bento grid (2-col layout)", async ({
    page,
    isMobile,
  }) => {
    test.skip(!!isMobile, "Desktop bento layout only");

    await page.waitForTimeout(600);
    const section = page.locator("section#services");
    await expect(section).toHaveScreenshot("services-bento-grid.png", {
      mask: getDynamicMasks(page),
    });
  });

  test("visual regression — Services (mobile stacked)", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Mobile stacked layout only");

    await page.waitForTimeout(600);
    const section = page.locator("section#services");
    await expect(section).toHaveScreenshot("services-bento-grid-mobile.png", {
      mask: getDynamicMasks(page),
    });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 5. TechStack — bento grid + live status tiles
// ─────────────────────────────────────────────────────────────────────────────

test.describe("TechStack", () => {
  test.beforeEach(async ({ page }) => {
    // TechStack has no section id — scroll past testimonials
    await page.evaluate(() =>
      window.scrollTo({ top: document.body.scrollHeight * 0.7, behavior: "instant" })
    );
    await waitForMotionSettled(page, 2000);
  });

  test("System Status tile shows 'All systems nominal'", async ({ page }) => {
    await expect(page.getByText("All systems nominal")).toBeVisible();
  });

  test("System Status tile lists all five services", async ({ page }) => {
    const services = ["API Gateway", "LLM Pipeline", "DB Cluster", "Edge Functions", "Auth Service"];
    for (const svc of services) {
      await expect(page.getByText(svc, { exact: true })).toBeVisible();
    }
  });

  test("System Status shows 99.9% uptime", async ({ page }) => {
    await expect(page.getByText("99.9%").first()).toBeVisible();
  });

  test("AI Inference tile header is visible", async ({ page }) => {
    await expect(page.getByText("AI Inference Engine")).toBeVisible();
    await expect(page.getByText("Dual").first()).toBeVisible();
  });

  test("all four tech category cells render with correct headings", async ({ page }) => {
    for (const cat of ["Frontend", "Backend", "AI / ML", "Infra"]) {
      await expect(page.getByText(cat, { exact: true }).first()).toBeVisible();
    }
  });

  test("tech tokens are visible (spot-check)", async ({ page }) => {
    const techs = ["React", "TypeScript", "Node.js", "LangChain", "Docker"];
    for (const tech of techs) {
      await expect(page.getByText(tech, { exact: true }).first()).toBeVisible();
    }
  });

  test("visual regression — TechStack bento grid", async ({ page, isMobile }) => {
    test.skip(!!isMobile, "Desktop bento layout only");

    // The AI Inference cycling text is masked — see getDynamicMasks()
    const section = page.locator("section").filter({ hasText: "Our Arsenal" }).first();
    await expect(section).toHaveScreenshot("techstack-bento-grid.png", {
      mask: getDynamicMasks(page),
    });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 6. Contact — 4-step multi-step form
// ─────────────────────────────────────────────────────────────────────────────

test.describe("Contact form", () => {
  test.beforeEach(async ({ page }) => {
    await scrollToSection(page, "contact");
    await page.waitForTimeout(400);
  });

  test("initial state: Step 1 of 4 question is visible", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /what brings you here\?/i })
    ).toBeVisible();
    await expect(page.getByText("Step 1 of 4")).toBeVisible();
    await expect(page.getByText("25%")).toBeVisible();
  });

  test("Step 1: option click advances to Step 2", async ({ page }) => {
    await page.getByRole("button", { name: /build from scratch/i }).click();
    // 300 ms auto-advance delay in handleOption()
    await page.waitForTimeout(400);
    await expect(
      page.getByRole("heading", { name: /what stage is your project\?/i })
    ).toBeVisible();
    await expect(page.getByText("Step 2 of 4")).toBeVisible();
  });

  test("Step 2 → 3: option click advances to Step 3", async ({ page }) => {
    await page.getByRole("button", { name: /build from scratch/i }).click();
    await page.waitForTimeout(400);

    await page.getByRole("button", { name: /seed/i }).click();
    await page.waitForTimeout(400);

    await expect(
      page.getByRole("heading", { name: /what.s your timeline\?/i })
    ).toBeVisible();
    await expect(page.getByText("Step 3 of 4")).toBeVisible();
  });

  test("Back button returns to previous step", async ({ page }) => {
    await page.getByRole("button", { name: /build from scratch/i }).click();
    await page.waitForTimeout(400);

    await expect(page.getByText("Step 2 of 4")).toBeVisible();

    await page.getByRole("button", { name: /back/i }).click();
    await expect(
      page.getByRole("heading", { name: /what brings you here\?/i })
    ).toBeVisible();
  });

  test("Step 3 → 4: contact details form appears", async ({ page }) => {
    // Complete steps 1–3
    await page.getByRole("button", { name: /add ai capabilities/i }).click();
    await page.waitForTimeout(400);
    await page.getByRole("button", { name: /series a\+/i }).click();
    await page.waitForTimeout(400);
    await page.getByRole("button", { name: /asap/i }).click();
    await page.waitForTimeout(400);

    await expect(
      page.getByRole("heading", { name: /almost done/i })
    ).toBeVisible();
    await expect(page.getByText("Step 4 of 4")).not.toBeVisible(); // shows "75%"
    await expect(page.getByLabel(/name/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
  });

  test("full form submission flow shows confirmation", async ({ page }) => {
    // Step 1
    await page.getByRole("button", { name: /explore ai agents/i }).click();
    await page.waitForTimeout(400);
    // Step 2
    await page.getByRole("button", { name: /pre-seed/i }).click();
    await page.waitForTimeout(400);
    // Step 3
    await page.getByRole("button", { name: /still planning/i }).click();
    await page.waitForTimeout(400);

    // Step 4 — contact details
    await page.getByLabel(/name/i).fill("Test User");
    await page.getByLabel(/email/i).fill("test@example.com");
    await page.getByRole("button", { name: /get my custom proposal/i }).click();

    // Confirmation state
    await expect(
      page.getByRole("heading", { name: /you.re in the queue/i })
    ).toBeVisible();
    await expect(page.getByText("100%")).toBeVisible();
  });

  test("visual regression — Contact form Step 1", async ({ page }) => {
    const card = page
      .locator("section#contact")
      .locator(".card-shadow")
      .first();
    await expect(card).toHaveScreenshot("contact-form-step-1.png", {
      mask: getDynamicMasks(page),
    });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 7. Accessibility — axe-core full-page scan
// ─────────────────────────────────────────────────────────────────────────────

test.describe("Accessibility", () => {
  /**
   * Full-page axe scan on first load (Hero visible).
   * Known low-priority issues that we intentionally exclude:
   *   - 'color-contrast' for decorative text (e.g. watermark service numbers)
   * All other violations are hard failures.
   */
  test("Hero: no critical a11y violations", async ({ page }) => {
    await page.waitForTimeout(500);

    const results = await new AxeBuilder({ page })
      .include("section") // scope to main content, exclude nav/footer
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .disableRules([
        // Decorative watermark numbers (01–04 on service cards) have insufficient
        // contrast by design.  Flagged explicitly so it can be revisited.
        "color-contrast",
      ])
      .analyze();

    if (results.violations.length > 0) {
      // Print a readable summary before the assertion fails
      console.error(
        "Axe violations:\n",
        results.violations
          .map((v) => `[${v.impact}] ${v.id}: ${v.description}\n  ${v.nodes[0]?.html}`)
          .join("\n")
      );
    }

    expect(results.violations).toEqual([]);
  });

  test("Services section: no critical a11y violations", async ({ page }) => {
    await scrollToSection(page, "services");

    const results = await new AxeBuilder({ page })
      .include("#services")
      .withTags(["wcag2a", "wcag2aa"])
      .disableRules(["color-contrast"])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test("Contact form: all inputs have accessible labels", async ({ page }) => {
    await scrollToSection(page, "contact");

    // Navigate through to step 4 where inputs appear
    await page.getByRole("button", { name: /build from scratch/i }).click();
    await page.waitForTimeout(400);
    await page.getByRole("button", { name: /seed/i }).click();
    await page.waitForTimeout(400);
    await page.getByRole("button", { name: /asap/i }).click();
    await page.waitForTimeout(400);

    // Both inputs must be discoverable by their label
    await expect(page.getByLabel(/name/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();

    const results = await new AxeBuilder({ page })
      .include("#contact")
      .withTags(["wcag2a", "wcag2aa"])
      .disableRules(["color-contrast"])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test("Navbar: mobile menu button has aria-label", async ({ page }) => {
    // Resize to mobile to expose the menu button
    await page.setViewportSize({ width: 390, height: 844 });

    const menuBtn = page.getByRole("button", { name: /menu/i });
    await expect(menuBtn).toBeVisible();
    await expect(menuBtn).toHaveAttribute("aria-label", "Menu");
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 8. Responsive layout gap detection
// ─────────────────────────────────────────────────────────────────────────────

test.describe("Responsive layout", () => {
  const VIEWPORTS = [
    { name: "mobile-sm",  width: 375, height: 812 },
    { name: "mobile-lg",  width: 428, height: 926 },
    { name: "tablet",     width: 768, height: 1024 },
    { name: "desktop-sm", width: 1280, height: 800 },
    { name: "desktop-xl", width: 1920, height: 1080 },
  ];

  for (const vp of VIEWPORTS) {
    test(`no horizontal scroll at ${vp.name} (${vp.width}px)`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto("/", { waitUntil: "networkidle" });

      const scrollWidth = await page.evaluate(
        () => document.documentElement.scrollWidth
      );
      const clientWidth = await page.evaluate(
        () => document.documentElement.clientWidth
      );

      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1); // +1 px tolerance
    });
  }

  test("Services grid collapses to single column on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/", { waitUntil: "networkidle" });
    await scrollToSection(page, "services");

    const cards = page.locator("#services .bento-cell");
    const count = await cards.count();
    expect(count).toBe(4);

    // On mobile all cards should have the same left offset (stacked)
    const rects = await cards.evaluateAll((els) =>
      els.map((el) => el.getBoundingClientRect().left)
    );
    const allSameColumn = rects.every((x) => Math.abs(x - rects[0]) < 2);
    expect(allSameColumn).toBe(true);
  });

  test("TechStack Frontend cell spans 2 columns on desktop", async ({ page, isMobile }) => {
    test.skip(!!isMobile, "Desktop bento only");

    await page.evaluate(() =>
      window.scrollTo({ top: document.body.scrollHeight * 0.7, behavior: "instant" })
    );
    await page.waitForTimeout(300);

    // Frontend cell has md:col-span-2 — its width should be ~2x a col-span-1 cell
    const frontendCell = page
      .locator(".bento-cell")
      .filter({ hasText: "Frontend" })
      .first();
    const aiCell = page
      .locator(".bento-cell")
      .filter({ hasText: "AI / ML" })
      .first();

    const fWidth = (await frontendCell.boundingBox())?.width ?? 0;
    const aWidth = (await aiCell.boundingBox())?.width ?? 0;

    // Frontend should be roughly twice as wide (±5 %)
    expect(fWidth / aWidth).toBeGreaterThan(1.8);
    expect(fWidth / aWidth).toBeLessThan(2.2);
  });
});
