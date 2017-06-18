<template>
	<div class="post">
		<div class="loading" v-if="loading">
			Loading...
		</div>

		<div v-if="error" class="error">
			{{ error }}
		</div>

		<div v-if="post">
			<div v-for="(item, index) in post" class="">
				<div class="box">
					<div class="container">
						<h1 class="title">{{ item.name }}</h1>
						<h2 v-if="item.description" class="subtitle">{{ item.description }}
							<span v-if="item.stargazers_count > 0">({{ item.stargazers_count }} 🌟)</span><br>
							<a target="_blank" :href="item.html_url">{{ item.full_name }}</a>
						</h2>
					</div>
				</div>
				<hr>
			</div>
		</div>
	</div>
</template>
<script>
import Vue from 'vue'
export default {
	data() {
		return {
			loading: false,
			post: null,
			error: null
		}
	},
	created() {
		// fetch the data when the view is created and the data is
		// already being observed
		this.fetchData()
	},
	watch: {
		// call again the method if the route changes
		'$route': 'fetchData'
	},
	methods: {
		async fetchData() {
			this.error = this.post = null;
			this.loading = true;
			// replace getPost with your data fetching util / API wrapper
			this.post = require('../projects.json');
			this.loading = false;
		}
	}
}
</script>
