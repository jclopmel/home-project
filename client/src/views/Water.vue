<template>
	<v-content>
		<div class="d-flex align-center justify-center flex-column">
			<h1
				class="grey--text text--darken-1"
			>
				Building Up Your Home
			</h1>
			<v-container>
				<v-row class="d-flex align-center justify-center">
					<v-col
					cols="12"
					md="7"
					>
						<v-img
						src="../assets/img/home_logo.png"
						alt="Home App">
						</v-img>
					</v-col>
				</v-row>
			</v-container>
			
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

	</v-content>
</template>

<script>

export default {
	components: {

	},
	data: () => ({

	})
}
</script>

<style scoped>

</style>