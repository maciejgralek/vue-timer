import jscookie from 'js-cookie'

export const cookie = {
	cookieData: null,

	initCookie() {
		this.cookieData = jscookie.get('settings');
	},

	setCookie(settings) {
		jscookie.set('settings', settings);
	},

	getCookie() {
		return this.cookieData;
	}
	
}
