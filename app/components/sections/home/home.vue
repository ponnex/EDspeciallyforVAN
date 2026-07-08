<template>
	<section id="#" class="section">
		<Carousel
			class="banner-carousel"
			:autoplay="2500"
			:wrap-around="true"
			:items-to-show="1"
			:pause-autoplay-on-hover="false"
		>
			<Slide v-for="(image, imageIdx) in bannerImages" :key="imageIdx">
				<img class="carousel-image" :src="image.pathLong" draggable="false" alt="carousel image" >
			</Slide>
		</Carousel>
		<div class="banner">
			<span class="banner-header">SAVE THE DATE</span>
			<span class="banner-date">SUNDAY, JANUARY 08 2023</span>
		</div>
	</section>
</template>

<script setup lang="ts">
import { Carousel, Slide } from 'vue3-carousel';
import type { BannerImage } from '@/model/banner';

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
}

.carousel-image {
	height: 100vh;
	width: 100vw;
	background-repeat: no-repeat;
	background-size: cover;
	object-fit: cover;
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
		display: table-caption;
		word-spacing: 9999rem;
		font-size: 112px;
		line-height: 112px;
		font-weight: 400;
	}

	&-date {
		font-size: 36px;
		line-height: 36px;
		font-weight: 400;
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
