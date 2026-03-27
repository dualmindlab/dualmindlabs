import { defineConfig, devices } from "@playwright/test";

/**
 * Dual Mind Labs — Playwright config
 *
 * Run all tests:        npx playwright test
 * UI mode (visual):     npx playwright test --ui
 * Headed debug:         npx playwright test --headed --debug
 * Update snapshots:     npx playwright test --update-snapshots
 * Single spec:          npx playwright test tests/ui-audit.spec.ts
 */
export default defineConfig({
  testDir: "./tests",

  /* Run each test file serially — the dev server is shared and SPA navigation
     is cheaper than spinning up multiple browser contexts hitting cold routes. */
  fullyParallel: false,
  forbidOnly: !!process.env.CI,

  /* One retry locally so trace/screenshot are captured on the first flake;
     two on CI where env variance is higher. */
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : 2,

  reporter: [
    ["html", { outputFolder: "playwright-report", open: "never" }],
    ["list"],
  ],

  /* ── Global browser context defaults ── */
  use: {
    baseURL: "http://localhost:3000",

    /* Capture a full trace ZIP on the first retry — includes DOM snapshots,
       network logs, and step-level screenshots for every failure. */
    trace: "on-first-retry",

    /* Screenshot only on failure to keep the report lean. */
    screenshot: "only-on-failure",

    /* Record a video on the first retry for hard-to-reproduce flakes. */
    video: "on-first-retry",

    /* Prefer accessibility-first interactions. */
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
  },

  /* ── Visual-regression defaults ── */
  expect: {
    toHaveScreenshot: {
      /* Allow up to 5 % of pixels to differ — covers anti-aliasing, sub-pixel
         font rendering, and minor WebGL particle variance without masking real
         layout regressions. */
      maxDiffPixelRatio: 0.05,

      /* Pause CSS animations so keyframe-driven glows and pulses don't cause
         every screenshot to differ. JS-driven animations (GSAP / Framer Motion)
         are handled per-test with explicit waits before the snapshot call. */
      animations: "disabled",

      /* Per-pixel tolerance for sub-pixel anti-aliasing differences. */
      threshold: 0.2,
    },
  },

  /* ── Browser projects ── */
  projects: [
    /* Primary: Desktop Chromium — baseline for all snapshot comparisons. */
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
    },

    /* Cross-browser: Safari rendering engine — catches flex/grid edge cases. */
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"], viewport: { width: 1440, height: 900 } },
    },

    /* Mobile: Pixel 5 viewport — validates responsive layout and mobile menu. */
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 5"] },
    },
  ],

  /* ── Dev server ── */
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",

    /* Reuse a running dev server locally so `npx playwright test` doesn't
       restart Next.js on every run.  Always cold-start on CI. */
    reuseExistingServer: !process.env.CI,

    /* Next.js 15 cold-start (with Turbopack) can take ~30 s on first compile. */
    timeout: 120_000,
  },

  /* Screenshot artifacts */
  snapshotPathTemplate:
    "{testDir}/__snapshots__/{testFilePath}/{projectName}/{arg}{ext}",
});
