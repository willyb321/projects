<template>
	<div id="app">
		<router-view></router-view>
		<router-view name="project"></router-view>
	</div>
</template>

<script>
	export default {
		name: 'app'
	}
</script>
<style lang="sass" src="./styles/styles.sass"></style>
<style src="@/assets/fa/css/font-awesome.css"></style>
