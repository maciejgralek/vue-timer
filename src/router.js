import Vue from 'vue'
import Router from 'vue-router'
import TimerContainer from './components/TimerContainer.vue';
import AlarmContainer from './components/AlarmContainer.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/timer',
      name: 'timer-container',
      component: TimerContainer
    },
    {
      path: '/alarm',
      name: 'alarm-container',
      component: AlarmContainer
    },
    {
      path: '/',
      name: 'default',
      component: AlarmContainer
    },
  ]
})
