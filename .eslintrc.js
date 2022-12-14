module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	extends: [ '@nuxtjs/eslint-config-typescript', 'plugin:nuxt/recommended' ],
	plugins: [],
	// add your custom rules here
	rules: {
		semi: [ 'error', 'always' ],
		'space-before-function-paren': [ 'error', 'never' ],
		'space-before-blocks': 'error',
		'quote-props': [ 'error', 'as-needed' ],
		'eol-last': [ 'error', 'always' ],
		'prefer-template': 'error',
		'comma-dangle': [ 'error', 'always-multiline' ],
		'array-bracket-spacing': [ 'error', 'always' ],
		'valid-jsdoc': [
			'error',
			{ requireReturnType: false, requireParamType: true },
		],
		'no-tabs': 'off',
		indent: [ 'error', 'tab' ],
		'vue/html-indent': [ 'error', 'tab' ],
		'vue/html-self-closing': 'off',
		'vue/singleline-html-element-content-newline': 'off',
		'vue/no-v-html': 'off',
	},
	ignorePatterns: [
		'nuxt.config.ts',
		'*.d.ts',
		'.eslintrc.js',
		'static/sw.js',
	],
};
