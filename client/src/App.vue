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
	methods:{
		checkOnlineConnection(){
			let _vue = this;
			let onlineStatus = function(){
				_vue.$store.commit("setOnlineStatus", navigator.onLine)
			}
			window.addEventListener("online", onlineStatus);
			window.addEventListener("offline", onlineStatus);
		}
	},
	mounted: function (){
		this.$store.dispatch("getCollection", this.collection)
		this.checkOnlineConnection();
	}
};
</script>
<style>
	.h-100{height: 100%;}
	.h-50{height: 50%;}
</style>
