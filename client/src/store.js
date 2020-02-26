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
		onlineStatus: true,
		newName: "",
		newQuantity: 0,
		newIcon: "",
		Icons: [
	        'mdi-food-apple',
	        'mdi-fruit-pineapple',
	        'mdi-cup-water',
	        'mdi-pizza',
	        'mdi-noodles'
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
			
		},
		setProductsInStorage(state, data){
			state.productsInStorage = data;
		},
		setOnlineStatus(state, data){
			state.onlineStatus = data;
		},
		setNewName(state, data){
			state.newName = data;
		},
		setNewQuantity(state, data){
			state.newQuantity = data;
		},
		setNewIcon(state, data){
			state.newIcon = data;
		}
	},
	actions:{
		getCollection(commit, collection){
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
			})
			.catch((err) => {
				console.log(err)
			})			

		},
		addToCollection(payload){
			axios({
				method: 'post',
				url: 'http://localhost:5000/api/posts',
				params: {
					action: 'add',
					collection: payload.collection,
					obj: payload.obj
				}
			})
			.then((res) => {
				console.log(res.data)
			})
			.catch((err) => {
				console.log(err)
			})
		},
		deleteFromCollection(payload){
			axios({
				method: 'delete',
				url: 'http://localhost:5000/api/posts',
				params: {
					collection: payload.collection,
					id: payload.id
				}
			})
			.then((res) => {
				console.log(res.data)
			})
			.catch((err) => {
				console.log(err)
			})
		},
		modifyFromCollection({state}, payload){
			if(!state.onlineStatus){
				localStorage.setItem( payload.obj.id, JSON.stringify(payload.obj) )

			}else{
				axios({
					method: 'post',
					url: 'http://localhost:5000/api/posts',
					params: {
						action: 'modify',
						collection: payload.collection,
						val: payload.obj
					}
				})
				.then((res) => {
					console.log(res.data)
				})
				.catch((err) => {
					console.log(err)
				})
			}

			
		},
		checkCorrectObject(payload){
			let t1 = Object.values(payload);
			let t2 = t1.findIndex((e) => {return e == undefined})
			return t2 < 0;
		},
		checkOfflineChanges({dispatch}, payload){
			let changes = [];

			if( Object.values(localStorage).length > 0 ){
				changes = Object.values(localStorage).map((e)=>{
					return JSON.parse(e);
				})

				changes.forEach((e)=>{
					let obj = {
						collection: payload,
						obj: e
					}
					dispatch("modifyFromCollection", obj)
				})

				localStorage.clear()

				
			}


		}
	}
});

export default store;