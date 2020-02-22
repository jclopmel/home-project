<template>
	<v-col class="h-50" cols="12" md="6">
		<v-btn
			class="d-flex align-center justify-center grey--text text--darken-1"
			height="100%"
			block
			tile
			text
			outlined
		>
			<v-icon>{{ icon }}</v-icon>
		</v-btn> 
	</v-col> 

</template>

<script>
export default {
	name: 'HomecardButton',
	props: {
    icon: String
  },
	data(){
		return{

		}
	}
}
</script>

<style scoped>

</style>
