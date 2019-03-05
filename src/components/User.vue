<template>
	<div>
		<ul class="nav nav-tabs">
			<li class="nav-item">
				<a class="nav-link active" href="#">Active</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="#">Link</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="#">Link</a>
			</li>
			<li class="nav-item">
				<a class="nav-link disabled" href="#">Disabled</a>
			</li>
		</ul>
		<div class="user border d-flex flex-column justify-content-center align-items-center">
			<div class="w-75" v-if="state.selectedUser">
				component user
				<div class="row justify-content-around">
					<div class="col-2">
						First name
					</div>
					<div class="col-4">
						{{ state.selectedUser.first_name }}
					</div>
					<div class="col-2">
						Last name
					</div>
					<div class="col-4">
						{{ state.selectedUser.last_name }}
					</div>
				</div>
				<div class="row pt-3 justify-content-around">
					<div class="col-2">
						email 					</div>
					<div class="col-4">
						{{ state.selectedUser.email }}
					</div>
					<div class="col-2">
						IP address 
					</div>
					<div class="col-4">
						{{ state.selectedUser.ip_address }}
					</div>
				</div>
				<div class="row pt-3 justify-content-around">
					<div class="col-4">
						IP address {{ state.selectedUser.ip_address }}
					</div>
					<div class="col-4">
						email {{ state.selectedUser.email }}
					</div>
					<div class="col-4">
						IP address {{ state.selectedUser.ip_address }}
					</div>
				</div>
			</div>
		</div>
	</div> 
</template>

<script>
	import { store } from '../store.js';

	export default {
		data: function() {
			return {
				state: store.state
			}
		},

		filters: {

		},
		computed: {

		},
		methods: {

		},
		mounted: function() {

		}
	}
</script>

<style>
.border {
	border: 1px solid;
}

.user {
	height: 30em;
}
</style>
