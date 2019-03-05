<template>
  <div>
		<div class="user">
			component users
			<table class="table">
				<tr v-for="user in state.users">
					<td>
						<a href="#" @click.prevent="userSelect(user)">{{ user.first_name }}</a>
					</td>
				</tr>
				<tr>
					<td></td>
				</tr>
			</table>
		</div>
	</div> 
</template>

<script>
	import { store } from '../store.js'

	export default {
		data() {
			return {
				state: store.state
			}
		},

		filters: {
		},

		computed: {
		},

		methods: {
			userSelect(user) {
				// this.$emit('userselect', user);
				this.state.selectedUser = user;
			}
		},

		mounted: function() {
			this.$http.get("http://localhost:3000/users")
				.then(response => {
					this.state.users = response.data;
				});
		}
	}
</script>

<style>

</style>
