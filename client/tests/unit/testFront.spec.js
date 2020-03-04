import { shallowMount  } from '@vue/test-utils'
import HomecardButton from '@/components/Home_cardButton.vue';
import FridgeView from '@/views/Fridge.vue';


describe('HomecardButton.vue', () => {
	it('An Object must be passed', () => {
		const btn = {
				"icon": "mdi-food-apple",
			"path": "/fridge"
			}
		const wrapper = shallowMount(HomecardButton, {
			propsData: { btn }
		})
		expect(wrapper.emitted()).toBeTruthy()
		expect(wrapper.isEmpty()).toBe(false)
	})
})