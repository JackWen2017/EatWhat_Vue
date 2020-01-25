/*eslint-disable*/
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

Vuex.Store.prototype.hasModule = function(module) {
  return this._modules.root._children[module] !== undefined
}

let jsonUrl = 'http://localhost:3001'

let store = new Vuex.Store({
  state: {
    restaurants: []
  },
  mutations: {
    SET_RESTAURANT(state, list) {
      state.restaurants = list
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
    },
    DELETE_RESTAURANT({ commit }, id) {
      return new Promise(async resolve => {
        let deleteResult = await axios
          .delete(`${jsonUrl}/Restaurants/${id}`)
          .then(result => result.data || {})
          .catch(err => {})
        return resolve(deleteResult)
      })
    },
    INSERT_RESTAURANT({}, restaurant) {
      return new Promise(async resolve => {
        let insertResult = await axios
          .post(`${jsonUrl}/Restaurants`, restaurant)
          .then(result => result.data || {})
          .catch(err => {})
        return resolve(insertResult)
      })
    },
    UPDATE_RESTAURANT({}, restaurant) {
      return new Promise(async resolve => {
        let updateResult = await axios
          .patch(`${jsonUrl}/Restaurants/${restaurant.id}`, restaurant.data)
          .then(result => result.data || {})
          .catch(err => {})
        return resolve(updateResult)
      })
    }
  },
  modules: {}
})

export default store
