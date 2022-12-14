<template>
	<div>
		<header-component />
		<main>
			<Nuxt keep-alive />
		</main>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import HeaderComponent from '@/components/header/header.vue';

@Component({
	components: {
		HeaderComponent,
	},
})
export default class DefaultLayout extends Vue {}
</script>
