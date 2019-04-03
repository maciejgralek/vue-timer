<template>
	<div id="app">
		<!-- <navbar></navbar> -->

		<settings-ui class="position-fixed settings-fixed m-2"></settings-ui>

		<div class="container-fluid">

			<!-- row -->

			<div class="row">
				<div class="col-12 d-flex">
					<div class="mx-auto">
						<router-view></router-view>
					</div>
				</div>
			</div>

			<!-- row -->

			<div class="row mt-4 justify-content-center">
				<div class="col-6">
					<div class="d-flex align-items-center justify-content-center">
						<transition name="fade">
							<settings v-show="state.showSettings" class="w-100"></settings>
						</transition>
					</div>
				</div>
			</div>

			<!-- row -->

		</div> 
	</div>
</template>

<script>
	import { cookie } from './cookie.js'
	import tools from './tools.js';

	import Navbar from './components/Navbar.vue';
	import Settings from './components/Settings.vue';
	import SettingsUi from './components/SettingsUi.vue';
	import { store } from './store.js'

	export default {
		components: {
			Navbar,
			Settings,
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
