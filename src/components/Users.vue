<template>
	<div>
		users component
		<div class="row">
			<div class="col-2">
				<UsersList @userselect="userSelect"></UsersList>
			</div>
			<div class="col-10">
				<div class="row">
					<div class="col">
						<!-- <navside></navside> -->
					</div>
				</div>
				<div class="row">
					<div class="col">
						<user></user>
						<!-- <router&#45;view></router&#45;view> -->
					</div>
				</div>
			</div>
		</div>
	</div> 
</template>

<script>
	import UsersList from './UsersList.vue'
	import User from './User.vue'
	import { store } from '../store.js'

	export default {
		components: {
			UsersList,
			User
		},
		data: function() {
			return {
			}
		},

		filters: {

		},
		computed: {

		},
		methods: {
			userSelect(user) {
				console.log(JSON.stringify(user))
			}
		},
		mounted: function() {
			// axios.get("https://my.api.mockaroo.com/users.json?key=df8e1110")
			// 	.then(response => this.users = response.data);
			// console.log(this.store.debug)
		}
	}
</script>

<style>

</style>
