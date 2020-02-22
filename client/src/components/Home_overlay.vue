<template>
	<v-overlay
		:value="welcomeOverlay"
		absolute
		light
		opacity="0"
	>
		<div class="d-flex align-center justify-center flex-column">
			<h1 class="mb-12 grey--text text--darken-1">Hi, It's your Home!</h1>
			<v-btn
				tile
				outlined
				x-large
				class="grey--text text--darken-1"
				@click="welcomeOverlay = false"
			>
				Start
			</v-btn>
		</div>

	</v-overlay>

</template>

<script>
export default {
	name: 'HomeOverlay',
	data(){
		return{
			welcomeOverlay: true

		}
	}
}
</script>

<style scoped>

</style>
