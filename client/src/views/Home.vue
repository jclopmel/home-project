<template>
	<v-content>
      <HomeOverlay/>

      <v-container fill-height>
        <v-row class="h-100">

          <HomecardButton
			v-for="(item, i) in appModules"
			:key="i"
			:btn="item"
          /> 
        </v-row>

      </v-container>
    </v-content>

</template>

<script>
import HomeOverlay from '@/components/Home_overlay';
import HomecardButton from '@/components/Home_cardButton';

export default {
	components: {
		HomeOverlay,
		HomecardButton
	},
	data: () => ({

	}),
	computed:{
		appModules(){
			return this.$store.state.appModules;
		}
	},
	mounted: function (){

	}
}
</script>

<style scoped>

</style>