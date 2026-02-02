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
  console.log("image.value", image.value)
  
  const formData = new FormData()
  const formImg = new FormData()
  Object.entries(form.value).forEach(([key, value]) => formData.append(key, value))
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
    <h1 class="default">Create new listing</h1>

    <div class="back-btn">
      <img
        src="../assets/ic_back_grey@3x.png"
        class="back"
        @click="router.push({ name: 'Home' })"
      />
      <h4>Back to overview</h4>
      <h1 class="mobile">Create listing</h1>
    </div>

    <HouseForm
      v-model="form"
      v-model:image="image"
      submit-label="POST"
      @submit="createHouse"
      @image-selected="onImageSelected"
    />
  </div>
</template>

<style>
.create-page form {
  display: flex;
  flex-direction: column;
}

.create-page {
  position: relative;
  min-height: 100vh;
  margin-right: -16vw;
}

.create-page::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('../assets/img_placeholder_house@3x.png');
  background-position: left top;
  background-size: cover;
  background-repeat: no-repeat;
  filter: blur(18px);
  z-index: -2;
}

.create-page::before {
  content: '';
  position: fixed;
  inset: 0;
  background: linear-gradient(
    135deg,
    var(--color-element-background-1) 50%,
    rgba(255, 255, 255, 0.85) 55%,
    rgba(255, 255, 255, 0) 85%
  );
  z-index: -1;
}

@media screen and (max-width: 431px) {
  .create-page {
    width: 100vw;
    margin-right: 0;
  }
  .create-page .default {
    display: none;
  }
  .create-page .back-btn {
    position: initial;
    justify-content: start;
    gap: 30%;
    padding-left: 2.5rem;
    padding-right: 2.5rem;
  }

  .create-page::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url('../assets/img_placeholder_house@3x.png');
    background-position: left bottom;
    background-size: contain;
    background-repeat: no-repeat;
    filter: blur(5px);
    z-index: -2;
    margin-bottom: -7vh;
  }

  .create-page::before {
    content: '';
    position: fixed;
    inset: 0;
    background: linear-gradient(
      145deg,
      var(--color-element-background-1) 50%,
      rgba(255, 255, 255, 0.85) 70%,
      rgba(255, 255, 255, 0) 85%
    );
    z-index: -1;
  }
}
</style>
