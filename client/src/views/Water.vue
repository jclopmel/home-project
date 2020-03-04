<template>
	<v-content>
		<workingOnContainer/>
		<menuBottomNavigation/>
	</v-content>
</template>

<script>
import workingOnContainer from '@/components/Home_container_workingOn';
import menuBottomNavigation from '@/components/Menu_bottom_navigation';

export default {
	components: {
		workingOnContainer,
		menuBottomNavigation
	},
	data: () => ({

	})
}
</script>

<style scoped>

</style>