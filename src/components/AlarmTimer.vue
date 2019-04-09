<template>
	<div>
		<div ref="timer" class="timer text-center" >
			{{ time.hours | formatTimer(state.settings.is24hours) }} : 
			{{ time.minutes | addZero }} : {{ time.seconds | addZero }}
			<small v-if="!state.settings.is24hours"> PM</small>
			<div style="font-size: 0.5em; font-weight: normal">
				<div class="timer-alarm">
					Alarm 
				</div>
				<span>
					{{ state.timerAlarm.hours | formatTimer(state.settings.is24hours)}} : 
					{{ state.timerAlarm.minutes | addZero }} : 
					{{ state.timerAlarm.seconds | addZero }}</span>
				<small v-if="!state.settings.is24hours"> PM</small>
			</div>
		</div>
		<div class="d-flex justify-content-center">
			<button 
				 type="button" 
				 class="btn btn-secondary" 
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
					seconds: 0,
					format: null
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
			},

			formatTimer(value, format) {
				if (!format) {
					let hours = value % 12;
					hours = hours ? hours : 12;
					return hours;
				}
				return value;
			}
		},

		methods: {
			alarm() {
				sound.play(this.state.settings.soundIndex, this.state.settings.soundRepeat);
				$('#alarmModal').modal('show');
			},
			
			pauseSound() {
				sound.pause(this.state.settings.soundIndex);
			}
		},

		watch: {
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
			timer.createClock(this.time, this.state.timerAlarm, this.alarm);
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
.timer-alarm {
	font-family: 'Arial', sans-serif;
	/* font-family: 'Digital' */
}
</style>
