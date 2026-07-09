<template>
	<section
		id="ourstory"
		class="section"
	>
		<div class="header">
			<span class="header-sub">
				ED RYAN AND VANESSA
			</span>
			<h2 class="header-heading">
				OUR STORY
			</h2>
		</div>
		<div class="content">
			<div class="content-timeline">
				<img
					class="icon"
					src="/images/ourstory/1.webp"
					alt="the day we met"
				>
				<div class="vl"/>
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
				>
				<div class="vl"/>
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
				>
				<div class="vl"/>
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
				>
				<div class="vl"/>
				<div class="info">
					<span class="date">08 JAN 2023</span>
					<span class="title">THE NEXT JOURNEY</span>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
let observer: IntersectionObserver | undefined;

onMounted(() => {
	observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			const children = Array.from(entry.target.children);
			if (entry.isIntersecting) {
				children.forEach((child, index) => {
					setTimeout(() => {
						child.classList.add('animate');
					}, 300 * index + 1);
				});
			}
			else if (entry.boundingClientRect.top > 0) {
				// section left viewport below the fold — reset so it replays on next scroll down
				children.forEach((child) => child.classList.remove('animate'));
			}
		});
	}, {
		threshold: 0.1,
	});

	const target = document.querySelector('#ourstory .content');
	if (target) {
		observer.observe(target);
	}
});

onBeforeUnmount(() => {
	observer?.disconnect();
});
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
