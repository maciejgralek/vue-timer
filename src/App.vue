<template>
	<div id="app">
		<navbar>
		</navbar>

		<settings-ui class="position-fixed settings-fixed m-2">
		</settings-ui>

		<router-view>
		</router-view>
	</div>
</template>

<script>
	import { cookie } from './cookie.js'
	import tools from './tools.js';

	import Navbar from './components/Navbar.vue';
	import Settings from './components/Settings.vue';
	import SettingsAlarm from './components/SettingsAlarm.vue';
	import SettingsUi from './components/SettingsUi.vue';
	import { store } from './store.js'

	export default {
		components: {
			Navbar,
			SettingsUi
		},

		data() {
			return {
				state: store.state
			}
		},

		methods: {
			setupFromCookie() {
				let settings = this.state.settings;
				let cookieString = cookie.getCookie();
				if (cookieString) {
					let cookieData = JSON.parse(cookie.getCookie());
					tools.copyObjectProperties(cookieData.timeSet, this.state.timeSet)
					tools.copyObjectProperties(cookieData.timeRestartAfter, this.state.timeRestartAfter)
					tools.copyObjectProperties(cookieData.timerAlarm, this.state.timerAlarm)
					this.state.settings.soundIndex = cookieData.settings.soundIndex;
					this.state.settings.onZeroAction = cookieData.settings.onZeroAction;
					this.state.settings.fontColor = cookieData.settings.fontColor;
					this.state.settings.backgroundColor = cookieData.settings.backgroundColor;
					this.state.settings.fontSize = cookieData.settings.fontSize;
					this.state.settings.soundRepeat = cookieData.settings.soundRepeat;
					this.state.settings.is24hours = cookieData.settings.is24hours;
					if (cookieData.recent) {
						for (let recentItem = 0; recentItem < cookieData.recent.length; recentItem++)
							this.$set(this.state.recent, recentItem, cookieData.recent[recentItem]);
					}
				}
			}
		},

		mounted: function() {
			cookie.initCookie();
			this.setupFromCookie();
			// document.body.style.backgroundSize = "100% 100%";
			// document.body.style.backgroundAttachment = "fixed";
			// document.body.style.backgroundImage = 
			// 	"url(" + require("./assets/mountains.jpg") +")"
		}
	}
</script>

<style>
body {
	overflow-y: scroll;
}
.settings-fixed {
	right: 0;
	z-index: 1030;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .20s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
