<template>
	<section id="aboutus" class="section">
		<div class="header">
			<span class="header-info-1">
				ARE GETTING MARRIED!
			</span>
			<span class="header-info-2">
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
	</section>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component
export default class AboutUsComponent extends Vue { }
</script>

<style lang="scss" scoped>
.section {
	padding: 24px;
	padding-top: 128px;
	padding-bottom: 48px;

	@media (max-width: 768px) {
		height: 100%;
		padding: 16px;
		padding-top: 90px;
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

	&-info-1 {
		font-size: 18px;
		color: #845F2D;
	}

	&-info-2 {
		font-size: 64px;
	}

	@media (max-width: 768px) {
		padding-top: 16px;
		gap: 8px;
	}
}

.content {
	padding-top: 80px;
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

	.couple-name {
		margin-top: 24px;
		font-family: 'Great Vibes';
		font-size: 30px;
		color: #845F2D;
	}
}

&-invitation {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 32px;

	.heading {
		font-family: 'Great Vibes';
		font-size: 60px;
	}

	.sub-header {
		max-width: 190px;
		text-align: center;
		color: #5B5B5B;

		&-pre {
			font-size: 24px;
		}
	}

	.date {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-family: 'Lora';
		font-weight: 600;
		font-size: 30px;

		.day {
			color: #845F2D;
		}
	}
}

@media (max-width: 768px) {
	padding-top: 64px;
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
</style>
