<script setup>
  import { ref } from 'vue'
  import { postHouse } from '@/api/houses'
  import { useRouter } from 'vue-router'
  import { useHousesStore } from '@/stores/houses'

  const housesStore = useHousesStore()
  const router = useRouter()

  const form = ref({
    price: '',
    bedrooms: '',
    bathrooms: '',
    size: '',
    streetName : '',
    houseNumber: '',
    numberAddition : '',
    zip : '',
    city : '',
    constructionYear : '',
    hasGarage: '',
    description : '',
  })

  // const image = ref({})

  const createHouse = async () => {
    const formdata = new FormData();
    formdata.append("price", form.value.price);
    formdata.append("bedrooms", form.value.bedrooms);
    formdata.append("bathrooms", form.value.bathrooms);
    formdata.append("size", form.value.size);
    formdata.append("streetName", form.value.streetName);
    formdata.append("houseNumber", form.value.houseNumber);
    formdata.append("numberAddition", form.value.numberAddition);
    formdata.append("zip", form.value.zip);
    formdata.append("city", form.value.city);
    formdata.append("constructionYear", form.value.constructionYear);
    formdata.append("hasGarage", form.value.hasGarage);
    formdata.append("description", form.value.description);
    console.log(formdata);
    try{
      const newHouse = await postHouse(formdata)
      housesStore.loaded = false // сбросс флага
      await housesStore.fetchHouses()     //  обновляем стор
      
      router.push({ name: 'HouseDetail', params: { id: newHouse.id } })
    } catch (error) {
      console.error("Ошибка создания дома:", error)
    }
  }


</script>

<template>
  <div class="create-page">
    <h1>Create new listing</h1>
    <form @submit.prevent="createHouse">

      <label for="streetName">Street name</label>
      <input
        id="streetName"
        type="text"
        v-model="form.streetName"
        placeholder="Enter the street name"
        required
      />

      <label for="houseNumber">House number</label>
      <input
        id="houseNumber"
        type="number"
        v-model="form.houseNumber"
        placeholder="Enter house number"
        required
      />

      <label for="numberAddition">Addition (optional)</label>
      <input
        id="numberAddition"
        type="text"
        v-model="form.numberAddition"
        placeholder="e.g. A"
      />

      <label for="zip">Post code</label>
      <input
        id="zip"
        type="text"
        v-model="form.zip"
        placeholder="e.g. 1000 AA"
        required
      />

      <label for="city">City</label>
      <input
        id="city"
        type="text"
        v-model="form.city"
        placeholder="e.g. Utrecht"
        required
      />

      <label for="image">Upload picture (PNG or JPG)</label>
      <input
        id="image"
        type="file"
        accept="image/png, image/jpeg"
        
      />

      <label for="price">Price</label>
      <input
        id="price"
        type="number"
        v-model="form.price"
        placeholder="e.g. €150.000"
        required
      />

      <label for="size">Size</label>
      <input
        id="size"
        type="number"
        v-model="form.size"
        placeholder="e.g. 60 m2"
        required
      />

      <label for="garage">Garage</label>
      <select
        id="garage"
        v-model="form.hasGarage"
        required
      >
        <option disabled value="">Select</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>

      <label for="bedrooms">Bedrooms</label>
      <input
        id="bedrooms"
        type="number"
        v-model="form.bedrooms"
        placeholder="Enter amount"
        required
      />

      <label for="bathrooms">Bathrooms</label>
      <input
        id="bathrooms"
        type="number"
        v-model="form.bathrooms"
        placeholder="Enter amount"
        required
      />

      <label for="constructionYear">Constuction date</label>
      <input
        id="constructionYear"
        type="number"
        v-model="form.constructionYear"
        placeholder="e.g. 1990"
        required
      />

      <label for="description">Description</label>
      <textarea
        id="description"
        v-model="form.description"
        placeholder="Description"
        required
      ></textarea>

      <button type="submit">POST</button>
    </form>
  </div>
</template>

<style>
.create-page form{
  display: flex;
  flex-direction: column;
}
</style>