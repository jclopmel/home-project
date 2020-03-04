// Import libraries
import Vue from 'vue'
import Vuex from 'vuex';

// Store for the Functionality
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import state from './state'

Vue.use(Vuex)

const store = new Vuex.Store({
	actions,
	getters,
	mutations,
	state
})

export default store;