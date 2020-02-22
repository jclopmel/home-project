import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home';
import Fridge from '@/views/Fridge';
import Water from '@/views/Water';
import Electricity from '@/views/Electricity';
import Security from '@/views/Security';

Vue.use(Router)

export default new Router({
  routes:[{
	      path: "/",
	      name: "Home",
	      component: Home
  		},
  		{
	      path: "/fridge",
	      name: "Fridge",
	      component: Fridge
  		},
  		{
	      path: "/water",
	      name: "Water",
	      component: Water
  		},
  		{
	      path: "/electricity",
	      name: "Electricity",
	      component: Electricity
  		},
  		{
	      path: "/security",
	      name: "Security",
	      component: Security
  		}
    ]
});
