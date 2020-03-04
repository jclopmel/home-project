import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import { actions } from '@/store'
import { mutations } from '@/store'
import { state } from '@/store'


describe('actions', () => {
  let store
  let setDataMock
  beforeEach(() => {
    setDataMock = jest.fn()
    store = new Vuex.Store({
      state: {
        onlineStatus: state.onlineStatus,
        productsInStorage: state.productsInStorage
      },
      mutations: {
        setOnlineStatus: setDataMock
      },
      actions: {
        onlineStatusVerify: actions.onlineStatusVerify,
        getCollection: actions.getCollection
      }
    })
  })

  it('test status online connection with axios call', () => {
    store.hotUpdate({
      mutations: { setOnlineStatus: setDataMock }
    })
    return store.dispatch('onlineStatusVerify')
      .then((res) => {
        expect(store.state.onlineStatus).toBe(true)
      })
  })

})