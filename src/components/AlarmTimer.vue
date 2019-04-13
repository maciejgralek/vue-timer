<template>
	<div>
		<div ref="timer" class="timer text-center" >
			{{ time.hours | formatTimer(state.settings.is24hours) | addZero }} : 
			{{ time.minutes | addZero }} : 
			{{ time.seconds | addZero }}
			<small v-if="!state.settings.is24hours"> 
				PM
			</small>
			<div style="font-size: 0.5em; font-weight: normal">
				<div class="timer-alarm">
					Alarm 
				</div>
				<span>
					{{ state.timerAlarm.hours | formatTimer(state.settings.is24hours) | addZero }} : 
					{{ state.timerAlarm.minutes | addZero }} : 
					{{ state.timerAlarm.seconds | addZero }}</span>
				<small v-if="!state.settings.is24hours">
					PM
				</small>
			</div>
		</div>
		<div class="d-flex justify-content-center">
			<div class="btn-group" role="group" aria-label="Basic example">
				<button 
				 type="button" 
				 class="btn btn-secondary active mt-4 d-flex" 
				 :class="{ 'btn-success': state.alarmActive }"
				 @click.prevent="state.alarmActive = !state.alarmActive">
				 	<img src="../assets/power-off-solid.svg" alt="" width="20">
			</button>
			<button 
				 type="button" 
				 class="btn btn-secondary mt-4" 
				 @click.prevent="state.showSettings = !state.showSettings">
				Settings
			</button>
			</div>
		</div>

		<alarm-modal 
				 :time="timeToRestart"
				 id="alarmModal" 
				 @pause-sound="stopAlarm" />

	</div>
</template>

<script>
	import AlarmModal from './AlarmModal.vue'
	import { mixin } from '../mixin.js'
	import { store } from '../store.js'

	import tools from '../tools.js'
	import { ui } from '../ui.js'
	import { sound } from '../sound.js'
	import { timer } from '../timer.js'
	import $ from 'jquery';

	export default {
		mixins: [mixin],

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
					seconds: 0,
				},
				interval: null,
				intervalRestart: null,
				state: store.state
			}
		},

		methods: {
			alarm() {
				sound.play(this.state.settings.soundIndex, this.state.settings.soundRepeat);
				$('#alarmModal').modal('show');
			},
			
			stopAlarm() {
				sound.pause(this.state.settings.soundIndex);
				this.state.timerAlarm.enabled = false;
			},

			pauseSound() {
				sound.pause(this.state.settings.soundIndex);
			},

			addRecent() {
				for (let recentItem of this.state.recentAlarm) {
					if (recentItem.hours == this.state.timeSet.hours &&
						recentItem.minutes == this.state.timeSet.minutes &&
						recentItem.seconds == this.state.timeSet.seconds)
						return;
				}
				let index = this.state.recentAlarm.length;
				if (index > 2) {
					this.state.recentAlarm.shift();
					index = 2;
				}
				let time = {
					hours: this.$options.filters.addZero(this.state.timeSet.hours),
					minutes: this.$options.filters.addZero(this.state.timeSet.minutes),
					seconds: this.$options.filters.addZero(this.state.timeSet.seconds)
				} 
				this.$set(this.state.recent, index, time);
			}
		},

		mounted: function() {
			ui.setForegroundColor(this.$refs.timer, this.state.settings.fontColor);
			ui.setBackgroundColor(document.body, this.state.settings.backgroundColor);
			ui.setFontSize(this.$refs.timer, this.state.settings.fontSize);
			ui.centerElementVertically(this.$el);
			sound.initSound();

			this.interval = timer.createClock(this.time, this.state.timerAlarm, this.alarm);
			this.state.timerAlarm.enabled = true;

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
.timer-alarm {
	font-family: 'Arial', sans-serif;
	/* font-family: 'Digital' */
}
</style>
