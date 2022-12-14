import { PWABus } from '@/events/pwa';

let isLoaded;
window.addEventListener('beforeinstallprompt', (event) => {
	event.preventDefault();
	window.deferredPrompt = event;
	isLoaded = setInterval(showA2HS, 1000);
});
function showA2HS() {
	if (window.landingLoaded) {
		PWABus.$emit('pwa:showa2hs');
		clearInterval(isLoaded);
	}
}
