<template>
	<section id="#" class="section">
		<div ref="parallaxRef" class="parallax-layer">
			<Carousel
				class="banner-carousel"
				:autoplay="5000"
				:wrap-around="true"
				:items-to-show="1"
				:pause-autoplay-on-hover="true"
			>
				<Slide v-for="(image, imageIdx) in bannerImages" :key="imageIdx">
					<img class="carousel-image" :src="image.pathLong" draggable="false" :alt="`Ed Ryan and Vanessa photo ${imageIdx + 1}`" >
				</Slide>
			</Carousel>
		</div>
		<div class="scrim" aria-hidden="true"/>
		<div ref="bannerRef" class="banner">
			<h1 class="banner-header" :aria-label="bannerWords.join(' ')">
				<span v-for="(word, wordIdx) in bannerWords" :key="wordIdx" class="banner-header-word" aria-hidden="true">{{ word }}</span>
			</h1>
			<span class="banner-date">SUNDAY, JANUARY 08 2023</span>
		</div>
	</section>
</template>

<script setup lang="ts">
import { Carousel, Slide } from 'vue3-carousel';
import moment from 'moment';
import type { BannerImage } from '@/model/banner';

const parallaxRef = ref<HTMLDivElement | null>(null);
const bannerRef = ref<HTMLDivElement | null>(null);
let parallaxTicking = false;

function handleParallax() {
	if (parallaxTicking) return;
	parallaxTicking = true;
	requestAnimationFrame(() => {
		const viewportHeight = window.innerHeight;
		const scrolled = Math.min(window.scrollY, viewportHeight);
		if (parallaxRef.value) {
			parallaxRef.value.style.transform = `translateY(${scrolled * 0.4}px)`;
		}
		if (bannerRef.value) {
			bannerRef.value.style.transform = `translateY(${scrolled * 0.18}px)`;
			bannerRef.value.style.opacity = String(Math.max(0, 1 - scrolled / (viewportHeight * 0.65)));
		}
		parallaxTicking = false;
	});
}

onMounted(() => {
	if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		window.addEventListener('scroll', handleParallax, { passive: true });
	}
});

onBeforeUnmount(() => {
	window.removeEventListener('scroll', handleParallax);
});

const weddingDate = moment('January 08, 2023 12:30 PM');
const isBeforeWedding = computed(() => moment().isBefore(weddingDate));
const bannerWords = computed(() =>
	(isBeforeWedding.value ? 'SAVE THE DATE' : 'WE GOT MARRIED').split(' '),
);

const bannerModules = import.meta.glob('~/assets/images/banner/*.webp', {
	eager: true,
	import: 'default',
});

const bannerImages: BannerImage[] = Object.keys(bannerModules)
	.sort()
	.map((key) => ({
		pathLong: bannerModules[key] as string,
		pathShort: key,
	}));
</script>

<style lang="scss" scoped>
.section {
	position: relative;
	overflow: hidden;
}

.parallax-layer {
	will-change: transform;
}

.carousel-image {
	height: 100vh;
	width: 100vw;
	background-repeat: no-repeat;
	background-size: cover;
	object-fit: cover;
}

.scrim {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 1;
	pointer-events: none;
	background:
		linear-gradient(to right, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0) 60%),
		linear-gradient(to top, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0) 40%);
}

.banner {
	position: absolute;
	top: 0;
	bottom: 0;
	z-index: 1;
	margin: auto 72px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 465px;
	color: white;
	gap: 70px;

	&-header {
		font-size: 112px;
		line-height: 112px;
		font-weight: 400;
		text-shadow: 0 2px 24px rgba(0, 0, 0, 0.5);

		&-word {
			display: block;
		}
	}

	&-date {
		font-size: 36px;
		line-height: 36px;
		font-weight: 400;
		text-shadow: 0 1px 12px rgba(0, 0, 0, 0.6);
	}

	&-carousel {
		& :deep(.carousel__track) {
			height: 100% !important;
		}
	}

	@media (max-width: 768px) {
		margin: 24px;
		gap: 40px;
		width: auto;

		&-header {
			font-size: 84px;
			line-height: 84px;
		}

		&-date {
			font-size: 18px;
			line-height: 18px;
		}
	}

	@media (max-width: 576px) {
		margin: 16px;
		gap: 32px;

		&-header {
			font-size: 64px;
			line-height: 64px;
		}

		&-date {
			font-size: 24px;
			line-height: 24px;
		}
	}
}
</style>
