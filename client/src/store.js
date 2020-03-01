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
		addProduct(state, id){						// Adds one to product by ID
			let p = state.productsInStorage.findIndex((e)=>{return e.id == id})
			state.productsInStorage[p].quantity++;

		},
		takeOffProduct(state, id){					// takes Off one from product by ID
			let p = state.productsInStorage.findIndex((e)=>{return e.id == id})
			if(state.productsInStorage[p].quantity > 0){
				state.productsInStorage[p].quantity--;
			}
			
		},
		setProductsInStorage(state, data){
			state.productsInStorage = data;
		},
		setOnlineStatus(state, data){				// Commit for onlineStatus State
			state.onlineStatus = data;
		},
		setNewName(state, data){					// Commit for newName State
			state.newName = data;
		},
		setNewQuantity(state, data){				// Commit for newQuantity State
			state.newQuantity = data;
		},
		setNewIcon(state, data){					// Commit for newIcon State
			state.newIcon = data;
		},
		deleteProduct(state, data){
			state.productsInStorage = state.productsInStorage.filter(e => e.id != data);
		},
		newProduct(state, data){
			state.productsInStorage.push(data);
		}
	},
	actions:{
		getCollection(commit, collection){		// Collect data from DB by collection name
			let _vue = this
			axios({
				method: 'get',
				url: 'http://localhost:5000/api/posts',
				params: {
					collection: collection
				}
			})
			.then((res) => {
				_vue.commit('setProductsInStorage', res.data)
			})
			.catch((err) => {
				console.log(err)
			})			

		},
		addToCollection({state}, payload){					// Add data to DB by ID and collection
			if(!state.onlineStatus){
				console.log("Check Internet Connection")

			}else{
				let _vue = this;
				axios({
					method: 'post',
					url: 'http://localhost:5000/api/posts',
					params: {
						action: 'add',
						collection: payload.collection,
						val: payload.obj
					}
				})
				.then((res) => {
					console.log(res.data)
					payload.obj['id'] = res.data.insertedId;
					_vue.commit('newProduct', payload.obj)
				})
				.catch((err) => {
					console.log(err)
				})
			}
		},
		deleteFromCollection({state, commit}, payload){					// Delete data from DB by ID and collection
			if(!state.onlineStatus){
				console.log("Check Internet Connection")

			}else{
				let _vue = this;
				axios({
					method: 'delete',
					url: 'http://localhost:5000/api/posts',
					params: {
						collection: payload.collection,
						id: payload.id
					}
				})
				.then((res) => {
					_vue.commit('deleteProduct', payload.id)
				})
				.catch((err) => {
					console.log(err)
				})
			}
		},
		modifyFromCollection({state}, payload){				// Modify DB by ID and collection
			console.log(payload, state.onlineStatus)
			if(!state.onlineStatus){
				localStorage.setItem( payload.obj.id, JSON.stringify(payload.obj) )

			}else{
				// axios({
				// 	method: 'post',
				// 	url: 'http://localhost:5000/api/posts',
				// 	params: {
				// 		action: 'modify',
				// 		collection: payload.collection,
				// 		val: payload.obj
				// 	}
				// })
				// .then((res) => {
				// 	console.log(res.data)
				// })
				// .catch((err) => {
				// 	console.log(err)
				// })
			}
			
		},
		checkCorrectObject(payload){					// Chech if undefined values in object
			let t1 = Object.values(payload);
			let t2 = t1.findIndex((e) => {return e == undefined})
			return t2 < 0;
		},
		checkOfflineChanges({dispatch}, payload){		// If items in localStorage, set the changes in DB and clear them by ID
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
					.then(()=>{
						localStorage.removeItem(e.id)
					})
				})
				
			}

		}
	}
});

export default store;