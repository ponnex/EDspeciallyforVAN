<template>
	<section
		id="ourstory"
		class="section"
	>
		<div class="header">
			<span class="header-sub">
				ED RYAN AND VANESSA
			</span>
			<span class="header-heading">
				OUR STORY
			</span>
		</div>
		<div class="content">
			<div class="content-timeline">
				<img
					class="icon"
					src="/images/ourstory/1.webp"
					alt="the day we met"
				/>
				<div class="vl"></div>
				<div class="info">
					<span class="date">5 JUN 2006</span>
					<span class="title">THE DAY WE MET</span>
				</div>
			</div>
			<div class="content-timeline">
				<img
					class="icon"
					src="/images/ourstory/2.webp"
					alt="stories opening"
				/>
				<div class="vl"></div>
				<div class="info">
					<span class="date">13 NOV 2017</span>
					<span class="title">STORIES OPENING</span>
				</div>
			</div>
			<div class="content-timeline">
				<img
					class="icon"
					src="/images/ourstory/3.webp"
					alt="aspired to be one"
				/>
				<div class="vl"></div>
				<div class="info">
					<span class="date">15 DEC 2021</span>
					<span class="title">ASPIRED TO BE ONE</span>
				</div>
			</div>
			<div class="content-timeline">
				<img
					class="icon"
					src="/images/ourstory/4.webp"
					alt="the next journey"
				/>
				<div class="vl"></div>
				<div class="info">
					<span class="date">08 JAN 2023</span>
					<span class="title">THE NEXT JOURNEY</span>
				</div>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component
export default class OurStoryComponent extends Vue {
	observer = new IntersectionObserver((entries) => {
		entries.map((entry) => {
			if (entry.isIntersecting) {
				const children = entry.target.children;
				if (children) {
					Array.from(children).map((child, index) => {
						setTimeout(() => {
							child.classList.add('animate');
						}, 300 * index + 1);
						return undefined;
					});
				}
			}
			return undefined;
		});
	}, {
		threshold: 0.1,
	});

	target!: HTMLElement;

	mounted() {
		this.target = document.querySelector('#ourstory .content') as HTMLElement;
		this.observer.observe(this.target);

		document.addEventListener('scroll', () => {
			const content = document.querySelector('#ourstory .content') as HTMLElement;
			if (content.getBoundingClientRect().top > window.scrollY) {
				content.querySelectorAll('.content-timeline').forEach((element) => {
					if (element.classList.contains('animate')) {
						element.classList.remove('animate');
					}
				});
			}
		});
	}

	destroy() {
		this.observer.unobserve(this.target);
	}
}
</script>

<style lang="scss" scoped>
.section {
	padding: 24px;

	@media (max-width: 768px) {
		padding: 24px 16px;
		height: 100%;
	}
}

.header {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding-top: 20px;
	text-align: center;

	&-sub {
		font-size: 16px;
		color: #845F2D;
	}

	&-heading {
		font-size: 48px;
	}

	@media (max-width: 768px) {
		padding-top: 16px;

		&-sub {
			font-size: 14px;
			color: #845F2D;
		}

		&-heading {
			font-size: 36px;
		}
	}
}

.content {
	padding: 26px 0px;
	display: flex;
	justify-content: space-evenly;
	max-width: 1440px;
	margin: 0 auto;

	&-timeline {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 16px;
		opacity: 0;
		transform: translateY(-30px);

		&.animate {
			transition: 0.5s ease-in;
			transition-property: opacity, transform;
			transition-delay: 0.2;
			opacity: 1;
			transform: translateY(0);
		}

		.icon {
			max-width: 80%;
		}

		.vl {
			border-left: 2px solid black;
			opacity: 0.4;
			height: 45px;
		}

		.info {
			display: flex;
			flex-direction: column;
			align-items: center;

			.date {
				font-size: 16px;
				color: #845F2D;
			}

			.title {
				font-size: 20px;
			}
		}
	}

	@media (max-width: 768px) {
		padding-top: 30px;
		flex-direction: column;
		gap: 76px;
	}
}
</style>
