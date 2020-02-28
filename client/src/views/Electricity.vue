<template>
	<v-content>
		<v-container
			fill-height
			class="d-flex align-center justify-center"
		>
			<v-row
			class="align-self-start d-flex">
				<v-btn
					tile
					icon
					@click=" $router.push('/') "
				>
					<v-icon>mdi-home</v-icon>
				</v-btn>
				<v-spacer></v-spacer>
			</v-row>
			<v-row
			class="m-33-vh">
				<v-col
				cols="12"
				sm="6"
				md="4">
					<h2 class="grey--text text--darken-1">Kitchen</h2>
					<v-divider class="mb-3"></v-divider>
					<v-switch
					color="green ligthen-2"
					class="ma-0"
					v-for="(item, i) in kitchen"
					:key="i"
					v-model="item.value"
					:label="item.name"></v-switch>

				</v-col>

				<v-col
				cols="12"
				sm="6"
				md="4">

				</v-col>

				<v-col
				cols="12"
				sm="6"
				md="4">
					<h2 class="grey--text text--darken-1">Living Room</h2>
					<v-divider class="mb-3"></v-divider>
					<v-switch
					color="green ligthen-2"
					class="ma-0"
					v-for="(item, i) in living"
					:key="i"
					v-model="item.value"
					:label="item.name"></v-switch>
				</v-col>
			</v-row>

			<v-row>
				<v-col
				cols="12"
				sm="6"
				md="4">

				</v-col>

				<v-col
				cols="12"
				sm="12"
				md="4">
					<v-img
					class="fadeOut"
					src="../assets/img/home_view.png"
					alt="Home View">
					</v-img>
				</v-col>

				<v-col
				cols="12"
				sm="6"
				md="4">
				
				</v-col>
			</v-row>

			<v-row class="m-33-vh">
				<v-col
				cols="12"
				sm="6"
				md="4">

				</v-col>

				<v-col
				cols="12"
				sm="6"
				md="4">

				</v-col>

				<v-col
				cols="12"
				sm="6"
				md="4">
				
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
		kitchen:[
			{
				"name": "Fridge",
				"value": true
			},{
				"name": "Light1",
				"value": false
			},{
				"name": "Light2",
				"value": false
			},{
				"name": "Ceramic Hob",
				"value": false
			},
		],
		living:[
			{
				"name": "Light1",
				"value": true
			},{
				"name": "Television",
				"value": true
			},{
				"name": "Light2",
				"value": true
			},{
				"name": "WiFi-Router",
				"value": true
			},{
				"name": "Light3",
				"value": false
			}
		]
	})
}
</script>

<style scoped>
	.m-33-vh{max-height: 33vh}
</style>