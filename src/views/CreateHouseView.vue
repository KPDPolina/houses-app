<script setup>
import { ref } from 'vue'
import HouseForm from '@/components/HouseForm.vue'
import { postHouse } from '@/api/houses'
import { useRouter } from 'vue-router'
import { useHousesStore } from '@/stores/houses'

const router = useRouter()
const housesStore = useHousesStore()

const form = ref({
  price: '',
  bedrooms: '',
  bathrooms: '',
  size: '',
  streetName: '',
  houseNumber: '',
  numberAddition: null,
  zip: '',
  city: '',
  constructionYear: '',
  hasGarage: '',
  description: '',
})

const createHouse = async () => {
  const formData = new FormData()
  Object.entries(form.value).forEach(([key, value]) =>
    formData.append(key, value)
  )

  const newHouse = await postHouse(formData)
  housesStore.loaded = false
  await housesStore.fetchHouses()

  router.push({ name: 'HouseDetail', params: { id: newHouse.id } })
}
</script>

<template>
  <div class="create-page">
    <h1>Create new listing</h1>

    <HouseForm
      v-model="form"
      submit-label="POST"
      @submit="createHouse"
    />
  </div>
</template>

<style>
.create-page form{
  display: flex;
  flex-direction: column;
}
</style>