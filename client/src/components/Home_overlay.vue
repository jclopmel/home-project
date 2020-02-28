<template>
		<v-overlay
		color="white"
		:value="welcomeOverlay"
		absolute
		light
		opacity="1"
	>
		<div class="d-flex align-center justify-center flex-column">
			<h1
				class="grey--text text--darken-1 fadeOut"
				v-bind:style=" overlayOpacity ? 'opacity:1' : 'opacity:0'"
			>
				Hi, It's your Home!
			</h1>
			<v-container>
				<v-row class="d-flex align-center justify-center">
					<v-col
					cols="12"
					md="7"
					>
						<v-img
						class="fadeOut"
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
				class="grey--text text--darken-1 fadeOut"
				v-bind:style=" overlayOpacity ? 'opacity:1' : 'opacity:0'"
				@click="closeOverlay()"
			>
				Start
			</v-btn>
		</div>

	</v-overlay>

</template>

<script>

export default {
	name: 'HomeOverlay',
	components: {
	},
	data(){
		return{
			welcomeOverlay: false,
			overlayOpacity: false
		}
	},
	methods:{
		closeOverlay(){
			this.overlayOpacity = false;
			setTimeout(()=>{
				this.welcomeOverlay = false;
			}, 1000)
		}
	},
	mounted(){
		setTimeout(()=>{
			this.overlayOpacity = true;
		}, 2000)
	},
	watch: {

	}
}
</script>

<style scoped>
	.fadeOut{
		transition: opacity 1s;
	}
</style>

