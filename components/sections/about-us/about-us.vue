<template>
	<section id="aboutus" class="section">
		About Us
	</section>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component
export default class AboutUsComponent extends Vue {}
</script>

<style lang="scss" scoped>
.section {
	background-color: red;
}
</style>
