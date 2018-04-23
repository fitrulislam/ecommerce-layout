import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: [{
      _id: 1,
      price: 400000,
      stock: 3,
      src: 'darimana ya'
    }, {
      _id: 2,
      price: 300000,
      stock: 4,
      src: 'darimana mana'
    }],
    cart: []
  },
  mutations: {
    addItems (state, payload) {
      state.items.push(payload)
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
              src: payload.src,
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
    }
  },
  actions: {

  }
})
