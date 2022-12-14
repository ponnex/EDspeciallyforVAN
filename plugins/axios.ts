const defaults = require('@/environment/defaults.json');

export default function(context: any) {
	context.$axios.setBaseURL(defaults.baseUrl);
}
