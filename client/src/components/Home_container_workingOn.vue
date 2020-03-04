<template>
	<v-container class="d-flex align-center justify-center" fill-height>
		<v-row class="align-self-start d-flex">
			<v-btn
				tile
				icon
				@click=" $router.push('/') "
			>
				<v-icon>mdi-home</v-icon>
			</v-btn>
			<v-spacer></v-spacer>
		</v-row>

		<div class="d-flex align-self-start align-center justify-center flex-column">
			<h1 class="grey--text text--darken-1">
				Building Up Your Home
			</h1>
			<v-row class="d-flex align-center justify-center">
				<v-col
				cols="12"
				md="7"
				>
					<v-img
					max-width="100vw"
					src="../assets/img/home_logo.png"
					alt="Home App">
					</v-img>
				</v-col>
			</v-row>
			
			<v-btn
				tile
				outlined
				x-large
				class="grey--text text--darken-1"
				@click=" $router.push('/') "
			>
				Back
			</v-btn>
		</div>

	</v-container>

</template>

<script>
export default {
	name: 'WorkingOnContainer',
	components: {
	},
	data: function () {
		return {

		}
	},
	methods:{

	},
	mounted(){

	},
	watch: {

	}
}
</script>

<style scoped>

</style>

