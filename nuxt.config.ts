export default defineNuxtConfig({
	// Disable server-side rendering — static SPA deployed to Firebase Hosting
	ssr: false,

	compatibilityDate: '2026-07-09',

	app: {
		head: {
			title: 'EDspeciallyforVan',
			meta: [
				{ charset: 'utf-8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
				{ name: 'description', content: 'Ed Ryan & Vanessa got married on January 8, 2023. Program, entourage, and reminders for our guests.' },
				{ name: 'format-detection', content: 'telephone=no' },
				{ name: 'theme-color', content: '#845F2D' },
				{ property: 'og:type', content: 'website' },
				{ property: 'og:title', content: 'Ed Ryan & Vanessa | 08 January 2023' },
				{ property: 'og:description', content: 'Ed Ryan & Vanessa got married on January 8, 2023. Program, entourage, and reminders for our guests.' },
				{ property: 'og:url', content: 'https://edspeciallyforvan.web.app/' },
				{ property: 'og:image', content: 'https://edspeciallyforvan.web.app/og-image.jpg' },
				{ property: 'og:image:width', content: '1200' },
				{ property: 'og:image:height', content: '800' },
				{ name: 'twitter:card', content: 'summary_large_image' },
				{ name: 'twitter:title', content: 'Ed Ryan & Vanessa | 08 January 2023' },
				{ name: 'twitter:image', content: 'https://edspeciallyforvan.web.app/og-image.jpg' },
			],
			link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
		},
	},

	css: ['~/assets/styles/main.scss', 'vue3-carousel/dist/carousel.css'],

	modules: ['@nuxt/eslint', '@vite-pwa/nuxt'],

	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},

	pwa: {
		registerType: 'autoUpdate',
		manifest: {
			name: 'EDspeciallyforVan',
			short_name: 'EDspeciallyforVan',
			description: 'Ed Ryan and Vanessa',
			background_color: '#FFFFFF',
			theme_color: '#845F2D',
			display: 'standalone',
			icons: [
				{
					src: '/icon.png',
					sizes: '512x512',
					type: 'image/png',
				},
			],
		},
		workbox: {
			cleanupOutdatedCaches: true,
		},
	},
});
