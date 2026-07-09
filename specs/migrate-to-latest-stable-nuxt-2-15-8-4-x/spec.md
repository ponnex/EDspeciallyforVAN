# Feature Specification: Migrate to Latest Stable Nuxt (2.15.8 → 4.x)

**Created**: 2026-07-09
**Status**: Approved (auto-accepted by planning pipeline)

## Overview

The wedding-invitation site (EDspeciallyforVan) can no longer be run or built because it is pinned to Nuxt 2.15.8 with build tooling (node-sass, webpack-4-era modules) that is incompatible with the developer's machine (Node v22.20.0). Migrate the project to the latest stable Nuxt (4.4.8 at time of writing) so the standard development workflow (`npm run dev`, `npm run build`, `npm run generate`) works again and the existing static deploy to Firebase Hosting keeps working — with zero visible change to the published site.

## User Stories

### Story 1 — Developer can run the app locally (Priority: P1)

As the developer, I clone/pull the repo on a machine running Node v22.20.0, run `npm install` followed by `npm run dev`, and get a working local dev server rendering the site exactly as it looks in production today.

**Why this priority**: This is the trigger for the whole request — the app currently cannot start at all, blocking any further work.

**Acceptance Criteria**:

1. **Given** a clean checkout on Node v22.20.0, **When** the developer runs `npm install`, **Then** installation completes without native-build failures (no node-sass gyp errors) and without requiring `--force`/`--legacy-peer-deps`.
2. **Given** dependencies are installed, **When** the developer runs `npm run dev`, **Then** the dev server starts without errors and the site renders at the local URL with all sections (home banner, about us, our story, events, entourage, reminders, header/nav) displaying as before.
3. **Given** the dev server is running, **When** the developer edits a component or SCSS file, **Then** the change hot-reloads without a crash.

### Story 2 — Static site can be generated and deployed to Firebase Hosting (Priority: P1)

As the developer, I run `npm run generate` (directly or via `npm run deploy`) and get a fully static output that Firebase Hosting serves identically to the current production site.

**Why this priority**: The site is live; the deploy pipeline (`generate` → `firebase deploy --only hosting`) must not break, or the production site cannot be updated.

**Acceptance Criteria**:

1. **Given** the migrated project, **When** the developer runs `npm run generate`, **Then** it completes successfully and produces a static output directory containing an `index.html` for the single-page site plus all assets (fonts, images, favicon, manifest).
2. **Given** a successful generate, **When** the output directory is served (e.g. `npx serve` or Firebase emulator/deploy), **Then** the full site renders and behaves identically to today: auto-playing full-screen banner carousel, countdown timer, smooth-scroll navigation, all content sections, mobile menu.
3. **Given** the generate output location, **When** `firebase deploy --only hosting` runs, **Then** the Firebase Hosting config points at the correct output directory (updated if the framework's output path changed) and the deployed site works.
4. **Given** the deploy config, **Then** no stale placeholder files (e.g. the leftover Firebase-init `index.html`) shadow or replace the generated app.

### Story 3 — Production build works (Priority: P2)

As the developer, I can run `npm run build` and get a successful production build with no errors, so CI or future server-mode use is not blocked.

**Why this priority**: Secondary to dev and generate — the site deploys via static generation — but `build` is a named requirement and part of the standard script set.

**Acceptance Criteria**:

1. **Given** the migrated project, **When** the developer runs `npm run build`, **Then** the build completes with exit code 0 and no errors.

### Story 4 — Site visitors see no change (Priority: P1)

As a site visitor (wedding guest), I open the site on desktop or mobile and see exactly the same design, content, animations, and behavior as before the migration.

**Why this priority**: The site is a finished, live product. The migration is infrastructure-only; any visual or behavioral regression is a defect.

**Acceptance Criteria**:

1. **Given** the migrated deployed site, **When** a visitor loads it, **Then** all seven sections render with unchanged layout, fonts (Lora, Great Vibes), colors, and Tailwind styling.
2. **Given** the home section, **When** the page loads, **Then** the banner carousel auto-plays through the banner images (~2.5 s interval, no arrows, no dots, images cover the viewport) as it does today.
3. **Given** the about-us section, **When** viewed before the wedding date, **Then** the countdown timer counts down correctly (days/hours/minutes/seconds).
4. **Given** a PWA-capable browser, **When** the site is loaded, **Then** the web-app manifest (name, theme color `#845F2D`, icon) is still served so the site remains installable.

### Edge Cases

- What happens when the framework's static output directory changes (e.g. `dist/` → `.output/public`)? → Firebase Hosting config and the `clean` script must be updated in lockstep so deploy never uploads an empty or stale directory.
- What happens to the banner-image loading, which currently discovers images at build time from a static folder? → The equivalent images must still all appear in the carousel after migration, in the same order.
- What happens to the add-to-homescreen prompt logic (custom install-prompt event bus)? → Its current observable behavior must be preserved (it is currently inert — no UI is shown — so "preserved" means: no new prompts appear and no console errors are introduced).
- What happens to Firebase client features? → No application code reads Firebase services today (no auth, no Firestore, no messaging calls); removal of the Firebase client module must not change any visitor-visible behavior. Firebase is retained only as the hosting/deploy target.
- What happens on browsers with existing cached service workers from the old PWA module? → The site must still load correctly (new/absent service worker must not leave visitors stuck on a stale cache).
- What happens to `npm run lint`? → It must still run and pass (or be updated to an equivalent working lint setup) so the script set stays healthy.

## Functional Requirements

- **FR-001**: The project MUST install cleanly (`npm install`) and run `npm run dev`, `npm run build`, and `npm run generate` successfully on Node v22.20.0.
- **FR-002**: The project MUST be on the latest stable major version of its web framework (Nuxt 4.x; 4.4.8 as of 2026-07-09).
- **FR-003**: `npm run generate` MUST produce a fully static, client-rendered site (the app is `ssr: false` today and must remain a purely static/SPA deployment).
- **FR-004**: The Firebase Hosting deploy flow (`npm run deploy` = generate + `firebase deploy --only hosting`) MUST publish the generated site, with `firebase.json` pointing at the correct output directory.
- **FR-005**: All existing UI sections, styling (Tailwind + SCSS + custom fonts), and interactive behavior (banner carousel, countdown, smooth-scroll nav, responsive header menu) MUST be preserved pixel-equivalent within reason (no intentional visual changes).
- **FR-006**: All components MUST be migrated off Vue-2-only authoring (class components / `nuxt-property-decorator`) to the framework's current conventional authoring style.
- **FR-007**: Vue-2-only and Nuxt-2-only dependencies (node-sass, @nuxtjs/axios, @nuxtjs/firebase, @nuxtjs/pwa, @nuxt/typescript-build, @nuxt/postcss8, nuxt-property-decorator, vue-slick-carousel, vue-agile, vue-template-compiler, vue-server-renderer) MUST be removed or replaced with maintained, compatible equivalents.
- **FR-008**: The site MUST remain installable as a PWA (valid manifest with existing name/colors/icon); a service worker is optional but the manifest is required.
- **FR-009**: Stale artifacts that conflict with the new framework layout (e.g. the Firebase-init placeholder `public/index.html`) MUST be removed so they cannot shadow the generated app.
- **FR-010**: TypeScript support MUST keep working: `nuxt.config`, models, and component `<script>` blocks stay typed, and type checking passes.
- **FR-011**: `npm run lint` MUST run successfully after the migration (lint tooling updated to versions compatible with the new stack).

## Out of Scope

- Any new features, content changes, copy edits, or visual redesign.
- SEO improvements, performance optimization beyond what the framework upgrade provides automatically.
- Migrating away from Firebase Hosting or changing the deploy provider.
- Adding server-side rendering (app stays `ssr: false` / static).
- Introducing a state-management library (the Vuex `store/` directory is empty — nothing to migrate).
- Adding Firebase runtime features (auth, Firestore, analytics, messaging) — none are used today.
- Replacing `moment` with another date library (it works under the new stack; leaving it is the minimal change).
- Test suites, CI pipelines, or tooling beyond what the migration mechanically requires.
- Upgrading Tailwind to v4 (v3 works with the new stack; upgrade is not required by the migration).

## Success Criteria

- **SC-001**: On Node v22.20.0, `npm install && npm run dev` starts a working dev server with zero errors (100% of the seven page sections render).
- **SC-002**: `npm run build` and `npm run generate` both exit 0.
- **SC-003**: The generated output served statically is functionally identical to the pre-migration production site (manual visual check of every section on desktop + mobile widths; carousel autoplays; countdown ticks).
- **SC-004**: `firebase deploy --only hosting` (or its dry-run equivalent) picks up the generated output directory — no placeholder page, no 404 on the root URL.
- **SC-005**: Zero remaining dependencies in `package.json` that are Vue-2/Nuxt-2-only or unmaintained-for-the-target-stack (checked against FR-007's list).
- **SC-006**: `npm run lint` exits 0.

## Clarifications

### Session 2026-07-09 (auto-resolved from repo context — non-interactive pipeline)

- Q: Which Nuxt version is "latest stable"? → A: 4.4.8 (`npm view nuxt dist-tags` → `latest: 4.4.8`); target Nuxt 4.x.
- Q: Must SSR be introduced? → A: No. App is `ssr: false`, `target: static` today; stays a static SPA on Firebase Hosting.
- Q: Is any Firebase runtime feature (auth/Firestore/messaging/analytics) in use? → A: No. `@nuxtjs/firebase` is configured (messaging only, `createServiceWorker: false`) but no code references `$fire` anywhere; the module can be dropped without behavior change. Firebase remains as hosting only.
- Q: Is the HTTP client (`@nuxtjs/axios`) in use? → A: Effectively no. The only usage is a plugin setting `baseURL` from `environment/defaults.json`, which contains no `baseUrl` key; no component makes HTTP requests. Drop axios entirely.
- Q: Is Vuex used? → A: No. `store/` contains only a README. No Pinia/useState migration needed.
- Q: Is `vue-agile` used? → A: No usage found anywhere; remove the dependency.
- Q: What replaces the banner carousel (`vue-slick-carousel`, Vue-2-only)? → A: A minimal Vue-3-compatible carousel preserving current behavior (autoplay 2500 ms, no arrows/dots, full-viewport images); exact library chosen in the plan.
- Q: Keep the PWA? → A: Keep manifest/installability (site is a live PWA with themed manifest); the custom A2HS prompt plumbing is currently inert (`window.landingLoaded` is never set) and must simply not error after migration.
- Q: Component authoring style? → A: `<script setup lang="ts">` (Composition API) — the conventional style for Nuxt 3/4.

## Checklist Overrides

- [CHK-A] "Pixel-equivalent" (FR-005) is verified by manual visual comparison, not automated screenshot diffing — accepted: no test infrastructure exists and adding it is out of scope.
- [CHK-B] PWA service-worker behavior parity is relaxed to "manifest preserved, no stale-cache lock-in" — accepted: the old module's workbox SW added no app-critical offline behavior.
