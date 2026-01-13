<script setup>
import { ref, onMounted } from 'vue'
import HouseForm from '@/components/HouseForm.vue'
import { getHouse, editHouse, uploadImg } from '@/api/houses'
import { useRoute, useRouter } from 'vue-router'
import { useHousesStore } from '@/stores/houses'

const route = useRoute()
const router = useRouter()
const housesStore = useHousesStore()

const form = ref({})
const houseId = route.params.id
const image = ref(null)

const onImageSelected = (file) => {
  image.value = file
}

onMounted(async () => {
  const houses = await getHouse(houseId)
  const house = houses[0]
  form.value = {
    price: house.price,
    bedrooms: house.rooms.bedrooms,
    bathrooms: house.rooms.bathrooms,
    size: house.size,
    streetName: house.location.street,
    houseNumber: house.location.houseNumber,
    numberAddition: house.location.houseNumberAddition,
    zip: house.location.zip,
    city: house.location.city,
    constructionYear: house.constructionYear,
    hasGarage: house.hasGarage,
    description: house.description,
  }
})

const updateHouse = async () => {
  const formData = new FormData()
  const formImg = new FormData()
  Object.entries(form.value).forEach(([key, value]) =>
    formData.append(key, value)
  )

  await editHouse(formData, houseId)
  if (image.value) {
    formImg.append('image', image.value)
    await uploadImg(formImg, houseId)
  }
  housesStore.loaded = false
  await housesStore.fetchHouses()

  router.push({ name: 'HouseDetail', params: { id: houseId } })
}
</script>

<template>
  <div class="edit-page">
    <h1>Edit listing</h1>

    <HouseForm
      v-model="form"
      submit-label="SAVE"
      @submit="updateHouse"
      @image-selected="onImageSelected"
    />
  </div>
</template>

<style>
.edit-page form{
  display: flex;
  flex-direction: column;
}
</style>