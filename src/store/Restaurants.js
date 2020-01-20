let restaurant = function() {
  return {
    namespaced: true,
    state: {
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
    },
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
    }
  }
}

export default restaurant
