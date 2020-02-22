<template>
	<v-col class="h-50" cols="12" md="6">
		<v-hover v-slot:default="{ hover }">
			<v-btn
				class="d-flex align-center justify-center grey--text text--darken-1"
				:elevation=" hover ? 3 : 0"
				height="100%"
				block
				tile
				text
				outlined
				@click=" $router.push( btn.path ) "
			>
				<v-icon large>{{ btn.icon }}</v-icon>
			</v-btn>
		</v-hover>
	</v-col> 

</template>

<script>
export default {
	name: 'HomecardButton',
	props: {
		btn: Object
	},
	data(){
		return{

		}
	}
}
</script>

<style scoped>

</style>
