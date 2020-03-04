import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import { actions } from '@/store'
import { mutations } from '@/store'
import { state } from '@/store'

describe('mutations', () => {
  let store
  let setDataMock
  beforeEach(() => {
    setDataMock = jest.fn()
    store = new Vuex.Store({
      state: {
        onlineStatus: state.onlineStatus,
        newName: state.newName,
        newQuantity: state.newQuantity,
        newIcon: state.newIcon
      },
      mutations: {
        setOnlineStatus: mutations.setOnlineStatus,
        setNewName: mutations.setNewName,
        setNewQuantity: mutations.setNewQuantity,
        setNewIcon: mutations.setNewIcon
      }
    })
  })

  it('test status online connection from a commit', () => {
    store.commit('setOnlineStatus', false)
    expect(store.state.onlineStatus).toBe(false)
  })

  it('test new name state for the new product form', () => {
    let testData = "Water";
    store.commit('setNewName', testData)
    expect(store.state.newName).toBe(testData)
  })

  it('test new quantity state for the new product form', () => {
    let testData = 3;
    store.commit('setNewQuantity', testData)
    expect(store.state.newQuantity).toBe(testData)
  })

  it('test new icon state for the new product form', () => {
    let testData = "mdi-arrow";
    store.commit('setNewIcon', testData)
    expect(store.state.newIcon).toBe(testData)
  })

})