import { NuxtConfig } from '@nuxt/types';
import { NormalModuleReplacementPlugin } from 'webpack';

import defaults from './environment/defaults.json';
let firebaseEnv = defaults;

const config: NuxtConfig = {
	// Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
	ssr: false,

	// Target: https://go.nuxtjs.dev/config-target
	target: 'static',

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: 'EDspeciallyforVan',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' },
			{ name: 'format-detection', content: 'telephone=no' },
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
		'@/assets/styles/main.scss',
		'@/assets/styles/vue-slick-carousel.css',
		'@/assets/styles/vue-slick-carousel-theme.css',
	],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		'@/plugins/axios.ts',
		'@/plugins/vue-slick-carousel.ts',
		'@/plugins/pwa.client.js',
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/typescript
		'@nuxt/typescript-build',
		'@nuxt/postcss8',
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/axios
		'@nuxtjs/axios',
		// https://go.nuxtjs.dev/pwa
		'@nuxtjs/pwa',
		'@nuxtjs/firebase',
	],

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {
		// Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
		baseURL: '/',
	},
	firebase: {
		config: {
			apiKey: firebaseEnv.apiKey,
			authDomain: firebaseEnv.authDomain,
			projectId: firebaseEnv.projectId,
			storageBucket: firebaseEnv.storageBucket,
			messagingSenderId: firebaseEnv.messagingSenderId,
			appId: firebaseEnv.appId,
			measurementId: firebaseEnv.measurementId,
		},
		services: {
			messaging: {
				createServiceWorker: false,
			},
		},
		onFirebaseHosting: true,
	},
	// PWA module configuration: https://go.nuxtjs.dev/pwa
	pwa: {
		meta: {
			name: 'EDspeciallyforVan',
			nativeUI: true,
			theme_color: '#845F2D',
			lang: 'en',
		},
		manifest: {
			name: 'EDspeciallyforVan',
			short_name: 'EDspeciallyforVan',
			description: 'Ed Ryan and Vanessa',
			background_color: '#FFFFFF',
			theme_color: '#845F2D',
		},
		icon: {
			source: 'static/icon.png',
			fileName: 'icon.png',
		},
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		transpile: [/typed-vuex/],
		extend(config, ctx) {
			if (process.env.NODE_ENV === 'production') {
				config.plugins?.push(
					new NormalModuleReplacementPlugin(
						/environment\/defaults\.json/,
						'@/environment/defaults.prod.json'
					)
				);
			}
		},
		postcss: {
			plugins: {
				tailwindcss: {},
				autoprefixer: {},
			},
		},
	},
};

export default config;
