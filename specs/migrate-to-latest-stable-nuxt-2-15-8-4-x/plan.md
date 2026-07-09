# Implementation Plan: Migrate to Latest Stable Nuxt (2.15.8 → 4.4.8)

**Date**: 2026-07-09
**Spec**: specs/spec.md
**Status**: Approved (auto-accepted by planning pipeline)

## Summary

Migrate the static, client-only (ssr: false) wedding-invitation site from Nuxt 2.15.8 / Vue 2.7 / webpack 4 / node-sass to Nuxt 4.4.8 / Vue 3 / Vite / dart-sass so `npm run dev|build|generate` work on Node v22.20.0. All nine class-style SFCs are rewritten to `<script setup lang="ts">`, Nuxt-2-only modules are removed or replaced (axios → removed, firebase client module → removed, @nuxtjs/pwa → @vite-pwa/nuxt, vue-slick-carousel → vue3-carousel), and the Firebase Hosting deploy is repointed at `.output/public`. No visual or behavioral changes.

## Technical Context

**Stack**: Nuxt 4.4.8 (Vue 3.5, Vite, Nitro), TypeScript, Tailwind CSS 3 (via PostCSS), SCSS (dart-sass), Firebase Hosting (static)
**Primary Dependencies (verified latest as of 2026-07-09)**: `nuxt@^4.4.8`, `vue3-carousel@^0.17.0`, `@vite-pwa/nuxt@^1.1.1`, `mitt@^3.0.1`, `sass@^1.101.0`, `@nuxt/eslint@^1.16.0`, `moment@2.29.4` (kept)
**Storage**: none (no DB; `localStorage` for the A2HS-shown flag)
**Target Layer(s)**: frontend only (static SPA)
**Performance Goals**: none defined beyond "no regression" (SC-003)
**Constraints**: Node v22.20.0; `ssr: false` preserved; static output deployable by `firebase deploy --only hosting`; STRICT SCOPE — only migration-required changes, zero visual redesign

## Verified Codebase Inventory (counted, not guessed)

| Item | Count / Fact |
|---|---|
| Components | 7 (`header`, `sections/{home,about-us,our-story,events,entourage,reminders}`) — **all 7** use `nuxt-property-decorator` class components |
| Pages | 1 (`pages/index.vue`) — class component, uses PWABus + `localStorage` + moment |
| Layouts | 1 (`layouts/default.vue`) — class component, renders `<Nuxt keep-alive />` |
| Plugins | 3: `axios.ts` (sets baseURL from a key that does not exist in `environment/defaults.json` → dead code), `vue-slick-carousel.ts` (global component registration), `pwa.client.js` (`beforeinstallprompt` → PWABus) |
| Vuex store | **empty** — `store/README.md` only → no Pinia/useState migration needed |
| `@nuxtjs/firebase` usage | config only (messaging, `createServiceWorker: false`); **zero** `$fire` references in code → module removed, no replacement needed |
| `@nuxtjs/axios` usage | plugin only; **zero** HTTP calls in app → removed, no $fetch replacement needed |
| `vue-agile` usage | **zero** → dependency removed |
| `vue-slick-carousel` usage | 1 place: `components/sections/home/home.vue` banner (autoplay 2500 ms, no arrows/dots, centerMode, progressive lazyload) + 2 CSS files in `assets/styles/` + global plugin + `types/vue-slick-carousel.d.ts` |
| Webpack-only APIs | `require.context('@/static/images/banner/')` in `home.vue`; `require('@/assets/images/svg/*.svg')` ×3 in `header.vue`; `NormalModuleReplacementPlugin` env-swap in `nuxt.config.ts` — all break under Vite |
| Vue-2-only patterns | event bus `new Vue()` in `events/pwa.ts` (+ `$on`/`$emit`); `/deep/` in scoped SCSS (`home.vue` ×1, `header.vue` ×5); `@Watch('$route')` + `vue-router` v3 `Route` type in `header.vue` |
| PWA A2HS flow | inert in production — `window.landingLoaded` is never set anywhere, so the bus never emits; must merely not error after migration |
| Static assets | `static/` (favicon, icon.png 512×512, ed/van/qrgift.webp, `images/banner/` ×49 webp, `images/ourstory/` ×4 webp); components reference them by root-absolute URL except the banner (build-time discovery) |
| Stray `public/` dir | contains Firebase-init placeholder `index.html` + `404.html` — **would shadow the generated app** in Nuxt 4 (public/ becomes the served static dir) → placeholders deleted |
| firebase.json | `"public": "dist"`, rewrite `** → /index.html`, predeploy `npm run generate` |

## Key Decisions (auto-accepted, most-conventional path)

| # | Decision | Choice | Rationale |
|---|---|---|---|
| D1 | Target version | Nuxt **4.4.8** (`npm dist-tag latest`) | Spec FR-002 |
| D2 | Directory layout | Adopt Nuxt 4 default **`app/` srcDir** (move `assets/ components/ layouts/ pages/ plugins/ events/ model/` → `app/`); `public/` and `nuxt.config.ts` stay at root | Nuxt 4's documented default (`srcDir: 'app'`); avoids relying on legacy-structure fallback detection; moves are pure renames — `@/` and `~/` aliases point at srcDir so existing imports keep resolving |
| D3 | Component style | **`<script setup lang="ts">`** for all 9 SFCs | Conventional for Nuxt 4; nuxt-property-decorator has no Vue 3 support |
| D4 | HTTP client | **Remove** @nuxtjs/axios + `plugins/axios.ts`; no replacement | Zero HTTP calls exist (verified); adding $fetch wiring would be scope creep |
| D5 | Firebase client | **Remove** @nuxtjs/firebase; no vuefire | Zero `$fire` usage (verified); Firebase stays as hosting target only. `environment/` JSONs and the webpack env-swap plugin become orphaned → removed with it |
| D6 | State management | **None** | Vuex store is empty; `store/` directory removed |
| D7 | PWA | **@vite-pwa/nuxt** `^1.1.1`, `registerType: 'autoUpdate'`, manifest replicated (name/short_name `EDspeciallyforVan`, description `Ed Ryan and Vanessa`, `background_color #FFFFFF`, `theme_color #845F2D`, icon `/icon.png` 512×512); SW emitted at default `/sw.js` so it takes over the old @nuxtjs/pwa worker, with `cleanupOutdatedCaches` | Keeps FR-008 installability and unsticks previously-cached visitors |
| D8 | Carousel | **vue3-carousel** `^0.17.0` imported locally in `home.vue` (`Carousel`/`Slide`, `:autoplay="2500"`, `:wrap-around="true"`, `:items-to-show="1"`, `:pause-autoplay-on-hover="false"`); delete slick CSS/plugin/shim; port `.slick-list` scoped styles to vue3-carousel classes | Lightest maintained Vue-3-native option matching a simple full-viewport autoplay banner; Swiper's Vue components are deprecated in favor of web components |
| D9 | Event bus | **mitt** `^3.0.1` in `app/events/pwa.ts` (`$on/$emit` → `on/emit`) | Vue 3 removed instance event bus; mitt is the canonical replacement |
| D10 | Sass | **`sass`** (dart-sass) devDep; remove node-sass + sass-loader (Vite handles SCSS natively); `/deep/` → `:deep()` | node-sass is the primary Node 22 breakage |
| D11 | Banner image discovery | `require.context` → **`import.meta.glob('~/assets/images/banner/*.webp', { eager: true, import: 'default' })`**; move `static/images/banner/` → `app/assets/images/banner/` (keys sorted alphabetically to preserve order) | public/ files can't be globbed; assets keep build-time auto-discovery, same alphabetical order |
| D12 | Other static files | `static/` → `public/` (favicon.ico, icon.png, ed/van/qrgift.webp, `images/ourstory/`); root-absolute URLs in components unchanged; delete stale Firebase placeholders `public/index.html`, `public/404.html` | Nuxt 4 serves `public/` at root — same URLs as Nuxt 2 `static/` |
| D13 | Tailwind | Keep **v3** via Nuxt `postcss` option (`tailwindcss` + `autoprefixer` plugins); update `content` globs to `./app/**` | v4 upgrade explicitly out of scope; postcss-in-nuxt.config is supported in Nuxt 4 without @nuxt/postcss8 |
| D14 | ESLint | **@nuxt/eslint** `^1.16.0` module + ESLint 9 flat config (`eslint.config.mjs` via `withNuxt`); remove @babel/eslint-parser, @nuxtjs/eslint-config-typescript, @nuxtjs/eslint-module, eslint-plugin-nuxt | Old shareable configs are eslintrc/Nuxt-2 era; @nuxt/eslint is the official Nuxt 3/4 setup (FR-011) |
| D15 | TypeScript | `tsconfig.json` → `{ "extends": "./.nuxt/tsconfig.json" }`; add `typescript` + `vue-tsc` devDeps; `"typecheck": "nuxt typecheck"` script; delete `types/vue-slick-carousel.d.ts` (and `types/` if then empty) | Nuxt 4 generates the real tsconfig; decorators config no longer needed (FR-010) |
| D16 | Deploy output | `firebase.json` `"public": ".output/public"`; `clean` script → `rimraf .output dist` | `nuxt generate` with `ssr: false` emits `.output/public/index.html` + bundles (verified in Nuxt 4 docs); pointing at the real dir avoids dist-symlink quirks |
| D17 | moment | **Keep** 2.29.4 | Works under Vue 3/Vite; replacing is out of scope (spec) |
| D18 | stylelint files | Untouched | `stylelint` binary was never installed and no script runs it — pre-existing, not migration-related |

## Data Model

No changes. Existing interfaces move with their files: `app/model/banner.ts` (`BannerImage`), `app/model/time.ts` (`Countdown`).

## API Contracts

None. The app makes no HTTP calls; no endpoints exist or are added.

## Component / Module Breakdown (file-by-file migration map)

### Rewritten to `<script setup lang="ts">` (Vue 3)

| File (post-move path) | Migration specifics beyond class→setup |
|---|---|
| `app/pages/index.vue` | `PWABus.$on` → `PWABus.on` (mitt); `created()` → setup body/`onMounted`; getter → `computed`; keep localStorage/moment logic verbatim |
| `app/layouts/default.vue` | `<Nuxt keep-alive />` → `<slot />`; drop manual component registration (auto-import) |
| `app/components/header/header.vue` | `require('@/assets/...svg')` ×3 → static ES imports; `@Watch('$route')` → `watch(() => useRoute().fullPath, …)`; drop `vue-router` v3 `Route` type; move `window.pageYOffset` init into client lifecycle; `/deep/` ×5 → `:deep()` |
| `app/components/sections/home/home.vue` | `vue-slick-carousel` → `Carousel`/`Slide` from vue3-carousel per D8; `require.context` → `import.meta.glob` per D11; `@Ref` → template ref; `/deep/ .slick-list` → `:deep()` on the equivalent vue3-carousel track class; keep `.carousel-image` 100vh/100vw styles |
| `app/components/sections/about-us/about-us.vue` | keep moment countdown logic; class fields → `ref`s; interval lifecycle → `onMounted`/`onBeforeUnmount` |
| `app/components/sections/our-story/our-story.vue` | straight conversion (static content) |
| `app/components/sections/events/events.vue` | straight conversion |
| `app/components/sections/entourage/entourage.vue` | straight conversion |
| `app/components/sections/reminders/reminders.vue` | straight conversion |

### Rewritten support modules

- `app/events/pwa.ts` — `new Vue()` → `mitt<{ 'pwa:showa2hs': void }>()`
- `app/plugins/pwa.client.ts` — wrap existing `beforeinstallprompt` logic in `defineNuxtPlugin` (rename from `.js`, keep behavior verbatim)

### Deleted

- `plugins/axios.ts`, `plugins/vue-slick-carousel.ts` (D4, D8)
- `assets/styles/vue-slick-carousel.css`, `assets/styles/vue-slick-carousel-theme.css` (D8)
- `types/vue-slick-carousel.d.ts` (D8/D15)
- `environment/defaults.json`, `environment/defaults.prod.json` (D5 — orphaned)
- `store/` (D6), `public/index.html` + `public/404.html` placeholders (D12)
- Directory READMEs that describe Nuxt 2 behavior move with their folders or are dropped if their folder is deleted

### Config files rewritten/updated

| File | Change |
|---|---|
| `nuxt.config.ts` | `defineNuxtConfig({ ssr: false, compatibilityDate: '2026-07-09', app: { head: <existing title/meta/favicon + theme-color> }, css: ['~/assets/styles/main.scss', 'vue3-carousel/dist/carousel.css'], modules: ['@vite-pwa/nuxt'], postcss: { plugins: { tailwindcss: {}, autoprefixer: {} } }, pwa: <D7 manifest> })`. Removed: `target`, `buildModules`, axios/firebase/pwa(v2) blocks, `components: true` (default), plugins array (auto-registered), `build.transpile`/`extend`/webpack plugin |
| `package.json` | Scripts: `dev: nuxt dev`, `build: nuxt build`, `start: nuxt preview`, `generate: nuxt generate`, `clean: rimraf .output dist`, `postinstall: nuxt prepare`, `typecheck: nuxt typecheck`, `lint:js: eslint .`, `lintfix: eslint . --fix`, `deploy` unchanged. Deps per Dependencies section; regenerate `package-lock.json` |
| `tsconfig.json` | `{ "extends": "./.nuxt/tsconfig.json" }` |
| `eslint.config.mjs` (new) | `withNuxt()` from `./.nuxt/eslint.config.mjs`; delete any `.eslintrc*` remnants |
| `tailwind.config.js` | `content: ['./app/**/*.{js,ts,vue}', './nuxt.config.ts']` |
| `firebase.json` | `"public": ".output/public"`; rewrites + predeploy unchanged |
| `.gitignore` | ensure `.output`, `.nuxt`, `.data`, `dist` are listed |
| `jsconfig.json` | untouched (pre-existing editor config, not migration-related) |

## Project Structure (after migration)

```
EDspeciallyforVAN/
├── app/
│   ├── assets/
│   │   ├── fonts/            (moved as-is)
│   │   ├── images/svg/       (moved as-is)
│   │   ├── images/banner/    (49 webp — moved from static/images/banner per D11)
│   │   └── styles/           (main.scss, fonts.scss, tailwind.scss — slick CSS deleted)
│   ├── components/           (header/ + sections/* — rewritten)
│   ├── events/pwa.ts         (mitt bus)
│   ├── layouts/default.vue
│   ├── model/                (banner.ts, time.ts — moved as-is)
│   ├── pages/index.vue
│   └── plugins/pwa.client.ts
├── public/                   (favicon.ico, icon.png, ed.webp, van.webp, qrgift.webp, images/ourstory/ — from static/)
├── specs/                    (spec.md, plan.md, tasks.md)
├── eslint.config.mjs
├── firebase.json             (public: .output/public)
├── nuxt.config.ts
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## Dependencies (final package.json shape)

**dependencies**: `nuxt@^4.4.8`, `mitt@^3.0.1`, `moment@2.29.4`, `vue3-carousel@^0.17.0`
**devDependencies**: `@nuxt/eslint@^1.16.0`, `@vite-pwa/nuxt@^1.1.1`, `autoprefixer@^10.4.x`, `eslint@^9`, `postcss@^8.4.x`, `rimraf@^3.0.2` (kept), `sass@^1.101.0`, `tailwindcss@^3.2.4` (kept on v3), `typescript@^5`, `vue-tsc@^2`
**Removed** (FR-007 sweep): `@nuxtjs/axios`, `@nuxtjs/firebase`, `@nuxtjs/pwa`, `core-js`, `nuxt@2`, `nuxt-property-decorator`, `vue@2`, `vue-agile`, `vue-server-renderer`, `vue-template-compiler`, `@babel/eslint-parser`, `@nuxt/postcss8`, `@nuxt/types`, `@nuxt/typescript-build`, `@nuxtjs/eslint-config-typescript`, `@nuxtjs/eslint-module`, `@types/webpack-env`, `cross-env` (unused), `eslint-plugin-nuxt`, `eslint-plugin-vue` (provided via @nuxt/eslint), `node-sass`, `sass-loader`
`firebase-tools` remains a global/CI concern (unchanged today — it is not in package.json).

## Analysis (spec ↔ plan cross-check)

| Spec item | Plan coverage | Status |
|---|---|---|
| FR-001 dev/build/generate on Node 22 | D1, D10, scripts table, verification steps | PASS |
| FR-002 latest stable Nuxt | D1 (4.4.8 verified via `npm dist-tags`) | PASS |
| FR-003 static SPA output | `ssr: false` kept; `.output/public` (D16) | PASS |
| FR-004 Firebase deploy | D16 firebase.json update; predeploy intact | PASS |
| FR-005 UI preserved | D8 parity settings + per-file map keeps all markup/styles; only mechanical changes | PASS |
| FR-006 off class components | 9/9 SFCs in breakdown table | PASS |
| FR-007 dead/legacy deps removed | Dependencies "Removed" list covers all named packages | PASS |
| FR-008 PWA manifest | D7 replicates manifest + icon | PASS |
| FR-009 stale placeholders | D12 deletes `public/index.html`/`404.html` | PASS |
| FR-010 TypeScript | D15 tsconfig + typecheck script | PASS |
| FR-011 lint works | D14 @nuxt/eslint flat config | PASS |
| Edge: SW stale cache | D7 autoUpdate + same `/sw.js` path | PASS |
| Edge: banner discovery | D11 glob keeps auto-discovery + order | PASS |
| Edge: A2HS inertness | mitt port keeps behavior identical (still inert, no errors) | PASS |

No CRITICAL/HIGH findings. MEDIUM notes folded into Known Risks below.

## Constitution Compliance

No `CLAUDE.md` constitution exists in the repository root → N/A / PASS.

## Red-Team: Pre-Mortem and Mitigations (all mitigations auto-accepted)

Steelman: the plan removes three Nuxt modules outright rather than replacing them, which is only safe because usage was verified to be zero; every remaining change is a documented 1:1 mechanical mapping, so the failure surface is concentrated in the few genuinely behavioral swaps (carousel, PWA SW, deploy dir).

1. **Carousel visual drift** — vue3-carousel's DOM/classes differ from slick (`centerMode`, `lazyLoad: 'progressive'` have no exact equivalents), so the banner could letterbox, snap differently, or flash-load. *Early sign*: banner not full-viewport in dev. *Mitigation (adopted)*: keep `.carousel-image { height: 100vh; width: 100vw; object-fit: cover }`, port `.slick-list` overrides to the vue3-carousel track class, side-by-side visual check against production as an explicit task. `centerMode`/progressive-lazyload are no-ops for identical full-width slides — accepted as non-observable.
2. **Returning visitors stuck on old service worker** — old @nuxtjs/pwa workbox SW could keep serving the Nuxt 2 bundle. *Early sign*: deployed site shows old content on a previously-used browser until hard refresh. *Mitigation (adopted)*: @vite-pwa/nuxt emits `/sw.js` (same path/scope) with `registerType: 'autoUpdate'` and `cleanupOutdatedCaches: true`, so the new worker replaces the old on next visit.
3. **Deploy uploads wrong/empty directory** — firebase.json left at `dist`, or the `dist` symlink confuses firebase-tools. *Early sign*: post-deploy root URL shows Firebase placeholder or 404. *Mitigation (adopted)*: point firebase.json at `.output/public`, delete the placeholder `public/index.html` (which would otherwise be copied into every build), and add an explicit task to serve `.output/public` locally and verify before any deploy.
4. **Hash-anchor nav regression** — `<NuxtLink to="#events">` under vue-router 4 may resolve/scroll differently than vue-router 3. *Early sign*: nav clicks don't scroll or throw router warnings in dev. *Mitigation (adopted)*: verification task clicks every nav item; fallback (one-line change) is plain `<a href="#events">` anchors — CSS `scroll-behavior: smooth` already provides the smoothness, and the `$route` watcher that closes the drawer is adjusted to watch `route.hash` too so drawer-close behavior survives either way.
5. **Webpack-era remnants slip through** — a missed `require()`, `/deep/`, `$on`, or decorator import fails the Vite build or silently breaks styling. *Early sign*: build errors or unstyled sections. *Mitigation (adopted)*: dedicated final sweep task greps for `require(`, `require.context`, `/deep/`, `\$on|\$emit`, `nuxt-property-decorator`, `@nuxtjs/`, `process.env.NODE_ENV` in app code before the build gate.

## Known Risks (accepted)

- dart-sass prints `@import` deprecation warnings for `main.scss`/`fonts.scss` — warnings only; rewriting to `@use` is out of scope.
- `moment` is in maintenance mode — kept deliberately (spec Out of Scope).
- Tailwind stays on v3 — supported but not latest major; deliberate (spec Out of Scope).
- Lighthouse/PWA audit parity (icon sizes beyond 512×512, maskable icons) is not improved — parity with today only.

**Strengthened position**: a verified-zero-usage removal strategy plus 1:1 mechanical mappings keeps the migration surface small; the three genuinely behavioral swaps (carousel, service worker, deploy directory) each carry an explicit verification task and a cheap documented fallback.
