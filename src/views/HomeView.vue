<script setup>
import { ref, onMounted, computed } from 'vue'
import HouseCard from '@/components/HouseCard.vue'
import SearchInput from '@/components/SearchInput.vue'
import SortButton from '@/components/SortButton.vue'
import { useHousesStore } from '@/stores/houses'
import '../assets/base.css'

const search = ref('')
const sortBy = ref('price')
const loading = ref(true)
const error = ref(null)
const housesStore = useHousesStore()

const preraredHouses = computed(() => {
  let searchHouses = []
  if (search.value.length === 0) searchHouses = [...housesStore.houses]
  else
    searchHouses = housesStore.houses.filter((element) => {
      return (
        element.location.city.toLowerCase().includes(search.value.toLowerCase()) ||
        element.location.zip.toLowerCase().includes(search.value.toLowerCase()) ||
        element.location.street.toLowerCase().includes(search.value.toLowerCase()) ||
        element.price.toString().startsWith(search.value.toLowerCase()) ||
        element.size.toString().startsWith(search.value.toLowerCase())
      )
    })
  return searchHouses.sort((a, b) => {
    if (sortBy.value === 'price') {
      return a.price - b.price //sorted by increasing price
    } else if (sortBy.value === 'size') {
      return a.size - b.size //sorted by increasing size
    }
    return 0
  })
})

onMounted(async () => {
  try {
    await housesStore.fetchHouses()
  } catch (e) {
    error.value = e.message
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="houses-page">
    <!-- Header -->
    <div class="houses-header">
      <h1>Houses</h1>
      <router-link to="/houses/create" class="create-area">
        <span class="create-btn">+ CREATE NEW</span>
        <img src="../assets/ic_plus_grey@3x.png" alt="Create" class="create-icon" />
      </router-link>
    </div>

    <!-- Controls -->
    <div class="controls">
      <SearchInput v-model="search" />

      <div class="toggle">
        <SortButton label="Price" value="price" v-model="sortBy" />
        <SortButton label="Size" value="size" v-model="sortBy" />
      </div>
    </div>

    <p v-if="loading">Loading...</p>
    <p v-else-if="error">{{ error }}</p>

    <div v-else>
      <div v-if="preraredHouses.length === 0" class="empty-result">
        <img style="width: 25rem; padding-bottom: 0.5rem" src="../assets/img_empty_houses@3x.png" />
        <span>No results found.</span>
        <span>Please try another keyword.</span>
      </div>

      <h3 v-else-if="preraredHouses.length > 0 && search.length != 0">
        {{ preraredHouses.length }} results found
      </h3>
      <div class="list">
        <HouseCard v-for="house in preraredHouses" :key="house.id" :house="house" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.houses-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.create-area {
  text-decoration: none;
}

.create-area .create-btn {
  background: var(--color-element-primary);
  color: white;
  border: none;
  padding: 0.6rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

.create-area .create-icon {
  display: none;
}

.controls {
  display: flex;
  justify-content: space-between;
  margin: 0.8rem 0 2rem 0;
}

.toggle {
  display: flex;
  background: var(--color-element-tertiary-dark);
  border-radius: 6px;
  overflow: hidden;
}

/* Cards list*/
.list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Actions */
.actions {
  display: flex;
  gap: 8px;
}

.icon {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

.empty-result {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 6rem;
  color: var(--color-text-secondary);
}

@media screen and (max-width: 800px) {
  .houses-page {
    width: 100%;
  }

  .houses-header {
    justify-content: flex-end;
    gap: 35%;
  }

  .create-area .create-btn {
    display: none;
  }

  .create-area .create-icon {
    display: block;
    height: 1.5rem;
  }

  .controls {
    flex-direction: column;
    gap: 1rem;
  }
  .controls .search {
    width: 100%;
  }
  .controls .search input {
    padding: 0.8rem 2rem 0.8rem 3.5rem;
  }
  .controls .toggle {
    width: 100%;
  }
  .controls .toggle button {
    width: 50%;
  }
}
</style>
