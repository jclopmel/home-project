import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vuetify from './plugins/vuetify';

//Middleware loading for Client
Vue.use(Vuex)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
    vuetify,
    render: h => h(App)
}).$mount('#app')