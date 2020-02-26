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

					<v-list two-line>
						<v-list-item
							v-for="(item, i) in productsInStorage"
							:key="i"
						>
							<v-list-item-avatar>
								<v-icon v-if="item.quantity > 0" class="grey--text text--darken-1">mdi-food-apple</v-icon>
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
					color="grey--text text--darken-1" text @click="openFridgeDialog = false">Add</v-btn>
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
		openFridgeDialog: true,
		collection: 'fridge_collection'
	}),
	computed:{
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
		addProduct(id){
			let _vue = this;
			this.$store.commit('addProduct', id)
			let obj = this.productsInStorage.find((e)=>{return e.id == id})

			let payload = {
				collection: this.collection,
				obj: obj
			}

			this.$store.dispatch("checkCorrectObject", payload)
			.then((r)=>{
				if(r == true) _vue.$store.dispatch("modifyFromCollection", payload)
			})
			.catch((err)=>{
				console.log(err)
			})

			
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