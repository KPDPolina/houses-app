<script setup>
import { ref, onMounted, computed } from 'vue'
import HouseCard from '@/components/HouseCard.vue'
import { useHousesStore } from '@/stores/houses'
// import { getHouses } from '@/api/houses'


const search = ref('')
const sortBy = ref('price')
// const houses = ref([])
const loading = ref(true)
const error = ref(null)
const housesStore = useHousesStore()

const preraredHouses = computed(() => {
  let searchHouses = [];
  if(search.value.length === 0) searchHouses = [...housesStore.houses]
  else searchHouses = housesStore.houses.filter((element) =>{
    return element.location.city.toLowerCase().includes(search.value.toLowerCase()) ||
            element.location.zip.toLowerCase().includes(search.value.toLowerCase()) ||
            element.location.street.toLowerCase().includes(search.value.toLowerCase()) ||
            element.price.toString().startsWith(search.value.toLowerCase()) ||
            element.size.toString().startsWith(search.value.toLowerCase())
  })
  return searchHouses.sort((a,b) => {
    if(sortBy.value === "price"){
      return a.price - b.price //sorted by increasing price
    }else if(sortBy.value === "size"){
      return a.size - b.size //sorted by increasing size
    }
    return 0
  })
})


onMounted(async () => {
  try {
    // houses.value = await getHouses()
    await housesStore.fetchHouses()
    // console.log("housesStore.fetchHouses", housesStore.houses);
    
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
    <div class="header">
      <h1>Houses</h1>

      <!-- <button class="create-btn"> -->
        <!-- + CREATE NEW
      </button> -->
      <router-link to="/houses/create" class="create-btn">+ CREATE NEW</router-link>
    </div>

    <!-- Controls -->
    <div class="controls">
      <div class="search">
        <input
          type="text"
          placeholder="Search for a house"
          v-model="search"
        />
      </div>

      <div class="toggle">
        <button
          :class="{ active: sortBy === 'price' }"
          @click="sortBy = 'price'"
        >
          Price
        </button>
        <button
          :class="{ active: sortBy === 'size' }"
          @click="sortBy = 'size'"
        >
          Size
        </button>
      </div>
    </div>

    <p v-if="loading">Loading...</p>
    <p v-else-if="error">{{ error }}</p>

    <div v-else class="list">
      <div v-if="preraredHouses.length === 0" class="empty-result">
        <img style="width: 25rem; padding-bottom: 0.5rem;" src="../assets/img_empty_houses@3x.png"/>
        Nothing here
      </div>
      <HouseCard v-else
        v-for="house in preraredHouses"
        :key="house.id"
        :house="house"
      />
    </div>
  </div>
</template>



<style scoped>
.houses-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 24px;
  font-family: Inter, sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.create-btn {
  text-decoration: none;
  background: #ff5a3c;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

.controls {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}

.toggle {
  display: flex;
  background: #f1f1f1;
  border-radius: 6px;
  overflow: hidden;
}

.toggle button {
  padding: 8px 16px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-weight: 500;
}

.toggle .active {
  background: #ff5a3c;
  color: #fff;
}

.search input {
  width: 260px;
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #ddd;
}

/* Cards */
.list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.card {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.preview {
  width: 140px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}

.info {
  flex: 1;
  margin-left: 16px;
}

.price {
  font-weight: 600;
  margin: 4px 0;
}

.address {
  color: #888;
  font-size: 14px;
}

.meta {
  display: flex;
  gap: 12px;
  margin-top: 8px;
  font-size: 14px;
  color: #555;
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

.empty-result{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 6rem;
}
</style>