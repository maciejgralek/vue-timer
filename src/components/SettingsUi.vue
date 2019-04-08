<template>
			<div>
				<transition name="fade">
				<div v-if="state.showSettings">
					<div class="d-flex justify-content-end">
						<a href="" 
							 class="icon btn btn-secondary" 
							 @click.prevent="setFontSize(1)">
							A+
						</a>
						<a href="" 
							 class="icon btn btn-secondary ml-1" 
							 @click.prevent="setFontSize(-1)">
							A-
						</a>
					</div>
					<div class="d-flex justify-content-end mt-2" @click="setFontColor($event)">
						<span data-color="black" class="dot dot-dark mx-1"></span>
						<span data-color="white" class="dot dot-light mx-1"></span>
						<span data-color="gold" class="dot dot-gold mx-1"></span>
						<span data-color="lightgreen" class="dot dot-lightgreen mx-1"></span>
						<span data-color="lightblue" class="dot dot-lightblue mx-1"></span>
						<span data-color="red" class="dot bg-red mx-1"></span>
					</div>
					<div class="d-flex justify-content-end mt-2" @click="setBackgroundColor($event)">
						<span data-color="black" class="dot dot-dark mx-1"></span>
						<span data-color="white" class="dot dot-light mx-1"></span>
						<span data-color="gray" class="dot dot-gray mx-1"></span>
					</div>
				</div>
				</transition>
			</div>
</template>

<script>
	import { store } from '../store.js'
	import { cookie } from '../cookie.js';

	export default {
		data: function() {
			return {
					state: store.state
				}
		},

		computed: {
		},

		updated: function() {
			cookie.setCookie(this.state);
		},

		methods:{
			setFontSize(size) {
				let fontSize = this.state.settings.fontSize + 20 * size;
				if (fontSize > store.config.fontSizeMax) {
					fontSize = store.config.fontSizeMax;
				}
				if (fontSize < store.config.fontSizeMin) {
					fontSize = store.config.fontSizeMin;
				}

				this.state.settings.fontSize = fontSize;

				cookie.setCookie(this.state);
			},

			setBackgroundColor(e) {
				let color = e.target.dataset.color;
				this.state.settings.backgroundColor = color;

				cookie.setCookie(this.state);
			},

			setFontColor(e) {
				let color = e.target.dataset.color;
				this.state.settings.fontColor = color;

				cookie.setCookie(this.state);
			}
		},

		mounted: function() {
		}
	}
</script>

<style>
.dropdown {
	margin-left: auto;
}
.icon {
	font-weight: bold;
	/* font-size: 1.2em; */
}
.icon:hover {
	text-decoration: none;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .20s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
				
</style>
