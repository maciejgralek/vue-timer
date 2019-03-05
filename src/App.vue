<template>
	<div id="app">
		<navbar @login-submit="login"></navbar>
		<button @click="test">Test</button>
		<div class="container-fluid">
			<router-view></router-view>
		</div> 
	</div>
</template>

<script>
	import Navbar from './components/Navbar.vue';

	export default {
		components: {
			Navbar
		}
	}
</script>

<style>

</style>
