<template>
	<div id="app">
		<!-- <navbar></navbar> -->

		<settings-ui class="position-fixed settings-fixed m-2"></settings-ui>

						<router-view></router-view>
		<!-- <div class="container&#45;fluid"> -->
    <!--  -->
		<!-- 	<!&#45;&#45; row &#45;&#45;> -->
    <!--  -->
		<!-- 	<div class="row"> -->
		<!-- 		<div class="col&#45;12 d&#45;flex"> -->
		<!-- 			<div class="mx&#45;auto"> -->
		<!-- 				<router&#45;view></router&#45;view> -->
		<!-- 			</div> -->
		<!-- 		</div> -->
		<!-- 	</div> -->
    <!--  -->
		<!-- 	<!&#45;&#45; row &#45;&#45;> -->
    <!--  -->
		<!-- 	<div class="row mt&#45;4 justify&#45;content&#45;center"> -->
		<!-- 		<div class="col&#45;6"> -->
		<!-- 			<div class="d&#45;flex align&#45;items&#45;center justify&#45;content&#45;center"> -->
		<!-- 				<transition name="fade"> -->
		<!-- 					<settings v&#45;show="state.showSettings" class="w&#45;100"></settings> -->
		<!-- 				</transition> -->
		<!-- 			</div> -->
		<!-- 		</div> -->
		<!-- 	</div> -->
    <!--  -->
		<!-- 	<!&#45;&#45; row &#45;&#45;> -->
    <!--  -->
		<!-- </div>  -->
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
			Settings,
			SettingsAlarm,
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
					this.state.settings.soundIndex = cookieData.settings.soundIndex;
					this.state.settings.onZeroAction = cookieData.settings.onZeroAction;
					this.state.settings.fontColor = cookieData.settings.fontColor;
					this.state.settings.backgroundColor = cookieData.settings.backgroundColor;
					this.state.settings.fontSize = cookieData.settings.fontSize;
					this.state.settings.soundRepeat = cookieData.settings.soundRepeat;
				}
			}
		},

		mounted: function() {
			cookie.initCookie();
			this.setupFromCookie();
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
