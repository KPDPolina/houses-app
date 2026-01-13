<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  submitLabel: {
    type: String,
    default: 'Save',
  },
})


const emit = defineEmits(['update:modelValue', 'submit', 'image-selected'])

const onFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    emit('image-selected', file)
  }
}
// локальная копия формы
const form = reactive({ ...props.modelValue })

// если извне пришли новые данные (edit)
watch(
  () => props.modelValue,
  (newValue) => {
    Object.assign(form, newValue)
  },
  { deep: true }
)

// синхронизация v-model
watch(
  form,
  () => {
    emit('update:modelValue', { ...form })
  },
  { deep: true }
)

const onSubmit = () => {
  emit('submit')
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <label for="streetName">Street name</label>
    <input id="streetName" v-model="form.streetName" placeholder="Enter the street name" required />

    <label for="houseNumber">House number</label>
    <input id="houseNumber" type="number" v-model="form.houseNumber" placeholder="Enter house number" required />

    <label for="numberAddition">Addition</label>
    <input id="numberAddition" v-model="form.numberAddition" placeholder="e.g. A" />

    <label for="zip">Post code</label>
    <input id="zip" v-model="form.zip" placeholder="e.g. 1000 AA" required />

    <label for="city">City</label>
    <input id="city" v-model="form.city" placeholder="e.g. Utrecht" required />

    <label for="image">Upload picture (PNG or JPG)</label>
    <input id="image" @change="onFileChange" type="file" accept="image/png, image/jpeg"/>

    <label for="price">Price</label>
    <input id="price" type="number" v-model="form.price" placeholder="e.g. €150.000" required />

    <label for="size">Size</label>
    <input id="size" type="number" v-model="form.size" placeholder="e.g. 60 m2" required />

    <label for="garage">Garage</label>
    <select id="garage" v-model="form.hasGarage" required>
      <option disabled value="">Select</option>
      <option value="true">Yes</option>
      <option value="false">No</option>
    </select>

    <label for="bedrooms">Bedrooms</label>
    <input id="bedrooms" type="number" v-model="form.bedrooms" placeholder="Enter amount" required />

    <label for="bathrooms">Bathrooms</label>
    <input id="bathrooms" type="number" v-model="form.bathrooms" placeholder="Enter amount" required />

    <label for="constructionYear">Construction year</label>
    <input
      id="constructionYear"
      type="number"
      v-model="form.constructionYear"
      placeholder="e.g. 1990"
      required
    />

    <label for="description">Description</label>
    <textarea id="description" v-model="form.description" placeholder="Description" required></textarea>

    <button type="submit">{{ submitLabel }}</button>
  </form>
</template>
