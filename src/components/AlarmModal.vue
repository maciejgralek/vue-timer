<template>
	<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body text-center">
					<h2>
						Alarm
					</h2>
					<div v-if="this.state.settings.onZeroAction == 'restart2'">
						<span v-if="timeToRestart.hours"> {{ timeToRestart.hours | addZero }} : </span> 
						{{ timeToRestart.minutes | addZero }} : {{ timeToRestart.seconds | addZero }}
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-dismiss="modal" @click="$emit('pause-sound')">Close</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { store } from '../store.js'
	import { mixin } from '../mixin.js'

	import tools from '../tools.js';
	import { sound } from '../sound.js'
	import $ from 'jquery';
	import { timer } from '../timer.js'

	export default {
		mixins: [mixin],

		components: {

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
			
		},

		watch: {
			
		},

		mounted: function() {
			
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
