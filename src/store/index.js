/*eslint-disable*/
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

let jsonUrl = 'http://localhost:3001'

export default new Vuex.Store({
  state: {
    restaurants: [],
    current: 0,
    filterValue: {
      distance: 0,
      taste: 0
    }
  },
  getters: {
    restaurantList(state) {
      let list = state.restaurants
      for (const key in state.filterValue) {
        let value = state.filterValue[key]
        if (value !== 0) {
          list = list.filter(r => r[key].indexOf(value) >= 0)
        }
      }
      return list
    },
    filterVal(state) {
      return state.filterValue
    }
  },
  mutations: {
    SET_RESTAURANT(state, list) {
      state.restaurants = list
    },
    SET_CURRENT(state, current) {
      state.current = current
    },
    SET_FILTER(state, { key, value }) {
      state.filterValue[key] = value
    }
  },
  actions: {
    GET_RESTAURANT({ commit }) {
      return new Promise(async resolve => {
        let restaurants = await axios
          .get(`${jsonUrl}/Restaurants`)
          .then(result => result.data || [])
          .catch(_ => [])
        commit('SET_RESTAURANT', restaurants)
        return resolve(restaurants)
      })
    }
  },
  modules: {}
})
