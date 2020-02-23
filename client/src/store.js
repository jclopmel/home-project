import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

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
		productsInStorage: [],
	},
	mutations:{
		addProduct(state, id){
			let p = state.productsInStorage.findIndex((e)=>{return e._id == id})
			state.productsInStorage[p].quantity++;
		},
		takeOffProduct(state, id){
			let p = state.productsInStorage.findIndex((e)=>{return e._id == id})
			if(state.productsInStorage[p].quantity > 0){
				state.productsInStorage[p].quantity--;
			}
		},
		setProductsInStorage(state, data){
			state.productsInStorage = data;
		}
	},
	actions:{
		getCollection({commit}, collection){
			let _vue = this
			axios({
				method: 'get',
				url: 'http://localhost:5000/api/posts',
				params: {
					collection: collection
				}
			})
			.then((res) => {
				console.log(res)
				_vue.commit('setProductsInStorage', res.data)
				console.log(res.data)
			})
			.catch((err) => {
				console.log(err)
			})			

		},
		addToCollection(collection, obj){
			axios({
				method: 'post',
				url: 'http://localhost:5000/api/posts',
				params: {
					action: 'add',
					collection: collection,
					obj: obj
				}
			})
			.then((res) => {
				console.log(res.data)
			})
			.catch((err) => {
				console.log(err)
			})
		},
		deleteFromCollection(collection, id){
			axios({
				method: 'delete',
				url: 'http://localhost:5000/api/posts',
				params: {
					collection: collection,
					id: id
				}
			})
			.then((res) => {
				console.log(res.data)
			})
			.catch((err) => {
				console.log(err)
			})
		},
		modifyFromCollection(collection, id, obj){
			axios({
				method: 'post',
				url: 'http://localhost:5000/api/posts',
				params: {
					action: 'modify',
					collection: collection,
					id: id,
					val: obj
				}
			})
			.then((res) => {
				console.log(res.data)
			})
			.catch((err) => {
				console.log(err)
			})
		}
	}
});

export default store;