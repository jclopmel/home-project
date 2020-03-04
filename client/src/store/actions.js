import axios from 'axios'
export default{
	getCollection(commit, collection){		// Collect data from DB by collection name
		axios({
			method: 'get',
			url: 'http://localhost:5000/api/posts',
			params: {
				collection: collection
			}
		})
		.then((res) => {
			this.commit('setProductsInStorage', res.data)
		})
		.catch((err) => {
			console.log(err)
		})			

	},
	addToCollection({state, dispatch, commit}, payload){					// Add data to DB by ID and collection
		dispatch("onlineStatusVerify")
		.finally(function(){

			if(!state.onlineStatus){
				console.log("Check Internet Connection")

			}else{
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
					commit('newProduct', payload.obj)
				})
				.catch((err) => {
					console.log(err)
				})
			}
		})
	},
	deleteFromCollection({state, dispatch, commit}, payload){					// Delete data from DB by ID and collection

		dispatch("onlineStatusVerify")
		.finally(function(){

			if(!state.onlineStatus){
				console.log("Check Internet Connection")

			}else{
				axios({
					method: 'delete',
					url: 'http://localhost:5000/api/posts',
					params: {
						collection: payload.collection,
						id: payload.id
					}
				})
				.then(() => {
					commit('deleteProduct', payload.id)
				})
				.catch((err) => {
					console.log(err)
				})
			}
		})
	},
	modifyFromCollection({state, dispatch}, payload){				// Modify DB by ID and collection
		
		dispatch("onlineStatusVerify")
		.finally(function(){

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

		})
		
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

	},
	onlineStatusVerify({commit}){				//Checks an online status connection by an axios request
		axios({
			method: 'get',
			url: 'https://www.zartis.com/'
		})
		.then(() => {
			commit("setOnlineStatus", true)
		})
		.catch(() => {
			commit("setOnlineStatus", false)
		})
	}
}