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
				<!-- <div class="timer&#45;alarm"> -->
				<!-- 	Alarm  -->
				<!-- </div> -->
				<span>
					ALARM 
					<transition name="fade" mode="out-in">
						<span key="alarm-on" v-if="state.alarmActive">ON</span>
						<span key="alarm-off" v-else>OFF</span>
					</transition>
					<span class="ml-5">
						{{ state.timerAlarm.hours | formatTimer(state.settings.is24hours) | addZero }} : 
						{{ state.timerAlarm.minutes | addZero }} : 
						{{ state.timerAlarm.seconds | addZero }}
					</span>
				</span>
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
				if (state.alarmActive) {
					sound.play(this.state.settings.soundIndex, this.state.settings.soundRepeat);
					$('#alarmModal').modal('show');
				}
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

.btn-green-light {
	background-color: greenyellow !important;
	border-color: palegreen !important;
}

.timer {
	font-weight: bold;
	font-family: 'Aldrich', sans-serif;
	text-shadow: 2px 3px 4px rgba(71, 71, 71, 0.5)
	/* font-family: 'Digital' */
}
.timer-alarm {
	font-family: 'Arial', sans-serif;
	/* font-family: 'Digital' */
}
</style>
