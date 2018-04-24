import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: [],
    cart: []
  },
  mutations: {
    addItems (state, payload) {
      state.items = payload
    },
    addCart (state, payload) {
      state.items.forEach(item => {
        if (item._id === payload._id && item.stock > 0) {
          item.stock -= 1
          let count = 0
          state.cart.forEach(oneCart => {
            if (oneCart.itemId === payload._id) {
              count++
              oneCart.price += payload.price
              oneCart.quantity += 1
            }
          })
          if (count === 0) {
            let obj = {
              itemId: payload._id,
              image: payload.image,
              price: payload.price,
              quantity: 1
            }
            state.cart.push(obj)
          }
        }
      })
    },
    deleteCart (state, payload) {
      state.cart.forEach(oneCart => {
        if (oneCart.itemId === payload.itemId) {
          state.items.forEach(item => {
            if (item._id === payload.itemId) {
              item.stock += oneCart.quantity
            }
          })
          oneCart.quantity = 0
        }
      })
    },
    deleteAll (state) {
      state.cart.forEach(oneCart => {
        state.items.forEach(item => {
          if (oneCart.itemId === item._id) {
            item.stock += oneCart.quantity
            oneCart.quantity = 0
          }
        })
      })
    },
    addData (state, payload) {
      axios.post('http://35.185.181.118/item/create', payload, {
        headers: {token: localStorage.getItem('token')}
      })
        .then(response => {
          console.log('auo')
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteData (state, payload) {
      axios.post(`http://35.185.181.118/item/delete/${payload}`, {}, {
        headers: {token: localStorage.getItem('token')}
      })
        .then(response => {
          location.reload()
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  actions: {
    addData ({ commit }, payload) {
      commit('addData', payload)
    },
    deleteData ({ commit }, payload) {
      commit('deleteData', payload)
    }
  }
})
