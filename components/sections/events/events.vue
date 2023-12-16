<template>
	<section id="events" class="section">
		<div class="header">
			<span class="header-sub">
				08 JANUARY 2023
			</span>
			<span class="header-heading">
				PROGRAM
			</span>
		</div>
		<div class="content">
			<div class="program">
				<div class="program-item">
					<div class="date">
						<span>12:30</span>
						<span>PM</span>
					</div>
					<span class="title">REGISTRATION</span>
				</div>
				<div class="program-item">
					<div class="date">
						<span>1:00</span>
						<span>PM</span>
					</div>
					<span class="title">CEREMONY</span>
				</div>
				<div class="program-item">
					<div class="date">
						<span>2:00</span>
						<span>PM</span>
					</div>
					<span class="title">PRE-RECEPTION COCKTAIL PARTY</span>
				</div>
				<div class="program-item">
					<div class="date">
						<span>3:00</span>
						<span>PM</span>
					</div>
					<span class="title">COVE RECEPTION</span>
				</div>
				<div class="program-item">
					<div class="date">
						<span>3 - 6:30</span>
						<span>PM</span>
					</div>
					<span class="title">RECEPTION PROGRAM</span>
				</div>
				<div class="program-item">
					<div class="date">
						<span>6:30</span>
						<span>PM</span>
					</div>
					<span class="title">EVENT CLOSING PARTY</span>
				</div>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component
export default class EventsComponent extends Vue {}
</script>

<style lang="scss" scoped>
.section {
	padding: 24px;
	height: 100%;

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
	display: flex;
	justify-content: space-evenly;
	max-width: 1440px;
	margin: 36px auto 0px;

	.program {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		gap: 16px;

		&-item {
			display: grid;
			grid-template-columns: 150px 1fr;
			justify-content: center;
			align-items: center;
			border-bottom: 1px solid black;
			padding-bottom: 16px;
			width: 100%;

			.date {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				font-size: 22px;
				color: #845F2D;
				border-right: 1px solid #000000;
			}

			.title {
				font-weight: 600;
				font-size: 22px;
				line-height: 100px;
				letter-spacing: 0.2em;
				padding: 0px 50px;
			}
		}
	}

	@media (max-width: 768px) {
		flex-direction: column;
		gap: 48px;
		margin: 24px auto 0px;

		.program {
			&-item {
				grid-template-columns: 90px 1fr;
				.date {
					font-size: 16px;
				}

				.title {
					font-size: 16px;
					line-height: 24px;
					word-break: break-word;
					padding: 0px 30px;
				}
			}
		}
	}
}
</style>
