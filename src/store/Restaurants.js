let addTimes = {
  0: 600,
  1: 300
}

let state = {
  current: 0,
  btnList: {
    distance: {
      size: 3,
      filterValue: 0
    },
    taste: {
      size: 3,
      filterValue: 0
    },
    random: {
      size: 1,
      filterValue: 0
    }
  },
  restaurantDisable: false
}
let restaurant = function() {
  return {
    namespaced: true,
    state,
    getters: {
      filterValues(state) {
        let values = {}
        for (const key in state.btnList) {
          let value = state.btnList[key].filterValue
          values[key] = value
        }
        return values
      },
      ctrlDisable(state) {
        return state.restaurantDisable
      },
      restaurantList(state, getters, rootState) {
        let list = rootState.restaurants
        for (const key in state.btnList) {
          let value = state.btnList[key].filterValue
          if (value !== 0) {
            list = list.filter(r => r[key].indexOf(value) >= 0)
          }
        }
        return list
      },

      nowRestaurant(state, getters) {
        let nowCurrent = state.current
        let restaurant = getters.restaurantList
          ? getters.restaurantList[nowCurrent]
          : {}
        return restaurant ? restaurant.name : ''
      }
    },
    mutations: {
      SET_CURRENT(state, current) {
        state.current = current
      },
      SET_FILTER(state, { key, value }) {
        if (state.btnList.hasOwnProperty(key)) {
          let changeValue = value % state.btnList[key].size
          state.btnList[key].filterValue = changeValue
        }
      },
      SET_CTRL_DISABLE(state, disable) {
        state.restaurantDisable = disable
      }
    },
    actions: {
      SET_CURRENT_TIMEOUT({ state, getters, commit }, startTime) {
        let totalSize = getters.restaurantList.length
        setTimeout(() => {
          let nowCurrent = (state.current + 1) % totalSize
          commit('SET_CURRENT', nowCurrent)
        }, startTime)
      },
      RANDOM_MODE({ dispatch }) {
        let startTime = 0
        let count = Math.ceil(Math.random() * 3) + 4
        for (let i = 0; i <= count + 1; i++) {
          let j = i < 2 ? i : count - i
          let addTime = addTimes.hasOwnProperty(j) ? addTimes[j] : 100
          dispatch('SET_CURRENT_TIMEOUT', startTime)
          startTime += addTime
        }
        return startTime + 100
      },
      async CHANGE_RANDOM({ commit, dispatch }) {
        commit('SET_CTRL_DISABLE', true)
        let startTime = await dispatch('RANDOM_MODE')
        return new Promise(async resolve => {
          setTimeout(() => {
            commit('SET_CTRL_DISABLE', false)
            return resolve()
          }, startTime)
        })
      }
    }
  }
}

export default restaurant
