<template>
	<div>
		<div class="container-fluid">

			<div class="row">
				<div class="col-12 d-flex">
					<div class="mx-auto">
						<alarm-timer>
						</alarm-timer>
					</div>
				</div>
			</div>

			<div class="row mt-4 justify-content-center">
				<div class="col-lg-6">
					<div class="d-flex align-items-center justify-content-center">
						<transition name="fade">
						<settings-alarm v-show="state.showSettings" class="w-100"></settings-alarm>
						</transition>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	import AlarmTimer from './AlarmTimer.vue';
	import SettingsAlarm from './SettingsAlarm.vue';
	import { store } from '../store.js'
	import { mixin } from '../mixin.js'

	import { ui } from '../ui.js';
	import $ from 'jquery';

	export default {
		components: {
			AlarmTimer,
			SettingsAlarm
		},

		data() {
			return {
				state: store.state
			}
		}
	}
</script>

<style>

</style>
