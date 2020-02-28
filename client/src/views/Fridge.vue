<template>
	<v-content>
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
						<v-skeleton-loader
							v-if="productsInStorage.length < 1"
							v-for="i in 2"
							:key="i"
							ref="skeleton"
							type="list-item-avatar-two-line"
							tile
						></v-skeleton-loader>
					</div>
					<v-list
					v-else
					two-line>
						<v-list-item
						class="pa-0"
						v-for="(item, i) in productsInStorage"
						:key="i"
						>
							<v-list-item-avatar>
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

							<v-list-item-action>
								<v-btn icon @click="addProduct(item.id)">
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
						<v-row>
							<v-col
							cols="12"
							>
								<v-text-field
									v-model="newName"
									label="Name"
									required
								></v-text-field>
							</v-col>
							<v-col
							cols="12"
							md="6"
							>
								<v-text-field
									v-model="newQuantity"
									label="Quantity"
									required
								></v-text-field>
							</v-col>
							<v-col
							cols="12"
							md="6"
							>
								<v-select
									v-model="newIcon"
									:items="Icons"
									label="Icon"
									required
								></v-select>

							</v-col>
						</v-row>
					</v-container>

				</v-card-text>
				<v-card-actions>
					<v-btn color="grey--text text--darken-1" text @click="openFridgeDialog = false">Close</v-btn>
					<v-spacer></v-spacer>
					<v-btn
					:disabled="formControl"
					color="grey--text text--darken-1" text @click="addProduct()">Add</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>


	</v-content>
</template>

<script>

export default {
	components: {

	},
	data: () => ({
		openFridgeDialog: false,
		collection: 'fridge_collection'
	}),
	computed:{
		onlineStatus(){
			return this.$store.state.onlineStatus
		},
		Icons(){
			return this.$store.state.Icons
		},
		productsInStorage(){
			return this.$store.state.productsInStorage;
		},
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
		},
		formControl(){
			return this.newName == "";
		}
	},
	methods:{
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

			this.$store.dispatch("checkCorrectObject", payload.obj)
			.then((r)=>{
				if(r == true) _vue.$store.dispatch("addToCollection", payload)
			})
			.catch((err)=>{
				console.log(err)
			})

			// this.resetFridgeDialog();
			
		},
		resetFridgeDialog(){
			this.newName = "";
			this.newQuantity = "";
			this.newIcon = "";
			this.openFridgeDialog = false
		}
	},
	mounted(){
		// setInterval(()=>{
		// 	this.$store.commit('takeOffProduct', "5e5255aeedb04f1644db6e9c", this.productsInStorage)
		// }, 3000)
	}
}
</script>

<style scoped>

</style>