<template>
	<div id="settings" class="shadow-lg">

		<!-- row time -->

		<div class="form-group row">
			<div class="col-3">
				<label for="inputState" class="col-form-label">
					Timer
				</label>
			</div>
			<div class="col">
				<select 
					 v-model="state.timeSet.hours" 
					 id="inputState" 
					 class="form-control">
					<option value="0" selected>00</option>
					<option value="1" selected>01</option>
				</select>
				<small>Hours</small>
			</div>
			<div class="col">
				<select 
					 v-model="state.timeSet.minutes" 
					 id="inputState" 
					 class="form-control">
					<option value="0">00</option>
					<option v-for="i in 59" :value="i"> {{ i | addZero }} </option>
				</select>
				<small>Minutes</small>
			</div>
			<div class="col">
				<select 
					 v-model="state.timeSet.seconds" 
					 id="inputState" 
					 class="form-control">
					<option value="0" selected>00</option>
					<option v-for="i in 59" :value="i"> {{ i | addZero }} </option>
				</select>
				<small>Seconds</small>
			</div>
		</div>

		<hr>

		<!-- row sound -->

		<div class="form-group row">
			<div class="col-3">
				<label for="inputState" class="col-form-label">
					Sound
				</label>
			</div>
			<div class="col-4">
				<select 
					 id="inputState" 
					 class="form-control" 
					 v-model="state.settings.soundIndex">
					<option v-for="(sound, index) in sounds" :value="index"> {{ sound }} </option>
				</select>
			</div>
			<div class="col">
				<select class="form-control" v-model="state.settings.soundRepeat">
					<option value="1"> 1 </option>
					<option value="3"> Repeat 3 </option>
					<option value="5"> Repeat 5 </option>
					<option value="0"> Loop </option>
				</select>
			</div>
			<div class="col">
				<button class="btn btn-primary" @click="playSound">&#9654;</button>
			</div>

		</div>

		<!-- row on zero -->

		<div class="form-group row">
			<div class="col-3">
				<label for="inputState" class="col-form-label pt-0">
					On zero
				</label>
			</div>
			<div class="col-8">
					<div class="custom-control custom-radio">
						<input class="custom-control-input" type="radio" id="radio1" value="0" v-model="state.settings.onZeroAction">
						<label class="custom-control-label" for="radio1">
							Do nothing
						</label>
					</div>
					<div class="custom-control custom-radio">
						<input class="custom-control-input" type="radio" id="radio2" value="restart" v-model="state.settings.onZeroAction">
						<label class="custom-control-label" for="radio2">
							Restart
						</label>
					</div>
					<div class="custom-control custom-radio">
						<input class="custom-control-input" type="radio" id="radio3" value="restart2" v-model="state.settings.onZeroAction">
						<label class="custom-control-label" for="radio3">
							Restart after...
						</label>
					</div>

				<!-- restart after -->

				<transition name="fade">
				<div class="row mt-3" v-if="state.settings.onZeroAction == 'restart2'">
					<div class="col">
						<select 
							 v-model="state.timeRestartAfter.hours" 
							 id="inputState" 
							 class="form-control">
							<option value="0" selected>00</option>
							<option value="1" selected>01</option>
						</select>
						<small>Hours</small>
					</div>
					<div class="col">
						<select 
							 v-model="state.timeRestartAfter.minutes" 
							 id="inputState" 
							 class="form-control">
							<option value="0">00</option>
							<option v-for="i in 59" :value="i"> {{ i | addZero }} </option>
						</select>
						<small>Minutes</small>
					</div>
					<div class="col">
						<select 
							 v-model="state.timeRestartAfter.seconds" 
							 id="inputState" 
							 class="form-control">
							<option value="0" selected>00</option>
							<option v-for="i in 59" :value="i"> {{ i | addZero }} </option>
						</select>
						<small>Seconds</small>
					</div>
				</div>
				</transition>

				<!-- restart after -->

			</div>
		</div>

		<!-- row image -->

		<!-- <div class="form&#45;group row"> --><!--{{{-->
		<!-- 	<div class="col&#45;4"> -->
		<!-- 		<label for="inputState" class="col&#45;form&#45;label"> -->
		<!-- 			Background image -->
		<!-- 		</label> -->
		<!-- 	</div> -->
		<!-- 	<div class="col&#45;8" @click="setColorBg($event)"> -->
		<!-- 		<button type="button" class="btn btn&#45;secondary" data&#45;toggle="modal" data&#45;target="#exampleModal"> -->
		<!-- 			Select image -->
		<!-- 		</button> -->
		<!-- 	</div> -->
		<!-- </div> -->

		<!-- row font -->

		<!-- <div> -->
		<!-- 	<div class="form&#45;group row"> -->
		<!-- 		<div class="col&#45;3"> -->
		<!-- 			Font -->
		<!-- 		</div> -->
		<!-- 		<div class="col&#45;8"> -->
		<!-- 			<div class="form&#45;check"> -->
		<!-- 				<input class="form&#45;check&#45;input" type="checkbox" value="" id="defaultCheck1"> -->
		<!-- 				<label class="form&#45;check&#45;label" for="defaultCheck1"> -->
		<!-- 					Digital font -->
		<!-- 				</label> -->
		<!-- 			</div> -->
		<!-- 		</div> -->
		<!-- 	</div> -->
    <!--  -->
		<!-- </div> -->
    <!--  -->
		<!-- <!&#45;&#45; modal &#45;&#45;> -->
    <!--  --><!--}}}-->
		<!-- <div class="modal fade" id="exampleModal" tabindex="&#45;1" role="dialog" aria&#45;labelledby="exampleModalLabel" aria&#45;hidden="true"><!&#45;&#45;  &#45;&#45;> --><!--{{{-->
		<!-- 	<div class="modal&#45;dialog modal&#45;dialog&#45;centered" role="document"> -->
		<!-- 		<div class="modal&#45;content"> -->
		<!-- 			<div class="modal&#45;header"> -->
		<!-- 				<button type="button" class="close" data&#45;dismiss="modal" aria&#45;label="Close"> -->
		<!-- 					<span aria&#45;hidden="true">&#38;times;</span> -->
		<!-- 				</button> -->
		<!-- 			</div> -->
		<!-- 			<div class="modal&#45;body" @click="setBackgroundImage($event)"> -->
		<!-- 				<img data&#45;image&#45;name="mountains.jpg" src="../assets/mountains&#45;thumbnail.jpg" class="p&#45;1"> -->
		<!-- 				<img data&#45;image&#45;name="windfarm.jpg" src="../assets/windfarm&#45;thumbnail.jpg" class="p&#45;1"> -->
		<!-- 				<img data&#45;image&#45;name="landscape.jpg" src="../assets/landscape&#45;thumbnail.jpg" class="p&#45;1"> -->
		<!-- 			</div> -->
		<!-- 			<div class="modal&#45;footer"> -->
		<!-- 				<button type="button" class="btn btn&#45;secondary" data&#45;dismiss="modal">Close</button> -->
		<!-- 			</div> -->
		<!-- 		</div> -->
		<!-- 	</div> -->
		<!-- </div><!&#45;&#45;  &#45;&#45;> --><!--}}}-->

	</div>
</template>

<script>
	import { store } from '../store'
	import { mixin } from '../mixin.js';
	import { sound } from '../sound.js';
	import { cookie } from '../cookie.js';

	export default {
		mixins: [mixin],

		components: {

		},

		data() {
			return {
				state: store.state,
				sounds: [],
				showAdvanced: false
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

		watch: {
			'state.settings.soundIndex': function () {
				sound.currentSound = this.state.settings.soundIndex;
			}
		},

		updated: function() {
			cookie.setCookie(this.state);
		},

		methods: {
			setBackgroundColor(e) {
				let color = e.target.dataset.color;
				this.state.settings.backgroundColor = color;
			},

			setFontColor(e) {
				let color = e.target.dataset.color;
				this.state.settings.fontColor = color;
			},

			setFontSize(e) {
				this.state.settingsFontSize = e.target.value;

			},

			setSize(value) {
				this.state.settings.fontSize += value;
			},

			setBackgroundImage(e) {
				let imageName = e.target.dataset.imageName;
				document.body.style.backgroundSize = "100% 100%";
				document.body.style.backgroundAttachment = "fixed";
				document.body.style.backgroundImage = 
					"url(" + require("../assets/" + imageName) +")"
			},

			playSound() {
				sound.play(this.state.settings.soundIndex, this.state.settings.soundRepeat);
			}
		},

		mounted: function() {
			store.config.sounds.forEach((item, index) => {
				this.$set(this.sounds, index, item);
			})
		}
	}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat');
@import url('https://fonts.googleapis.com/css?family=Aldrich');

.dot {
	height: 25px;
	width: 25px;
	background-color: #bbb;
	border-radius: 50%;
	display: inline-block;
	-webkit-box-shadow: 1px 2px 5px 0px rgba(0,0,0,0.3); 
	box-shadow: 1px 2px 5px 0px rgba(0,0,0,0.3);
}
.dot:hover {
	height: 25px;
	width: 25px;
	border-radius: 50%;
	display: inline-block;
	cursor: pointer;
}
.dot-gold {
	background-color: gold;
}
.dot-lightgreen {
	background-color: lightgreen;
}
.dot-lightblue {
	background-color: lightblue;
}
.dot-light {
	background-color: white;
}
.dot-dark {
	background-color: black;
}
.dot-gray {
	background-color: gray;
}
#settings {
	background-color: rgba(255,255,255,0.9);
	padding-right: 2em;
	padding-left: 2em;
	padding-bottom: 2em;
	padding-top: 3em;
	border-radius: 5px;
}
.bg-red {
	background-color: red;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .20s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
