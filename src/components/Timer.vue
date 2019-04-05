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

		<alarm-modal :time="timeToRestart" id="alarmModal" @pause-sound="pauseSound" />

	</div>
</template>

<script>
	import AlarmModal from './AlarmModal.vue';
	import { store } from '../store.js'
	import { mixin } from '../mixin.js'

	import tools from '../tools.js';
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
				if (this.state.settings.onZeroAction == 0) {
					this.stopTimer();
				}
				else if (this.state.settings.onZeroAction == "restart") {
					this.resetTimer();
					this.startTimer();
				}
				else if (this.state.settings.onZeroAction == "restart2") {
					this.resetTimer();
					this.intervalRestart = timer.createTimer(this.timeToRestart, this.startTimer)
				}
			},

			positionComponent() {
				this.$el.style.marginTop = (document.documentElement.clientHeight/2 - 
					this.$el.clientHeight/2)+"px"
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
			'state.timeRestartAfter':{
				handler: function () {
					tools.copyObjectProperties(this.state.timeRestartAfter, this.timeToRestart);
				},
				deep: true
			},
			'state.settings.fontSize':{
				handler: function (newValue, oldValue) {
					this.$refs.timer.style.fontSize = this.state.settings.fontSize+"px";
					this.positionComponent();
				}
			},
			'state.settings.fontColor':{
				handler: function (newValue, oldValue) {
					this.$refs.timer.style.color = newValue;
				}
			},
			'state.settings.backgroundColor':{
				handler: function (newValue, oldValue) {
					document.body.style.backgroundImage = "";
					document.body.style.backgroundColor = newValue;
				}
			}
		},

		mounted: function() {
			tools.copyObjectProperties(this.state.timeSet, this.time);
			tools.copyObjectProperties(this.state.timeRestartAfter, this.timeToRestart);

			this.$refs.timer.style.color = this.state.settings.fontColor;
			document.body.style.backgroundColor = this.state.settings.backgroundColor;
			this.$refs.timer.style.fontSize = this.state.settings.fontSize+"px";
			this.positionComponent();

			sound.initSound();

			window.addEventListener('resize', this.positionComponent);
		}
	}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat');
@import url('https://fonts.googleapis.com/css?family=Aldrich');
@font-face { font-family: Digital; src: url('../assets/LiquidCrystal-Bold.otf'); } 

.timer {
	/* font-family: 'Montserrat', sans-serif; */
	font-weight: bold;
	font-family: 'Aldrich', sans-serif;
	/* font-family: 'Digital' */
}
</style>
