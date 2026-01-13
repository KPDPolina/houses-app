<script setup>
import { ref } from 'vue'
import HouseForm from '@/components/HouseForm.vue'
import { postHouse, uploadImg } from '@/api/houses'
import { useRouter } from 'vue-router'
import { useHousesStore } from '@/stores/houses'

const router = useRouter()
const housesStore = useHousesStore()

const image = ref(null)
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
const onImageSelected = (file) => {
  image.value = file
}

const createHouse = async () => {
  const formData = new FormData()
  const formImg = new FormData()
  Object.entries(form.value).forEach(([key, value]) =>
    formData.append(key, value)
  )
  const newHouse = await postHouse(formData)
  if (image.value) {
    formImg.append('image', image.value)
    await uploadImg(formImg, newHouse.id)
  }
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
      @image-selected="onImageSelected"
    />
  </div>
</template>

<style>
.create-page form{
  display: flex;
  flex-direction: column;
}
</style>