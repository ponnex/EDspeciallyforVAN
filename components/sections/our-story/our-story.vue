<template>
	<section id="ourstory" class="section">
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
				<img class="icon" src="/images/ourstory/1.png" />
				<div class="vl"></div>
				<div class="info">
					<span class="date">5 JUN 2006</span>
					<span class="title">THE DAY WE MET</span>
				</div>
			</div>
			<div class="content-timeline">
				<img class="icon" src="/images/ourstory/2.png" />
				<div class="vl"></div>
				<div class="info">
					<span class="date">13 NOV 2017</span>
					<span class="title">STORIES OPENING</span>
				</div>
			</div>
			<div class="content-timeline">
				<img class="icon" src="/images/ourstory/3.png" />
				<div class="vl"></div>
				<div class="info">
					<span class="date">15 DEC 2021</span>
					<span class="title">ASPIRED TO BE ONE</span>
				</div>
			</div>
			<div class="content-timeline">
				<img class="icon" src="/images/ourstory/4.png" />
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
export default class OurStoryComponent extends Vue {}
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

	&-timeline {
		display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
		gap: 16px;

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
