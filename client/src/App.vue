<template>
	<v-app>
		<router-view/>
	</v-app>
</template>

<script>

export default {
	name: 'App',
	components: {

	},
	data: () => ({
		collection: 'fridge_collection'
	}),
	mounted: function (){
		this.$store.dispatch("getCollection", this.collection)
	}
};
</script>
<style>
	.h-100{height: 100%;}
	.h-50{height: 50%;}
</style>
