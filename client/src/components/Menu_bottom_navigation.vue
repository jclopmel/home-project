<template>

	<v-bottom-navigation
		background-color="transparent"
		fixed
		hide-on-scroll
		style="box-shadow: none"
	>
		<v-btn
		v-for="(item, i) in appModules"
		:key="i"
		@click=" $router.push(item.path) "
		icon>
			<v-icon>{{item.icon}}</v-icon>
		</v-btn>

	</v-bottom-navigation>

</template>

<script>
export default {
	name: 'menuBottomNavigation',
	components: {
	},
	data: () => ({

	}),
	computed:{
		appModules(){
			return this.$store.state.appModules;
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

