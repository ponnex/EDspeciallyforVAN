<template>
	<div class="header">
		<div ref="headerContainerRef" class="header-container" :class="[{ 'intersecting': isIntersecting }]">
			<img class="icon" :src="icoIcon" alt="Ed Ryan and Vanessa logo" >
			<button class="icon-menu" @click.stop="onToggleDrawer()">
				<img :src="icoMenu" alt="menu" >
			</button>
			<div v-if="isDrawerOpen" class="nav-backdrop" @click="onToggleDrawer()"/>
			<nav class="nav" :class="[{ 'show-drawer': isDrawerOpen }]" aria-label="Main navigation">
				<button class="icon-close" @click.stop="onToggleDrawer()">
					<img :src="icoClose" alt="close" >
				</button>
				<NuxtLink class="nav-item" :to="'#'">Home</NuxtLink>
				<NuxtLink class="nav-item" :to="'#aboutus'">About Us</NuxtLink>
				<NuxtLink class="nav-item" :to="'#ourstory'">Our Story</NuxtLink>
				<NuxtLink class="nav-item" :to="'#events'">Events</NuxtLink>
				<NuxtLink class="nav-item" :to="'#entourage'">Entourage</NuxtLink>
				<NuxtLink class="nav-item" :to="'#reminders'">Reminders</NuxtLink>
			</nav>
		</div>
	</div>
</template>

<script setup lang="ts">
import icoIcon from '@/assets/images/svg/ico-icon.svg';
import icoMenu from '@/assets/images/svg/ico-menu.svg';
import icoClose from '@/assets/images/svg/ico-close.svg';

const route = useRoute();

const headerContainerRef = ref<HTMLDivElement | null>(null);
const isDrawerOpen = ref(false);
const isIntersecting = ref(false);
let prevScrollpos = 0;
let bannerObserver: IntersectionObserver | undefined;

watch(() => [route.fullPath, route.hash], () => {
	isDrawerOpen.value = false;
});

watch(isDrawerOpen, (open) => {
	document.body.style.overflow = open ? 'hidden' : '';
});

function handleScroll() {
	if (isDrawerOpen.value) {
		isDrawerOpen.value = false;
	}
}

function handleKeydown(event: KeyboardEvent) {
	if (event.key === 'Escape' && isDrawerOpen.value) {
		isDrawerOpen.value = false;
	}
}

function handleNavScroll() {
	const currentScrollPos = window.pageYOffset;
	if (prevScrollpos > currentScrollPos) {
		headerContainerRef.value?.classList.remove('nav-up');
	} else {
		headerContainerRef.value?.classList.add('nav-up');
	}
	prevScrollpos = currentScrollPos;
}

function onToggleDrawer() {
	isDrawerOpen.value = !isDrawerOpen.value;
}

onBeforeMount(() => {
	prevScrollpos = window.pageYOffset;
	window.addEventListener('scroll', handleScroll);
});

onMounted(() => {
	const sectionBanner = document.querySelector('section[id*="#"]');
	bannerObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry: IntersectionObserverEntry) => {
				isIntersecting.value = entry.intersectionRatio > 0.08;
			});
		},
		{
			threshold: [ 0.08 ],
		},
	);
	if (sectionBanner) {
		bannerObserver.observe(sectionBanner);
	}

	window.addEventListener('scroll', handleNavScroll);
	window.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
	window.removeEventListener('scroll', handleScroll);
	window.removeEventListener('scroll', handleNavScroll);
	window.removeEventListener('keydown', handleKeydown);
	bannerObserver?.disconnect();
	document.body.style.overflow = '';
});
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

		& :deep(.icon), .icon-menu {
			filter: invert(100%);
		}

		&.nav-up {
			top: -102px;
			box-shadow: unset;
		}

		&.intersecting {
			background-color: unset;
			box-shadow: unset;
			& :deep(.icon), .icon-menu {
				filter: unset;
			}

			& :deep(.nav-item) {
				color: white;
				text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8), 0 0 16px rgba(0, 0, 0, 0.5);
			}
		}

		@media (max-width: 768px) {
			height: 76px;
			padding: 16px;

			& :deep(.icon-menu) {
				height: 28px;
				width: 28px;
			}

			&.intersecting {
				background-color: unset;
				box-shadow: unset;
				& :deep(.icon), .icon-menu {
					filter: unset;
				}

				& :deep(.nav-item) {
					color: black;
				}
			}
		}
	}
}

.nav-backdrop {
	display: none;

	@media (max-width: 768px) {
		display: block;
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.4);
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
		height: 100vh;
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
