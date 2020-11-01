<template>
	<div>
		<div class="container-fluid">

			<div class="row">
				<div class="col-12 d-flex">
					<div class="mx-auto">
						<timer>
						</timer>
					</div>
				</div>
			</div>

			<div class="row mt-4 justify-content-center">
				<div class="col-lg-6">
					<div class="d-flex align-items-center justify-content-center">
						<transition name="fade">
						<settings v-show="state.showSettings" class="w-100"></settings>
						</transition>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	import Timer from './Timer.vue';
	import Settings from './Settings.vue';
	import { store } from '../store.js'
	import { mixin } from '../mixin.js'

	import { ui } from '../ui.js';
	import $ from 'jquery';

	export default {
		components: {
			Timer,
			Settings
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
