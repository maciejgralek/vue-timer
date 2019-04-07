<template>
	<div>
		<div ref="timer" class="timer text-center">
			<span v-if="time.hours"> {{ time.hours | addZero }} : </span> 
			{{ time.minutes | addZero }} : {{ time.seconds | addZero }}
		</div>
		<div class="d-flex justify-content-center">
			<button 
				 type="button" 
				 class="btn btn-primary" 
				 @click="startTimer">
				Start
			</button>
			<button 
				 type="button" 
				 class="btn btn-secondary ml-4"
				 @click="resetTimer">
				Reset
			</button>
			<button 
				 type="button" 
				 class="btn btn-secondary ml-4" 
				 @click.prevent="state.showSettings = !state.showSettings">
				Settings
			</button>
		</div>

		<alarm-modal 
			:time="timeToRestart" 
			id="alarmModal" 
			@pause-sound="pauseSound" />

	</div>
</template>

<script>
	import AlarmModal from './AlarmModal.vue';
	import { store } from '../store.js'
	import { mixin } from '../mixin.js'

	import tools from '../tools.js';
	import { ui } from '../ui.js';
	import { sound } from '../sound.js'
	import { timer } from '../timer.js'
	import $ from 'jquery';

	export default {
		components: {
			AlarmModal
		},

		data() {
			return {
				time: {
					hours: 0,
					minutes: 0,
					seconds: 0
				},
				timeToRestart: {
					hours: 0,
					minutes: 0,
					seconds: 0
				},
				delta: 0,
				timeStart: 0,
				interval: null,
				intervalRestart: null,
				state: store.state
			}
		},

		filters: {
			addZero(value) {
				let str = value.toString();
				if (str.length == 1) {
					return "0" + str;
				}

				return str;
			}
		},

		computed: {

		},

		methods: {
			startTimer() {
				clearInterval(this.intervalRestart);
				tools.copyObjectProperties(this.state.timeRestartAfter, this.timeToRestart);
				this.interval = timer.createTimer(this.time, this.alarm)
			},

			alarm() {
				sound.play(this.state.settings.soundIndex, this.state.settings.soundRepeat);
				$('#alarmModal').modal('show');
				if (this.state.settings.onZeroAction === 0) {
					this.stopTimer();
				}
				else if (this.state.settings.onZeroAction === "restart") {
					this.resetTimer();
					this.startTimer();
				}
				else if (this.state.settings.onZeroAction === "restart2") {
					this.resetTimer();
					this.intervalRestart = timer.createTimer(this.timeToRestart, this.startTimer)
				}
			},

			stopTimer() {
				timer.stopTimer(this.interval);
				this.interval = null;
			},

			resetTimer() {
				this.stopTimer();
				tools.copyObjectProperties(this.state.timeSet, this.time);
			},

			pauseSound() {
				sound.pause(this.state.settings.soundIndex);
			}
		},

		watch: {
			'state.timeSet':{
				handler: function () {
					tools.copyObjectProperties(this.state.timeSet, this.time);
					if (this.interval) {
						this.resetTimer();
					}
				},
				deep: true
			},
			'state.timeRestartAfter': {
				handler: function () {
					tools.copyObjectProperties(this.state.timeRestartAfter, this.timeToRestart);
				},
				deep: true
			},
			'state.settings.fontSize': {
				handler: function () {
					ui.setFontSize(this.$refs.timer, this.state.settings.fontSize);
					ui.centerElementVertically(this.$el);
				}
			},
			'state.settings.fontColor': {
				handler: function () {
					ui.setForegroundColor(this.$refs.timer, this.state.settings.fontColor);
				}
			},
			'state.settings.backgroundColor': {
				handler: function () {
					document.body.style.backgroundImage = "";
					ui.setBackgroundColor(document.body, this.state.settings.backgroundColor);
				}
			}
		},

		mounted: function() {
			tools.copyObjectProperties(this.state.timeSet, this.time);
			tools.copyObjectProperties(this.state.timeRestartAfter, this.timeToRestart);

			ui.setForegroundColor(this.$refs.timer, this.state.settings.fontColor);
			ui.setBackgroundColor(document.body, this.state.settings.backgroundColor);
			ui.setFontSize(this.$refs.timer, this.state.settings.fontSize);
			ui.centerElementVertically(this.$el);

			sound.initSound();

			window.addEventListener('resize', () => ui.centerElementVertically(this.$el));
		}
	}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat');
@import url('https://fonts.googleapis.com/css?family=Aldrich');
@font-face { font-family: Digital; src: url('../assets/LiquidCrystal-Bold.otf'); } 

.timer {
	font-weight: bold;
	font-family: 'Aldrich', sans-serif;
	/* font-family: 'Digital' */
}
</style>
