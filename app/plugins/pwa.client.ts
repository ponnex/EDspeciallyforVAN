import { PWABus } from '@/events/pwa';

export default defineNuxtPlugin(() => {
	let isLoaded: ReturnType<typeof setInterval> | undefined;

	function showA2HS() {
		if ((window as unknown as { landingLoaded?: boolean }).landingLoaded) {
			PWABus.emit('pwa:showa2hs');
			clearInterval(isLoaded);
		}
	}

	window.addEventListener('beforeinstallprompt', (event) => {
		event.preventDefault();
		(window as unknown as { deferredPrompt?: Event }).deferredPrompt = event;
		isLoaded = setInterval(showA2HS, 1000);
	});
});
