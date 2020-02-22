<template>
	<v-content>
		<v-container
			fill-height
			class="d-flex align-center justify-center"
		>
			<v-row class="align-self-start">
				<v-btn
					tile
					icon
					@click=" $router.push('/') "
				>
					<v-icon>mdi-home</v-icon>
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
								<v-list-item-title v-text="item.product"></v-list-item-title>
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
	</v-content>
</template>

<script>

export default {
	components: {

	},
	data: () => ({

	}),
	computed:{
		productsInStorage(){
			return this.$store.state.productsInStorage;
		}
	},
	methods:{
		addProduct(id){
			this.$store.commit('addProduct', id)
		}
	},
	mounted(){
		setInterval(()=>{
			this.$store.commit('takeOffProduct', "01")
		}, 3000)
	}
}
</script>

<style scoped>

</style>