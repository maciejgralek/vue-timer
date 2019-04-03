import Vue from 'vue'
import Router from 'vue-router'
import Timer from './components/Timer.vue';

Vue.use(Router)

// const routes = [
// 	{
// 		path: "/user", 
// 		components: {
// 			default: users,
// 			a: navside,
// 			b: user
// 		}
// 	},
// 	{
// 		path: "/users", 
// 		component: usersComponent,
// 		children: [{
// 			path: 'user',
// 			component: user
// 		}]
// 	},
// 	{
// 		path: "/item", 
// 		component: item 
// 	}
// ];

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'timer',
      component: Timer
    },
    {
      path: '/',
      name: '',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
