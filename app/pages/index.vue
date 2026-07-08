<template>
	<div>
		<SectionsHome />
		<SectionsAboutUs />
		<SectionsOurStory />
		<SectionsEvents />
		<SectionsEntourage />
		<SectionsReminders />
	</div>
</template>

<script setup lang="ts">
import moment from 'moment';
import { PWABus } from '@/events/pwa';

const hasDeclinedA2HS = ref(false);
const isAddtoHomescreenPromptShowing = ref(false);

const previouslyShownA2HS = computed(() => {
	const isValid = (localStorage.getItem('previouslyShownA2HS') !== '' &&
		localStorage.getItem('previouslyShownA2HS') !== null);
	if (isValid) {
		const expiry = JSON.parse(localStorage.getItem('previouslyShownA2HS') as string).expiry;
		const isBefore = moment.unix(expiry).isBefore(moment());
		if (isBefore) {
			localStorage.removeItem('previouslyShownA2HS');
			return false;
		} else {
			return isValid ? JSON.parse(localStorage.getItem('previouslyShownA2HS') as string).value as boolean : false;
		}
	} else {
		return false;
	}
});

PWABus.on('pwa:showa2hs', () => {
	if (!previouslyShownA2HS.value && !hasDeclinedA2HS.value) {
		isAddtoHomescreenPromptShowing.value = true;
		const item = {
			value: true,
			expiry: moment().add(12, 'hours').unix(),
		};
		localStorage.setItem('previouslyShownA2HS', JSON.stringify(item));
	}
});
</script>
