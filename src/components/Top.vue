<template>
<div>
	<section class="hero is-primary is-bold">
		<div class="hero-body">
			<div class="container">
				<Stats class="float is-hidden-touch"></Stats>
				<!--<img src="/static/logo.png" width="128px" height="128px">-->
				<h1 class="title">
					My Projects
				</h1>
				<h2 class="subtitle">
					The public ones anyway!
				</h2>
			</div>
		</div>
	</section>
	</div>
</template>
<script>
import Stats from '@/components/Stats'
export default {
	components: {
		Stats
	}
}
</script>
