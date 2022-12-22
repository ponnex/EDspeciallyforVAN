<template>
	<div>
		<home-component />
		<about-us-component />
		<our-story-component />
		<events-component />
		<entourage-component />
		<reminders-component />
	</div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import moment, { unix } from 'moment';
import { PWABus } from '@/events/pwa';
import HomeComponent from '@/components/sections/home/home.vue';
import AboutUsComponent from '@/components/sections/about-us/about-us.vue';
import OurStoryComponent from '@/components/sections/our-story/our-story.vue';
import EventsComponent from '@/components/sections/events/events.vue';
import EntourageComponent from '@/components/sections/entourage/entourage.vue';
import RemindersComponent from '@/components/sections/reminders/reminders.vue';

@Component({
	components: {
		HomeComponent,
		AboutUsComponent,
		OurStoryComponent,
		EventsComponent,
		EntourageComponent,
		RemindersComponent,
	},
})
export default class IndexPage extends Vue {
	hasDeclinedA2HS: boolean = false;
	isAddtoHomescreenPromptShowing: boolean = false;

	created() {
		PWABus.$on('pwa:showa2hs', () => {
			if (!this.previouslyShownA2HS && !this.hasDeclinedA2HS) {
				this.isAddtoHomescreenPromptShowing = true;
				const item = {
					value: true,
					expiry: moment().add(12, 'hours').unix(),
				};
				localStorage.setItem('previouslyShownA2HS', JSON.stringify(item));
			}
		});
	}

	get previouslyShownA2HS() {
		const isValid = (localStorage.getItem('previouslyShownA2HS') !== '' &&
			localStorage.getItem('previouslyShownA2HS') !== null);
		if (isValid) {
			const expiry = JSON.parse(localStorage.getItem('previouslyShownA2HS') as string).expiry;
			const isBefore = unix(expiry).isBefore(moment());
			if (isBefore) {
				localStorage.removeItem('previouslyShownA2HS');
				return false;
			} else {
				return isValid ? JSON.parse(localStorage.getItem('previouslyShownA2HS') as string).value as boolean : false;
			}
		} else {
			return false;
		}
	}
}
</script>
