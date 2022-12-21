<template>
	<section id="aboutus" class="section">
		<div class="header">
			<span class="header-sub">
				ARE GETTING MARRIED!
			</span>
			<span class="header-heading">
				GROOM AND BRIDE
			</span>
		</div>
		<div class="content">
			<div class="content-couple">
				<img src="Ed Ryan Balabag.png" draggable="false" />
				<span class="couple-name">Ed Ryan Balabag</span>
			</div>
			<div class="content-invitation">
				<span class="heading">Invitation</span>
				<span class="sub-header"><span class="sub-header-pre">Hi <strong>Guest,</strong></span> We Are Excited To
					Invite You On</span>
				<div class="date">
					<span class="day">Sunday</span>
					<span>08TH JANUARY,</span>
					<span>2023</span>
				</div>
			</div>
			<div class="content-couple">
				<img src="/Vanessa Crystal Estremos.png" draggable="false" />
				<span class="couple-name">Vanessa Crystal Estremos</span>
			</div>
		</div>
		<div class="countdown-wrapper">
			<div class="countdown-border">
				<span class="countdown-border-text">DON'T MISS IT!</span>
			</div>
			<div class="countdown-content">
				<div class="countdown-time">
					<span>{{ timeTillWedding.days }}</span>
					<span class="time-label">{{ `Day${timeTillWedding.days > 1 ? 's': ''}` }}</span>
				</div>
				<div class="countdown-time">
					<span>{{ timeTillWedding.hours }}</span>
					<span class="time-label">{{ `Hour${timeTillWedding.hours > 1 ? 's': ''}` }}</span>
				</div>
				<div class="countdown-time">
					<span>{{ timeTillWedding.minutes }}</span>
					<span class="time-label">{{ `Minute${timeTillWedding.minutes > 1 ? 's': ''}` }}</span>
				</div>
				<div class="countdown-time">
					<span>{{ timeTillWedding.seconds }}</span>
					<span class="time-label">{{ `Second${timeTillWedding.seconds > 1 ? 's': ''}` }}</span>
				</div>
			</div>
			<div class="countdown-border">
				<span class="countdown-border-text">UNTIL WE GET MARRIED!</span>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import moment, { duration } from 'moment';

@Component
export default class AboutUsComponent extends Vue {
	get timeTillWedding() {
		const date: any = duration(moment('January 08, 2023').diff(moment()));
		const { days, hours, minutes, seconds } = date._data;
		return {
			days,
			hours,
			minutes,
			seconds,
		};
	}
}
</script>

<style lang="scss" scoped>
.section {
	padding: 24px;
	padding-top: 100px;
	padding-bottom: 48px;

	@media (max-width: 768px) {
		height: 100%;
		padding: 16px;
		padding-top: 60px;
		padding-bottom: 24px;
	}
}

.header {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 16px;
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
		gap: 8px;
	}
}

.content {
	padding: 26px 0px;
	display: flex;
	justify-content: space-evenly;
	max-width: 1440px;
	margin: 0 auto;

	&-couple {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		gap: 4px;

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
		align-items: center;
		gap: 18px;

		.heading {
			font-family: 'Great Vibes';
			font-size: 40px;
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
	&-wrapper {
		display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
</style>
