<template>
	<v-app>
		<transition
			name="fade"
			mode="out-in"
		>
			<router-view/>
		</transition>
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
	computed:{
		onlineStatus(){
			return this.$store.state.onlineStatus
		},
	},
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
	},
	watch: {
	    onlineStatus: function (val) {
	    	//Check if changes during offline timelapse
	    	if(val) this.$store.dispatch("checkOfflineChanges", this.collection)
	    }
	}
};
</script>
<style>
	.h-100{height: 100%;}
	.h-50{height: 50%;}
	.fade-enter-active,.fade-leave-active {
		transition-duration: 0.5s;
		transition-property: opacity;
		transition-timing-function: ease;
	}

	.fade-enter,.fade-leave-active {
		opacity: 0
	}
</style>
