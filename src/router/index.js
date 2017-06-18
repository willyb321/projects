import Vue from 'vue';
import Router from 'vue-router';
import Top from '@/components/Top'
import Project from '@/components/Project'
import VueResource from 'vue-resource'

Vue.use(VueResource);
Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'Top',
			components: {
				default: Top,
				project: Project
			}
		}
	]
});
