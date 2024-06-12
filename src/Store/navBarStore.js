import { defineStore } from 'pinia'

export const useNavBarStore = defineStore('showNavBar', {
  state: () => {
    return { showNavBar: false }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    show() {
      this.showNavBar = true
    },
    hide() {
      this.showNavBar = false
    }
  },
})