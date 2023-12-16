<template>
	<section
		id="reminders"
		class="section"
	>
		<div class="header">
			<span class="header-sub">
				ADDITIONAL INFORMATION
			</span>
			<span class="header-heading">
				REMINDERS
			</span>
		</div>
		<div class="content">
			<div class="reminder-wrapper">
				<div class="reminder">
					<span class="heading">ADMISSION</span>
					<span>This is an exclusive <strong>NO INVITATION, NO ADMISSION</strong> event.</span>
					<span class="heading">EVENT STARTS</span>
					<span>Registration starts at <strong>12:30 PM</strong> JANUARY 08 2023, SUNDAY.</span>
				</div>
				<div class="reminder">
					<span class="heading">DRESS CODE</span>
					<p>
						We would love to have you share the moment of our joy and love as we unite as one. If you can, we will
						be pleased if you will be able to wear attires that matches the color palette of our wedding day. Please
						wear an attire that matches <em class="sub">royal blue & gray</em> tones and color as shown below. This is a
						formal event:
						Strictly Long dress/gowns for ladies and Coat and tie for the gentlemen only are allowed during the
						event.
					</p>
					<div class="palette-container">
						<div class="palette-wrapper">
							<div class="palette palette-blue"></div>
							<div class="palette palette-gray"></div>
							<div class="palette palette-gray-dark"></div>
						</div>
						<span>ROYAL BLUE & GRAY</span>
					</div>
				</div>
			</div>
			<div class="reminder-wrapper">
				<div class="reminder">
					<span class="heading">KIDS</span>
					<p>
						— are very much welcome during the Buddhism and
						reception ceremonies, however they are going to be separated in an exclusive area for kids - <em>Kalinaw
							Hall</em> in
						the church and <em>bride's make up room in Cove</em>. Parents are encouraged to let them bring their <em>own
							toys and
							other
							essentials </em>that would last them all throughout the day. They are placed under the supervision of
						adults who
						are
						assigned for this task, so there's nothing to worry about. This is initiated so that the guests can focus on
						the ceremonies while the kids will have their own way of enjoying the day.
					</p>
				</div>
				<div class="reminder">
					<span class="heading">PROGRAM NOTICE</span>
					<p>
						During the reception program, the couple would like to do away with the usual money dance for the guests.
						Instead, they would like to have the money dare.
					</p>
					<span class="sub">Mechanics:</span>
					<p>
						All guests assigned in tables 1 to 9 will hold their money as one and will think of one dare
						for the couple to do in exchange for the money you have gathered in your table. So every table is encouraged
						to have a <em>fun dare</em> for the couple. The table with the <em>highest amount</em> will receive a prize from the couple.
					</p>
					<span class="sub">Ex:</span>
					<p>For 10,000 pesos, we dare the couple to do a 5-second kiss.</p>
				</div>
			</div>
			<div class="reminder-wrapper">
				<div class="reminder">
					<span class="heading">GIFTS</span>
					<p>
						In relation to the celebration, we know how much you would want to send your best wishes through gifts or
						well
						wishes. If you happen to have something in mind, we would wish to discourage you from preparing such. Your
						presence alone is what we ask of you. But if you wish to insist, we have listed our wishlist from SM gift
						registry. They have offered their service to settle our gifts without the hassle on your end. You may visit
						the link here: <a
							href="https://thesmstoregiftregistry.com/eventdetail/634c311764223426c6070332"
							target="_blank"
							class="link sub"
						>
							The SM Store Gift Registry
						</a>
					</p>

					<div class="qr-wrapper">
						<span>or scan this QR code</span>
						<img
							height="150px"
							width="150px"
							src="/qrgift.webp"
							alt="gift registry qr code"
						/>
					</div>
				</div>
				<div class="reminder">
					<span class="heading">ON THE DAY HOTLINE</span>
					<p>
						If there's anything that you need assistance with on the day of the wedding, you may certainly seek help
						from the core entourage:
					</p>
					<span>Nichole <em>(Head of Entourage)</em></span>
					<a
						href="tel:+639982949192"
						class="mobile"
					>0998-294-9192</a>
					<span>Charlene <em>(Matron of Honor)</em></span>
					<a
						href="tel:+639176520141"
						class="mobile"
					>0917-652-0141</a>
					<span>Isamie <em>(Maid of Honor)</em></span>
					<a
						href="tel:+639762755443"
						class="mobile"
					>0976-275-5443</a>
				</div>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component
export default class RemindersComponent extends Vue { }
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
	flex-direction: column;
	max-width: 1440px;
	margin: 0 auto;
	gap: 48px;
	margin: 82px auto 0px;

	.reminder {
		display: flex;
		flex-direction: column;
		gap: 8px;

		&-wrapper {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 48px;
		}

		.heading {
			font-weight: 700;
			font-size: 18px;
		}

		.heading:not(:first-child) {
			margin-top: 24px;
		}

		.sub,
		.mobile {
			color: #845F2D;
		}

		.qr-wrapper {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			text-align: center;
			gap: 16px;
		}

		.palette {
			height: 50px;
			width: 50px;
			border-radius: 50%;
			display: inline-block;

			&-container {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				font-weight: 600;
			}

			&-wrapper {
				display: flex;
				justify-content: center;
				align-items: center;
				gap: 24px;
				padding: 24px 0px;
			}

			&-blue {
				background-color: #36419A;
			}

			&-gray {
				background-color: #D9D9D9;
			}

			&-gray-dark {
				background-color: #8A8782;
			}
		}
	}

	@media (max-width: 768px) {
		flex-direction: column;
		margin: 64px auto 0px;

		.reminder {
			&-wrapper {
				display: grid;
				grid-template-columns: 1fr;
				gap: 48px;
			}
		}
	}
}
</style>
