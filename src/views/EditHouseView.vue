<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import HouseForm from '@/components/HouseForm.vue'
import { getHouse, editHouse, uploadImg } from '@/api/houses'
import { useRoute, useRouter } from 'vue-router'
import { useHousesStore } from '@/stores/houses'

onMounted(() => {
  document.body.classList.add('edit-page-bg')
})

onUnmounted(() => {
  document.body.classList.remove('edit-page-bg')
})

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
    <h1 class="default">Edit listing</h1>

    <div class="back-btn">
      <img src="../assets/ic_back_grey@3x.png" class="back" @click="router.push({ name: 'HouseDetail', params: { id: houseId } })"/>
      <h4>Back to detail page</h4>
      <h1 class="mobile">Edit listing</h1>
    </div>

    <HouseForm
      v-model="form"
      submit-label="SAVE"
      @submit="updateHouse"
      @image-selected="onImageSelected"
    />
  </div>
</template>

<style>

.edit-page{
  position: relative;
  min-height: 100vh;
  margin-right: -16vw;
}

.edit-page::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url('../assets/img_placeholder_house@3x.png');
  background-position: left top;
  background-size: cover;
  background-repeat: no-repeat;
  filter: blur(18px);
  z-index: -2;
}


.edit-page::before {
  content: "";
  position: fixed;
  inset: 0;
  background:
    linear-gradient(
    135deg,
    var(--color-element-background-1) 50%,
    rgba(255,255,255,0.85) 55%,
    rgba(255,255,255,0) 85%
  );
  z-index: -1;
}

.edit-page form{
  display: flex;
  flex-direction: column;
}


@media screen and (max-width: 431px) {
  .edit-page{
    width: 100vw;
  }
  .edit-page .default{
    display: none;
  }
  .edit-page .back-btn{
    position: initial;
    justify-content: start;
    gap: 30%;
    padding-left: 2.5rem;
    padding-right: 2.5rem;
  }
}
</style>