import { defineStore } from 'pinia'
import { getHouses } from '@/api/houses'

export const useHousesStore = defineStore('houses', {
  state: () => ({
    houses: [],
    loading: false,
    error: null,
    loaded: false, //cache flag
  }),

  actions: {
    async fetchHouses() {
      if (this.loaded) return//if the data is already there, exit

      this.loading = true
      this.error = null

      try {
        const data = await getHouses()
        this.houses = data
        this.loaded = true //mark that the cache is full
      } catch (e) {
        this.error = e.message
      } finally {
        this.loading = false
      }
    },
  },
})
