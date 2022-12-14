<template>
	<div class="header">
		<div class="header-container">
			<img class="icon" :src="require('@/assets/images/svg/ico-icon.svg')" />
			<button class="icon-drawer" @click.stop="onToggleDrawer()">
				<img :src="require('@/assets/images/svg/ico-menu.svg')" />
			</button>
			<nav class="nav" :class="[{ 'show-drawer': isDrawerOpen }]" aria-label="breadcrumb">
				<button class="icon-drawer" @click.stop="onToggleDrawer()">
					<img :src="require('@/assets/images/svg/ico-close.svg')" />
				</button>
				<nuxt-link class="nav-item" :to="'/'">Home</nuxt-link>
				<nuxt-link class="nav-item" :to="'#aboutus'">About Us</nuxt-link>
				<nuxt-link class="nav-item" :to="'#ourstory'">Our Story</nuxt-link>
				<nuxt-link class="nav-item" :to="'#events'">Events</nuxt-link>
				<nuxt-link class="nav-item" :to="'#entourage'">Entourage</nuxt-link>
				<nuxt-link class="nav-item" :to="'#reminders'">Reminders</nuxt-link>
			</nav>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator';
import type { Route } from 'vue-router';

@Component
export default class HeaderComponent extends Vue {
	isDrawerOpen: boolean = false;

	@Watch('$route')
	onRouteChange(_route: Route, _from: Route) {
		this.isDrawerOpen = false;
	}

	onToggleDrawer() {
		this.isDrawerOpen = !this.isDrawerOpen;
	}
}
</script>

<style lang="scss" scoped>
.header {
	&-container {
		display: flex;
		justify-content: space-between;
		position: fixed;
		top: 0;
		z-index: 999;
		width: 100vw;
		padding: 20px 72px;

		@media (max-width: 768px) {
			padding: 8px 16px;
		}
	}
}

.nav {
	display: flex;
	align-items: center;
	gap: 48px;

	&-item {
		color: white;
		font-size: 18px;
	}

	&-wrapper {
		padding: 32px;
	}

	@media (max-width: 768px) {
		position: fixed;
		overflow: hidden;
		top: 0;
		right: 0;
		flex-direction: column;
		background-color: white;
		height: 100vh;
		width: 60vw;
		align-items: end;
		gap: 32px;
		padding: 32px;
		transform: translateX(100%);
		transition: 0.3s ease;

		&.show-drawer {
			transform: translateX(0);
		}

		&-item {
			color: black;
			font-size: 24px;
		}
	}
}

.icon {
	@media (max-width: 768px) {
		transform: scale(0.8);
	}
}

.icon-drawer {
	display: none;
	@media (max-width: 768px) {
		display: inline;
	}
}
</style>
