<template>
	<div>
		<div class="loading" v-if="loading">
			Loading...
		</div>

		<div v-if="error" class="error">
			{{ error }}
		</div>
		<div class="post">
			<div v-if="post">
				<div style="width: 25%" class="card">
					<header class="card-header">
						<p class="card-header-title">
							Some statistics from Github
						</p>
						<a class="card-header-icon">
							<span class="icon">
								<i class="fa fa-angle-down"></i>
							</span>
						</a>
					</header>
					<div class="card-content">
						<div class="content">
							<span class="tag">
								<i class="fa fa-map-marker" aria-hidden="true"> </i> {{ post.location }}</span>
							<br>
							<span class="tag">
								<i class="fa fa-question" aria-hidden="true"> </i> {{ post.bio }}</span>
							<br>
							<span class="tag">
								<i class="fa fa-github" aria-hidden="true"> </i> {{ post.public_repos }} public repos</span>
							<br>
							<span class="tag">
								<i class="fa fa-sticky-note" aria-hidden="true"> </i> {{ post.public_gists }} public gists</span>
						</div>
					</div>
				</div>
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
			this.post = require('../user.json');
			this.loading = false;
		}
	}
}
</script>
