<template>
	<section id="events" ref="sectionRef" class="section">
		<div class="header">
			<span class="header-sub">
				08 JANUARY 2023
			</span>
			<h2 class="header-heading">
				PROGRAM
			</h2>
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

<script setup lang="ts">
const sectionRef = ref<HTMLElement | null>(null);
let parallaxTicking = false;

function handleParallax() {
	if (parallaxTicking) return;
	parallaxTicking = true;
	requestAnimationFrame(() => {
		const el = sectionRef.value;
		if (el) {
			const rect = el.getBoundingClientRect();
			// 0 while section is below the viewport, 1 once it has scrolled past
			const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
			const clamped = Math.min(1, Math.max(0, progress));
			el.style.setProperty('--watermark-shift', `${(clamped - 0.5) * 160}px`);
		}
		parallaxTicking = false;
	});
}

onMounted(() => {
	if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		window.addEventListener('scroll', handleParallax, { passive: true });
		handleParallax();
	}
});

onBeforeUnmount(() => {
	window.removeEventListener('scroll', handleParallax);
});
</script>

<style lang="scss" scoped>
.section {
	position: relative;
	z-index: 0;
	overflow: hidden;
	padding: 24px 24px 64px;
	height: 100%;
	background: linear-gradient(180deg, #FFFFFF 0%, #FAF6EF 18%, #FAF6EF 82%, #FFFFFF 100%);

	&::before {
		content: 'Program';
		position: absolute;
		z-index: -1;
		top: 50%;
		left: 50%;
		transform: translate(-50%, calc(-50% + var(--watermark-shift, 0px)));
		font-family: 'Great Vibes';
		font-size: 380px;
		line-height: 1;
		color: #845F2D;
		opacity: 0.05;
		white-space: nowrap;
		pointer-events: none;
		user-select: none;
	}

	@media (max-width: 768px) {
		padding: 24px 16px 48px;
		height: 100%;

		&::before {
			font-size: 150px;
		}
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
		font-weight: 400;
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
				line-height: 1.4;
				letter-spacing: 0.2em;
				padding: 34px 50px;
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
					padding: 12px 30px;
				}
			}
		}
	}
}
</style>
