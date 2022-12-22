<template>
	<section id="#" class="section">
		<vue-slick-carousel ref="banner-carousel" class="banner-carousel" v-bind="settings">
			<div v-for="(image, imageIdx) in bannerImages" :key="imageIdx">
				<img class="carousel-image" :src="image.pathLong" draggable="false" />
			</div>
		</vue-slick-carousel>
		<div class="banner">
			<span class="banner-header">SAVE THE DATE</span>
			<span class="banner-date">SUNDAY, JANUARY 08 2023</span>
		</div>
	</section>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'nuxt-property-decorator';
import { BannerImage } from '@/model/banner';

@Component
export default class HomeComponent extends Vue {
	@Ref('banner-carousel') bannerCarouselRef!: any;
	bannerImages: BannerImage[] = [];

	settings = {
		autoplaySpeed: 2500,
		autoplay: true,
		arrows: false,
		dots: false,
		centerMode: true,
		pauseOnHover: false,
		centerPadding: '0',
	};

	created() {
		this.importAll(require.context('@/static/images/banner/', false, /\.jpg$/));
	}

	importAll(r: any) {
		r.keys().forEach((key: any) =>
			this.bannerImages.push({
				pathLong: r(key).replace(/\/_nuxt\/static/g, ''),
				pathShort: key,
			}),
		);
	}
}
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
		& /deep/ .slick-list {
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
