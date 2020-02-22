<template>
  <v-app>
    <v-content>

      <HomeOverlay/>

      <v-container fill-height>
        <v-row class="h-100">

          <HomecardButton
          v-for="(item, i) in appModules"
          :key="i"
          :icon="item.icon"
          /> 
        </v-row>

      </v-container>

    </v-content>
  </v-app>
</template>

<script>
import HomeOverlay from './components/Home_overlay';
import HomecardButton from './components/Home_cardButton';

export default {
  name: 'App',
  components: {
    HomeOverlay,
    HomecardButton
  },
  data: () => ({
    appModules:[
      {"icon": "mdi-food-apple"},
      {"icon": "mdi-water"},
      {"icon": "mdi-flash"},
      {"icon": "mdi-lock"}
    ]
  }),
};
</script>
<style>
  .h-100{height: 100%;}
  .h-50{height: 50%;}
</style>