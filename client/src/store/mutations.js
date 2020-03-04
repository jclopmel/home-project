export default{
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
	deleteProduct(state, data){					// Commit to delete a product from State by id
		state.productsInStorage = state.productsInStorage.filter(e => e.id != data);
	},
	newProduct(state, data){					// Commit to add new product
		state.productsInStorage.push(data);
	}
}