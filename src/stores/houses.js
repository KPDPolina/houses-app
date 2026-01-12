import { defineStore } from 'pinia'
import { getHouses } from '@/api/houses'

export const useHousesStore = defineStore('houses', {
  state: () => ({
    houses: [],
    loading: false,
    error: null,
    loaded: false, //флаг кеша
  }),

  actions: {
    async fetchHouses() {
      if (this.loaded) return//если данные уже есть - выходим

      this.loading = true
      this.error = null

      try {
        const data = await getHouses()
        this.houses = data
        this.loaded = true //помечаем, что кеш заполнен
      } catch (e) {
        this.error = e.message
      } finally {
        this.loading = false
      }
    },
  },
})
