# Tasks: Migrate to Latest Stable Nuxt (2.15.8 → 4.4.8)

**Spec**: specs/spec.md
**Plan**: specs/plan.md
**Structure**: By layer (Option C auto-decision — single infrastructure migration; the four user stories share one deliverable)
**ClickUp IDs**: not included
**Story tags**: US1 = dev works, US2 = generate/deploy works, US3 = build works, US4 = visitors see no change

Dependency rule: phases run in order; within a phase, `[P]` tasks touch disjoint files and may run in parallel.

## Phase 1: Dependencies & Repo Hygiene

- [x] T001 Rewrite dependencies and scripts per plan "Dependencies" + "Config files" tables: deps `nuxt@^4.4.8, mitt@^3.0.1, moment@2.29.4, vue3-carousel@^0.17.0`; devDeps `@nuxt/eslint@^1.16.0, @vite-pwa/nuxt@^1.1.1, autoprefixer, eslint@^9, postcss, rimraf, sass@^1.101.0, tailwindcss@^3.2.4, typescript@^5, vue-tsc@^2`; remove all packages in the plan's "Removed" list; scripts → `dev: nuxt dev`, `build: nuxt build`, `start: nuxt preview`, `generate: nuxt generate`, `clean: rimraf .output dist`, `postinstall: nuxt prepare`, `typecheck: nuxt typecheck`, `lint:js: eslint .`, `lintfix: eslint . --fix`, keep `deploy` — package.json
- [x] T002 [P] Ensure `.output`, `.nuxt`, `.data`, `dist` are ignored — .gitignore
- [x] T003 Delete old lockfile and node_modules, run `npm install` on Node v22.20.0; must complete with no native-build errors and no `--force`/`--legacy-peer-deps` (SC-001 install half) — package-lock.json

## Phase 2: Directory Restructure (git mv, no content edits)

- [x] T004 Adopt Nuxt 4 `app/` srcDir: `git mv` `assets/ components/ layouts/ pages/ plugins/ events/ model/` into `app/` (plan D2) — app/
- [x] T005 Move static assets: `git mv static/images/banner app/assets/images/banner` (D11); `git mv` remaining `static/*` (favicon.ico, icon.png, ed.webp, van.webp, qrgift.webp, images/ourstory/, README.md excluded) into `public/`; delete Firebase-init placeholders `public/index.html` and `public/404.html` first (FR-009, D12) — public/
- [x] T006 Delete dead/legacy files: `app/plugins/axios.ts`, `app/plugins/vue-slick-carousel.ts`, `app/assets/styles/vue-slick-carousel.css`, `app/assets/styles/vue-slick-carousel-theme.css`, `types/vue-slick-carousel.d.ts` (remove `types/` if empty), `environment/defaults.json` + `environment/defaults.prod.json` (remove `environment/`), `store/` (plan D4–D6, D8) — app/plugins/

## Phase 3: Core Configuration

- [x] T007 Rewrite as `defineNuxtConfig`: `ssr: false`, `compatibilityDate: '2026-07-09'`, `app.head` (existing title/meta/favicon + `theme-color #845F2D` meta), `css: ['~/assets/styles/main.scss', 'vue3-carousel/dist/carousel.css']`, `modules: ['@vite-pwa/nuxt']`, `postcss: { plugins: { tailwindcss: {}, autoprefixer: {} } }`, `pwa` block per plan D7 (autoUpdate, cleanupOutdatedCaches, manifest name/short_name `EDspeciallyforVan`, description `Ed Ryan and Vanessa`, background `#FFFFFF`, theme `#845F2D`, icon `/icon.png` 512×512); drop `target`, `buildModules`, axios/firebase/old-pwa blocks, plugins array, `build.extend` webpack plugin — nuxt.config.ts
- [x] T008 [P] Replace contents with `{ "extends": "./.nuxt/tsconfig.json" }` (D15) — tsconfig.json
- [x] T009 [P] Create ESLint 9 flat config using `withNuxt()` re-export from `./.nuxt/eslint.config.mjs`; remove any `.eslintrc*` leftovers (D14) — eslint.config.mjs
- [x] T010 [P] Update `content` globs to `['./app/**/*.{js,ts,vue}', './nuxt.config.ts']` (D13) — tailwind.config.js
- [x] T011 [P] Point hosting at Nuxt 4 output: `"public": ".output/public"`, keep rewrites and predeploy (D16, FR-004) — firebase.json
- [x] T012 Run `npx nuxt prepare` and confirm it exits 0 (generates `.nuxt/tsconfig.json` + `.nuxt/eslint.config.mjs` consumed by T008/T009) — nuxt.config.ts

## Phase 4: Support Modules (Vue-3-safe plumbing)

- [x] T013 Replace `new Vue()` event bus with `mitt<{ 'pwa:showa2hs': void }>()`; keep the exported `PWABus` name (D9) — app/events/pwa.ts
- [x] T014 Rename from `pwa.client.js` and wrap the existing `beforeinstallprompt`/`showA2HS` logic in `defineNuxtPlugin`; switch `PWABus.$emit` → `PWABus.emit`; behavior otherwise verbatim (plan: flow is intentionally inert — must not error) — app/plugins/pwa.client.ts

## Phase 5: Component Rewrites (class components → `<script setup lang="ts">`)

- [x] T015 [P] Rewrite layout: drop class component and manual registration, replace `<Nuxt keep-alive />` with `<slot />` — app/layouts/default.vue
- [x] T016 [P] Rewrite header: template `require('@/assets/images/svg/*.svg')` ×3 → static ES imports; `@Watch('$route')` → `watch` on `useRoute()` fullPath/hash (drawer still closes on nav); drop vue-router v3 `Route` type; move `window.pageYOffset` init into client lifecycle; keep IntersectionObserver + scroll listener logic; `/deep/` ×5 → `:deep()` — app/components/header/header.vue
- [x] T017 [P] Rewrite home/banner: replace `<vue-slick-carousel>` with `Carousel`/`Slide` from `vue3-carousel` (`:autoplay="2500"`, `:wrap-around="true"`, `:items-to-show="1"`, `:pause-autoplay-on-hover="false"`, no arrows/dots per D8); replace `require.context` with `import.meta.glob('~/assets/images/banner/*.webp', { eager: true, import: 'default' })` with alphabetically sorted keys (D11); keep `.carousel-image` 100vh/100vw `object-fit: cover` styles; port `/deep/ .slick-list` override to the vue3-carousel track class via `:deep()` — app/components/sections/home/home.vue
- [x] T018 [P] Rewrite about-us: countdown state → `ref`s, interval into `onMounted`/`onBeforeUnmount`, keep moment logic and wedding-date behavior verbatim — app/components/sections/about-us/about-us.vue
- [x] T019 [P] Rewrite our-story (straight conversion, static content) — app/components/sections/our-story/our-story.vue
- [x] T020 [P] Rewrite events (straight conversion) — app/components/sections/events/events.vue
- [x] T021 [P] Rewrite entourage (straight conversion) — app/components/sections/entourage/entourage.vue
- [x] T022 [P] Rewrite reminders (straight conversion) — app/components/sections/reminders/reminders.vue
- [x] T023 Rewrite index page: `PWABus.$on` → `PWABus.on` (needs T013), `created()` logic → setup/`onMounted`, `previouslyShownA2HS` getter → `computed`, keep localStorage + moment expiry logic verbatim; section components resolve via auto-import — app/pages/index.vue

## Phase 6: Sweep, Quality Gates & Verification

- [x] T024 Legacy-pattern sweep (plan risk #5): grep app code for `require(`, `require.context`, `/deep/`, `\$on|\$emit`, `nuxt-property-decorator`, `@nuxtjs/`, `vue-slick-carousel`, `@Component` — zero hits allowed in app/, nuxt.config.ts — app/
- [x] T025 Run `npm run lint` and fix all findings (FR-011, SC-006) — eslint.config.mjs
- [x] T026 Run `npm run typecheck` (vue-tsc) and fix all errors (FR-010) — tsconfig.json
- [x] T027 [US1] Run `npm run dev`: server starts clean; verify all 7 sections render, banner autoplays ~2.5 s full-viewport, countdown ticks, every header nav anchor scrolls smoothly (apply plan's plain-`<a href="#…">` fallback if router hash scroll regresses), mobile drawer opens/closes, edit a component + an SCSS file to confirm HMR (SC-001) — nuxt.config.ts
- [x] T028 [US3] Run `npm run build` — must exit 0 (SC-002) — nuxt.config.ts
- [x] T029 [US2][US4] Run `npm run generate`; confirm `.output/public/index.html`, `/_nuxt/*` bundles, fonts, `/images/ourstory/*`, `/ed.webp`, `/van.webp`, `/qrgift.webp`, `/icon.png`, `/favicon.ico`, `manifest.webmanifest` + `sw.js` all present; serve `.output/public` statically (e.g. `npx serve`) and re-verify the full site + installable manifest (SC-002, SC-003, FR-008) — firebase.json
- [x] T030 [US2] Verify deploy wiring without publishing: confirm firebase.json `public: .output/public` picks up the generated files (e.g. `firebase emulators:start --only hosting` or `firebase hosting:channel:deploy preview` if authenticated; otherwise verify config + directory contents) — no placeholder page at root (SC-004, FR-009) — firebase.json

## Summary

- Total tasks: 30
- Phases: 6 (Dependencies & Repo Hygiene → Directory Restructure → Core Configuration → Support Modules → Component Rewrites → Sweep & Verification)
- Parallel opportunities: 14 tasks marked [P]
- MVP scope: Phases 1–6 are all required — the migration is atomic (the app cannot half-run on two frameworks); earliest meaningful checkpoint is T027 (dev server up)
- Test tasks: none beyond the spec-mandated command gates and manual visual verification (spec CHK-A: no test infrastructure in scope)
