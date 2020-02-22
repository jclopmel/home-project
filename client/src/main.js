import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vuetify from './plugins/vuetify';
import router from './router/';
import store from './store';


//Middleware loading for Client
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
	store,
	router,
    vuetify,
    render: h => h(App)
}).$mount('#app')