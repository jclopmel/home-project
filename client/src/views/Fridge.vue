<template>
	<v-content class="pb-10">
		<v-container
			fill-height
			class="d-flex align-center justify-center"
		>
			<v-row class="align-self-start d-flex">
				<v-btn
					tile
					icon
					@click=" $router.push('/') "
				>
					<v-icon>mdi-home</v-icon>
				</v-btn>
				<v-spacer></v-spacer>
				<v-btn
					tile
					icon
					@click="openFridgeDialog = true"
				>
					<v-icon>mdi-cart</v-icon>
				</v-btn>
			</v-row>

			<v-row>
				<v-col cols="12">
					
					<div v-if="productsInStorage.length < 1">
						<v-alert
						v-if="!onlineStatus"
						class="pa-1 pa-md-3"
						type="warning"
						color="orange lighten-4">
							Lost internet connection
						</v-alert>
						<v-alert
						v-else
						class="pa-1 pa-md-3"
						type="info"
						color="blue lighten-4">
							You shall add a new product
						</v-alert>
						<div v-if="productsInStorage.length < 1" >
							<v-skeleton-loader
								v-for="i in 4"
								:key="i"
								ref="skeleton"
								type="list-item-avatar-two-line"
								tile
							></v-skeleton-loader>
						</div>
					</div>
					<v-list
					:style=" windowWidth < 960 ? 'column-count: 1; column-gap: 0rem;' : 'column-count: 2; column-gap: 8rem;'"
					v-else
					two-line>
						<v-list-item
						class="pa-0"
						v-for="(item, i) in productsInStorage"
						:key="i"
						>

							<v-list-item-avatar
							width="80"
							max-width="80">
								<v-menu bottom left>
									<template v-slot:activator="{ on }">
										<v-btn
										x-small
										icon
										v-on="on"
										>
											<v-icon class="grey--text text--darken-1">mdi-dots-vertical</v-icon>
										</v-btn>
									</template>

									<v-list>
										<v-list-item
											@click="deleteProduct(item.id)"
										>
											<v-list-item-title>Delete</v-list-item-title>
										</v-list-item>
									</v-list>
								</v-menu>
								<v-icon v-if="item.quantity > 0" class="grey--text text--darken-1">{{item.icon}}</v-icon>
								<v-icon v-else class="red--text text--lighten-2">mdi-exclamation</v-icon>
							</v-list-item-avatar>

							<v-list-item-content>
								<v-list-item-title v-text="item.name"></v-list-item-title>
								<v-list-item-subtitle v-if="item.quantity > 0">
									Still {{item.quantity}} in kitchen
								</v-list-item-subtitle>
								<v-list-item-subtitle v-else>
									No one. Need to order.
								</v-list-item-subtitle>
							</v-list-item-content>

							<v-list-item-action class="d-block">
								<v-btn
								class="less"
								icon
								@click="modifyQuantity(item.id, 'less')">
									<v-icon large color="grey--text text--darken-1">mdi-minus</v-icon>
								</v-btn>
								<v-btn
								class="more"
								icon
								@click="modifyQuantity(item.id, 'more')">
									<v-icon large color="grey--text text--darken-1">mdi-plus</v-icon>
								</v-btn>
							</v-list-item-action>
						</v-list-item>
					</v-list>
				</v-col>
			</v-row>
		</v-container>

		<!-- Dialog for product adding -->
		<v-dialog
		v-model="openFridgeDialog"
		max-width="600">

			<v-card tile>
				<v-card-title>Add a product</v-card-title>
				<v-card-subtitle>It will be orderer to your home</v-card-subtitle>
				<v-card-text>
					<v-container>
						<v-form v-model="formControl">
						<v-row>
							<v-col
							cols="12"
							>
								<v-text-field
									id="newName"
									v-model="newName"
									label="Name"
									:rules="nameRules"
									required
								></v-text-field>
							</v-col>
							<v-col
							cols="12"
							md="6"
							>
								<v-text-field
									id="newQuantity"
									v-model="newQuantity"
									label="Quantity"
									:rules="quantityRules"
									required
								></v-text-field>
							</v-col>
							<v-col
							cols="12"
							md="6"
							>
								<v-select
									id="newIcon"
									v-model="newIcon"
									:items="Icons"
									label="Icon"
									:rules="iconRules"
									required
								></v-select>

							</v-col>
						</v-row>
						</v-form>
					</v-container>

				</v-card-text>
				<v-card-actions>
					<v-btn color="grey--text text--darken-1" text @click="openFridgeDialog = false">Close</v-btn>
					<v-spacer></v-spacer>
					<v-btn
					:disabled="!formControl"
					color="grey--text text--darken-1" text @click="addProduct()">Add</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<menuBottomNavigation/>
	</v-content>
</template>

<script>
import menuBottomNavigation from '@/components/Menu_bottom_navigation';
import { mapState, mapActions } from "vuex";
export default {
	components: {
		menuBottomNavigation
	},
	data: () => ({
		windowWidth: window.innerWidth,
		openFridgeDialog: false,
		collection: 'fridge_collection',
		formControl: false,
		nameRules: [
			val => !!val || 'Enter a product, please',
			val => {
				const pattern = /^([a-zA-Z\s]+)$/
				return pattern.test(val) || 'Invalid name'
			},
		],
		quantityRules: [
			val => !!val || 'Enter a number, please',
			val => {
				const pattern = /^([0-9]+)$/
				return pattern.test(val) || 'Invalid quantity'
			},
		],
		iconRules:  [
			val => !!val || 'Select an icon, please',
		]
	}),
	computed:{
		...mapState({
			onlineStatus: 		state => state.onlineStatus,
			Icons: 				state => state.Icons,
			productsInStorage: 	state => state.productsInStorage
		}),
		/*onlineStatus(){
			return this.$store.state.onlineStatus
		},
		Icons(){
			return this.$store.state.Icons
		},
		productsInStorage(){
			return this.$store.state.productsInStorage;
		},*/
		newName: {
			get: function () {
				return this.$store.state.newName
			},
			set: function (val) {
				this.$store.commit("setNewName", val)
			}
		},
		newQuantity: {
			get: function () {
				return this.$store.state.newQuantity
			},
			set: function (val) {
				this.$store.commit("setNewQuantity", val)
			}
		},
		newIcon: {
			get: function () {
				return this.$store.state.newIcon
			},
			set: function (val) {
				this.$store.commit("setNewIcon", val)
			}
		}
	},
	methods:{
		...mapActions({
			modifyFromCollection: "modifyFromCollection",
			checkCorrectObject: "checkCorrectObject",
			addToCollection: "addToCollection",
			deleteFromCollection: "deleteFromCollection"
		}),
		modifyQuantity(id, type){
			let _vue = this;

			switch(type){
				case "more":
					_vue.$store.commit('addProduct', id)
				break;
				case "less":
					_vue.$store.commit('takeOffProduct', id)
				break;
			}

			let obj = this.productsInStorage.find((e)=>{return e.id == id})

			let payload = {
				collection: this.collection,
				obj: obj
			}

			this.checkCorrectObject(payload)
			.then((r)=>{
				if(r == true) _vue.modifyFromCollection(payload)
			})
			.catch((err)=>{
				console.log(err)
			})


		},
		addProduct(){
			let _vue = this;
			let payload = {
				collection: this.collection,
				obj: {
					"name": this.newName.toString(),
					"quantity": parseInt(this.newQuantity),
					"icon": this.newIcon.toString()
				}
			}

			this.checkCorrectObject(payload.obj)
			.then((r)=>{
				if(r == true) _vue.addToCollection(payload)
			})
			.catch((err)=>{
				console.log(err)
			})

			this.resetFridgeDialog();
			
		},
		deleteProduct(id){
			let payload = {
				collection: this.collection,
				id: id.toString()
			}

			this.checkCorrectObject(payload)
			.then((r)=>{
				if(r == true) this.deleteFromCollection(payload)
			})
			.catch((err)=>{
				console.log(err)
			})
		},
		resetFridgeDialog(){
			this.newName = "";
			this.newQuantity = "";
			this.newIcon = "";
			this.openFridgeDialog = false
		}
	},
	mounted(){

	}
}
</script>