<template>
	<div class="header">
		<div ref="headerContainer" class="header-container" :class="[{ 'intersecting': isIntersecting }]">
			<img class="icon" :src="require('@/assets/images/svg/ico-icon.svg')" />
			<button class="icon-menu" @click.stop="onToggleDrawer()">
				<img :src="require('@/assets/images/svg/ico-menu.svg')" />
			</button>
			<nav class="nav" :class="[{ 'show-drawer': isDrawerOpen }]" aria-label="breadcrumb">
				<button class="icon-close" @click.stop="onToggleDrawer()">
					<img :src="require('@/assets/images/svg/ico-close.svg')" />
				</button>
				<nuxt-link class="nav-item" :to="'#'">Home</nuxt-link>
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
import { Vue, Component, Watch, Ref } from 'nuxt-property-decorator';
import type { Route } from 'vue-router';

@Component
export default class HeaderComponent extends Vue {
	@Ref('headerContainer') headerContainerRef!: HTMLDivElement;
	isDrawerOpen: boolean = false;
	isIntersecting: boolean = false;
	prevScrollpos: number = window.pageYOffset;

	@Watch('$route')
	onRouteChange(_route: Route, _from: Route) {
		this.isDrawerOpen = false;
	}

	mounted() {
		const sectionBanner = document.querySelector('section[id*="#"]') as HTMLElement;
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry: IntersectionObserverEntry) => {
					if (entry.intersectionRatio > 0.1 && window.innerWidth > 1024) {
						this.isIntersecting = true;
					} else if (entry.intersectionRatio > 0.08 && window.innerWidth < 756) {
						this.isIntersecting = true;
					} else {
						this.isIntersecting = false;
					}
				});
			},
			{
				threshold: [ 0.08, 0.1 ],
			},
		);
		observer.observe(sectionBanner);

		window.addEventListener('scroll', () => {
			const currentScrollPos = window.pageYOffset;
			if (this.prevScrollpos > currentScrollPos) {
				this.headerContainerRef.classList.remove('nav-up');
			} else {
				this.headerContainerRef.classList.add('nav-up');
			}
			this.prevScrollpos = currentScrollPos;
		});
	}

	beforeMount() {
		window.addEventListener('scroll', this.handleScroll);
	}

	beforeDestroy() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	handleScroll() {
		if (this.isDrawerOpen) {
			this.isDrawerOpen = false;
		}
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
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 999;
		width: 100vw;
		padding: 20px 72px;
		transition: top 0.2s ease-in-out;
		background-color: white;
		box-shadow: white 0 4px 4px -1px;
		height: 102px;

		& /deep/ .icon, .icon-menu {
			filter: invert(100%);
		}

		&.nav-up {
			top: -102px;
		}

		&.intersecting {
			background-color: unset;
			box-shadow: unset;
			& /deep/ .icon, .icon-menu {
				filter: unset;
			}

			& /deep/ .nav-item {
				color: white;
			}
		}

		@media (max-width: 768px) {
			height: 76px;
			padding: 16px;

			& /deep/ .icon-menu {
				height: 28px;
				width: 28px;
			}

			&.intersecting {
				background-color: unset;
				box-shadow: unset;
				& /deep/ .icon, .icon-menu {
					filter: unset;
				}

				& /deep/ .nav-item {
					color: black;
				}
			}
		}
	}
}

.nav {
	display: flex;
	align-items: center;
	gap: 48px;

	&-item {
		color: black;
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
		height: var(--doc-height);
		width: 30vw;
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

	@media (max-width: 576px) {
		width: 60vw;
	}
}

.icon {
	max-width: 112px;
	@media (max-width: 768px) {
		max-width: 79px;
	}
}

.icon-menu, .icon-close {
	display: none;

	@media (max-width: 768px) {
		display: -webkit-inline-box;
    display: inline-flex;
		height: min-content;
	}
}
</style>
