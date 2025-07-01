<template>
	<section
		id="aboutus"
		class="section"
	>
		<div class="header">
			<span class="header-sub">
				ARE GETTING MARRIED!
			</span>
			<span class="header-heading">
				GROOM AND BRIDE
			</span>
		</div>
		<div class="content-wrapper">
			<div class="content">
				<div class="content-couple ed">
					<img
						src="ed.webp"
						draggable="false"
						alt="Ed Portrait"
					/>
					<span class="couple-name">Ed Ryan Balabag</span>
				</div>
				<div class="content-invitation">
					<template v-if="isBeforeWedding">
						<span class="heading">Invitation</span>
						<span class="sub-header"><span class="sub-header-pre">Hi <strong>Guest,</strong></span> We Are Excited
							To
							Invite You On</span>
					</template>
					<div
						v-show="isBeforeWedding"
						class="date"
					>
						<span class="day">Sunday</span>
						<span>08TH JANUARY,</span>
						<span>2023</span>
					</div>
				</div>
				<div class="content-couple van">
					<img
						src="van.webp"
						draggable="false"
						alt="Van Portrait"
					/>
					<span class="couple-name">Vanessa Crystal Estremos</span>
				</div>
			</div>
			<template v-if="!isBeforeWedding">
				<span class="heading">Thank you for celebrating with us!</span>
			</template>
			<div
				v-if="isBeforeWedding"
				class="countdown-container"
			>
				<div class="countdown-border">
					<span class="countdown-border-text">DON'T MISS IT!</span>
				</div>
				<div class="countdown-content">
					<div class="countdown-time">
						<span>{{ timeTillWedding.days }}</span>
						<span class="time-label">{{ `Day${timeTillWedding.days > 1 ? 's' : ''}` }}</span>
					</div>
					<div class="countdown-time">
						<span>{{ timeTillWedding.hours }}</span>
						<span class="time-label">{{ `Hour${timeTillWedding.hours > 1 ? 's' : ''}` }}</span>
					</div>
					<div class="countdown-time">
						<span>{{ timeTillWedding.minutes }}</span>
						<span class="time-label">{{ `Minute${timeTillWedding.minutes > 1 ? 's' : ''}` }}</span>
					</div>
					<div class="countdown-time">
						<span>{{ timeTillWedding.seconds }}</span>
						<span class="time-label">{{ `Second${timeTillWedding.seconds > 1 ? 's' : ''}` }}</span>
					</div>
				</div>
				<div class="countdown-border">
					<span class="countdown-border-text">UNTIL WE GET MARRIED!</span>
				</div>
			</div>
			<div
				v-else
				class="wedding-date-container"
			>
				<div>SUNDAY</div>
				<div class="wedding-date-content">
					<span>JANUARY</span>
					<span>08</span>
					<span>2023</span>
				</div>
				<div>12:30 PM</div>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import moment, { duration } from 'moment';
import { Countdown } from '@/model/time';

@Component
export default class AboutUsComponent extends Vue {
	weddingDate = moment('January 08, 2023 12:30 PM');
	timeTillWedding: Countdown = {
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	};
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

	created() {
		setInterval(() => {
			const date: any = duration(this.weddingDate.diff(moment()));
			const { days, hours, minutes, seconds } = date._data;
			this.timeTillWedding = {
				days,
				hours,
				minutes,
				seconds,
			};
		}, 1000);
	}

	target!: HTMLElement;

	mounted() {
		this.target = document.querySelector('#aboutus .content') as HTMLElement;
		this.observer.observe(this.target);

		document.addEventListener('scroll', () => {
			const content = document.querySelector('#aboutus .content') as HTMLElement;
			if (content.getBoundingClientRect().top > window.scrollY) {
				content.querySelectorAll('.content-couple').forEach((element) => {
					if (element.classList.contains('animate')) {
						element.classList.remove('animate');
					}
				});
			}
		});
	}


	get isBeforeWedding() {
		return moment().isBefore(this.weddingDate);
	}
}
</script>

<style lang="scss" scoped>
.section {
	padding: 24px;

	@media (max-width: 768px) {
		padding: 24px 16px;
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

.heading {
	font-family: 'Great Vibes';
	font-size: 40px;
	text-align: center;
}

.sub-header {
	max-width: 190px;
	text-align: center;
	color: #5B5B5B;

	&-pre {
		font-size: 18px;
	}
}

.date {
	display: flex;
	flex-direction: column;
	align-items: center;
	font-family: 'Lora';
	font-weight: 600;
	font-size: 22px;

	.day {
		color: #845F2D;
	}
}

.content {
	padding: 26px 0px;
	display: flex;
	justify-content: center;
	gap: 16px;
	max-width: 1440px;
	margin: 0 auto;

	&-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		gap: 48px;
	}

	&-couple {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		gap: 4px;
		opacity: 0;

		&.ed {
			transform: translateX(-30px);
		}

		&.van {
			transform: translateX(30px);
		}

		&.animate {
			transition: 0.5s ease-in;
			transition-property: opacity, transform;
			transition-delay: 0.2;
			opacity: 1;
			transform: translateX(0);
		}

		img {
			max-width: 70%;
		}

		.couple-name {
			margin-top: 24px;
			font-family: 'Great Vibes';
			font-size: 28px;
			color: #845F2D;
		}
	}

	&-invitation {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 18px;
	}

	@media (max-width: 768px) {
		padding-top: 30px;
		flex-direction: column;
		gap: 48px;

		&-couple {
			order: 2;
		}

		&-invitation {
			order: 1;
		}
	}
}

.countdown {
	&-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		gap: 8px;
	}

	&-border {
		float: left;
		width: 100%;
		text-align: center;
		position: relative;
		z-index: 1;
		padding: 20px 0px;

		&-text {
			font-size: 20px;
			line-height: 20px;
			display: inline-block;
			width: auto;
			padding: 0px 15px;
			background-color: #ffffff;
		}

		&::after {
			content: "";
			position: absolute;
			top: 50%;
			left: 0px;
			right: 0px;
			background-color: black;
			height: 1px;
			z-index: -1;
		}
	}

	&-content {
		width: 100%;
		display: flex;
		justify-content: space-evenly;
		margin-top: 16px;

		@media (max-width: 768px) {
			flex-direction: column;
			gap: 32px;
		}
	}

	&-time {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-family: 'Great Vibes';
		font-size: 64px;
		line-height: 46px;
		color: #845F2D;

		.time-label {
			font-family: 'Lora';
			font-size: 18px;
			color: #5B5B5B;
		}
	}
}

.wedding-date {
	&-container {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		gap: 48px;
		z-index: 1;
		padding: 20px 0px;
		font-size: 36px;

		&::before {
			content: "";
			position: absolute;
			top: 25%;
			left: 0px;
			right: 0px;
			background-color: black;
			height: 1px;
			z-index: -1;
		}

		&::after {
			content: "";
			position: absolute;
			top: 75%;
			left: 0px;
			right: 0px;
			background-color: black;
			height: 1px;
			z-index: -1;
		}
	}

	&-content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 4px;
		background: white;

		span {
			font-size: 56px;
		}

		span:first-of-type,
		span:last-of-type {
			font-size: 24px;
			padding: 0px 50px;
		}
	}

	@media (max-width: 768px) {
		&-container {
			flex-direction: column;
		}
	}
}
</style>
