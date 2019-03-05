<template>

	<div>
<nav class="nav">
					Navbar
					<div class="dropdown"style="justify-self: end">
						<button class="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							Dropdown button
						</button>
						<div class="dropdown-menu">
							<form class="px-4 py-3">
								<div class="form-group">
									<label for="exampleDropdownFormEmail1">Email address</label>
									<input type="text" class="form-control" id="" placeholder="Username" v-model="user.email" >
								</div>
								<div class="form-group">
									<label for="exampleDropdownFormPassword1">Password</label>
									<input type="password" class="form-control" id="" placeholder="Password" v-model="user.password" >
								</div>
								<div class="form-check">
									<input type="checkbox" class="form-check-input" id="dropdownCheck">
									<label class="form-check-label" for="dropdownCheck">
										Remember me
									</label>
								</div>
								<button type="submit" class="btn btn-primary" @click.prevent="submitLogin">Sign in</button>
							</form>
							<div class="dropdown-divider"></div>
								<a class="dropdown-item" href="#">New around here? Sign up</a>
								<a class="dropdown-item" href="#">Forgot password?</a>
							</div>
					</div>
					<router-link to="/users/user">Go to Foo</router-link>
					<router-link to="/">Go to Bar</router-link>
					<div class="search">
						<input class="form-control" placeholder="Search" aria-label="Search">
						<button class="btn btn-sm btn-outline-success" type="submit">Search</button>
					</div>
			</nav>
			</div>
</template>

<script>
	export default {
data: function() {
		return {
			user: {
				email: "fasd@fds.fadsf",
				password: ""
			}
		};
	},

	computed: {
	},

	methods:{
		submitLogin() {
			this.$emit("login-submit", this.user);
		}
	},

	mounted: function() {
	}
	}
</script>

<style>
.dropdown {
	margin-left: auto;
}
</style>
