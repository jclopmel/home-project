import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		appModules:[
			{"icon": "mdi-food-apple",
			"path": "/fridge"
			},
			{"icon": "mdi-water",
			"path": "/water"
			},
			{"icon": "mdi-flash",
			"path": "/electricity"
			},
			{"icon": "mdi-lock",
			"path": "/security"
			}
		],
		productsInStorage: [
			{ id:"01", product: 'Apples', quantity: 4 },
			{ id:"02", product: 'Milk', quantity: 2 },
			{ id:"03", product: 'Butter', quantity: 0 },
		],
	},
	mutations:{
		addProduct(state, id){
			let p = state.productsInStorage.findIndex((e)=>{return e.id == id})
			state.productsInStorage[p].quantity++;
		},
		takeOffProduct(state, id){
			let p = state.productsInStorage.findIndex((e)=>{return e.id == id})
			if(state.productsInStorage[p].quantity > 0){
				state.productsInStorage[p].quantity--;
			}
		}
	}
});

export default store;