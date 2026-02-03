import { defineStore } from 'pinia'
import { getHouses } from '@/api/houses'

/**
 * Pinia store for managing houses data
 */
export const useHousesStore = defineStore('houses', {
  state: () => ({
    /** @type {Array} List of houses */
    houses: [],
    /** @type {boolean} Loading state */
    loading: false,
    /** @type {string|null} Error message */
    error: null,
    /** @type {boolean} Flag to indicate cached data */
    loaded: false,
  }),

  actions: {
    /**
     * Fetch houses from API.
     * Uses cache: if `loaded` is true, skips fetching.
     */
    async fetchHouses() {
      if (this.loaded) return //if the data is already there, exit

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
        console.log('this.houses', this.houses)
      }
    },
  },
})
