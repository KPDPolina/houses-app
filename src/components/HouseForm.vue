<script setup>
// import '../assets/base.css'
import { reactive, watch, ref, nextTick, computed } from 'vue'

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

// form copy
const form = reactive({ ...props.modelValue })

const descriptionRef = ref(null)

const autoResizeTextarea = () => {
  const el = descriptionRef.value
  if (!el) return

  el.style.height = 'auto'
  el.style.height = el.scrollHeight + 'px'
}

// if new data came from outside (edit)
watch(
  () => props.modelValue,
  async (newValue) => {
    Object.assign(form, newValue)
    await nextTick()
    autoResizeTextarea()
  },
  { deep: true },
)

// synchronization v-model
watch(
  form,
  () => {
    emit('update:modelValue', { ...form })
  },
  { deep: true },
)

const onSubmit = () => {
  if (validateForm()) {
    emit('submit')
  }
}

const fileInput = ref(null)
const preview = ref(null)

const triggerFileInput = () => {
  fileInput.value.click()
}

const onFileChange = (event) => {
  const file = event.target.files[0]
  if (!file) return

  emit('image-selected', file)

  preview.value = URL.createObjectURL(file)
}

const errors = reactive({
  streetName: '',
  houseNumber: '',
  zip: '',
  city: '',
  price: '',
  size: '',
  hasGarage: '',
  bedrooms: '',
  bathrooms: '',
  constructionYear: '',
  description: '',
})

const validateField = (field) => {
  if (!form[field]) {
    errors[field] = 'This field is required'
  } else {
    errors[field] = ''
  }
}

const validateForm = () => {
  Object.keys(errors).forEach(validateField)
  return Object.values(errors).every((e) => !e) //  if there are no errors - true
}

const isFormValid = computed(() => {
  return (
    form.streetName &&
    form.houseNumber &&
    form.zip &&
    form.city &&
    form.price &&
    form.size &&
    form.bedrooms &&
    form.bathrooms &&
    form.constructionYear &&
    form.description &&
    typeof form.hasGarage === 'boolean'
  )
})
</script>

<template>
  <form @submit.prevent="onSubmit">
    <label for="streetName">Street name*</label>
    <input
      id="streetName"
      v-model="form.streetName"
      placeholder="Enter the street name"
      required
      :class="{ error: errors.streetName }"
      @blur="validateField('streetName')"
    />
    <p v-if="errors.streetName" class="error-text">{{ errors.streetName }}</p>

    <div class="area number-addition">
      <div class="form-group">
        <label for="houseNumber">House number*</label>
        <input
          id="houseNumber"
          type="number"
          v-model="form.houseNumber"
          placeholder="Enter house number"
          required
          :class="{ error: errors.houseNumber }"
          @blur="validateField('houseNumber')"
        />
        <p v-if="errors.houseNumber" class="error-text">{{ errors.houseNumber }}</p>
      </div>

      <div class="form-group">
        <label for="numberAddition">Addition</label>
        <input id="numberAddition" v-model="form.numberAddition" placeholder="e.g. A" />
      </div>
    </div>

    <label for="zip">Post code*</label>
    <input
      id="zip"
      v-model="form.zip"
      placeholder="e.g. 1000 AA"
      required
      :class="{ error: errors.zip }"
      @blur="validateField('zip')"
    />
    <p v-if="errors.zip" class="error-text">{{ errors.zip }}</p>

    <label for="city">City*</label>
    <input
      id="city"
      v-model="form.city"
      placeholder="e.g. Utrecht"
      required
      :class="{ error: errors.city }"
      @blur="validateField('city')"
    />
    <p v-if="errors.city" class="error-text">{{ errors.city }}</p>

    <label for="image">Upload picture (PNG or JPG)*</label>
    <!-- <input id="image" @change="onFileChange" type="file" accept="image/png, image/jpeg"/> -->
    <div class="image-upload" @click="triggerFileInput">
      <input
        ref="fileInput"
        type="file"
        accept="image/png, image/jpeg"
        class="hidden-input"
        @change="onFileChange"
      />

      <div v-if="!preview" class="img-placeholder">
        <img class="img-plus" src="../assets/ic_plus_grey@3x.png" />
      </div>

      <img v-else :src="preview" alt="Preview" class="preview" />
    </div>

    <label for="price">Price*</label>
    <input
      id="price"
      type="number"
      v-model="form.price"
      placeholder="e.g. €150.000"
      required
      :class="{ error: errors.price }"
      @blur="validateField('price')"
    />
    <p v-if="errors.price" class="error-text">{{ errors.price }}</p>

    <div class="area size-garage">
      <div class="form-group">
        <label for="size">Size*</label>
        <input
          id="size"
          type="number"
          v-model="form.size"
          placeholder="e.g. 60 m2"
          required
          :class="{ error: errors.size }"
          @blur="validateField('size')"
        />
        <p v-if="errors.size" class="error-text">{{ errors.size }}</p>
      </div>

      <div class="form-group">
        <label for="garage">Garage*</label>
        <select
          id="garage"
          v-model="form.hasGarage"
          required
          :class="{ error: errors.hasGarage }"
          @blur="validateField('hasGarage')"
        >
          <option disabled value="">Select</option>
          <option :value="true">Yes</option>
          <option :value="false">No</option>
        </select>
        <p v-if="errors.hasGarage" class="error-text">{{ errors.hasGarage }}</p>
      </div>
    </div>

    <div class="area bedrooms-bathrooms">
      <div class="form-group">
        <label for="bedrooms">Bedrooms*</label>
        <input
          id="bedrooms"
          type="number"
          v-model="form.bedrooms"
          placeholder="Enter amount"
          required
          :class="{ error: errors.bedrooms }"
          @blur="validateField('bedrooms')"
        />
        <p v-if="errors.bedrooms" class="error-text">{{ errors.bedrooms }}</p>
      </div>
      <div class="form-group">
        <label for="bathrooms">Bathrooms*</label>
        <input
          id="bathrooms"
          type="number"
          v-model="form.bathrooms"
          placeholder="Enter amount"
          required
          :class="{ error: errors.bathrooms }"
          @blur="validateField('bathrooms')"
        />
        <p v-if="errors.bathrooms" class="error-text">{{ errors.bathrooms }}</p>
      </div>
    </div>

    <label for="constructionYear">Construction year*</label>
    <input
      id="constructionYear"
      type="number"
      v-model="form.constructionYear"
      placeholder="e.g. 1990"
      required
      :class="{ error: errors.constructionYear }"
      @blur="validateField('constructionYear')"
    />
    <p v-if="errors.constructionYear" class="error-text">{{ errors.constructionYear }}</p>

    <label for="description">Description*</label>
    <textarea
      id="description"
      ref="descriptionRef"
      v-model="form.description"
      placeholder="Description"
      maxlength="700"
      required
      @input="autoResizeTextarea"
      :class="{ error: errors.description }"
      @blur="validateField('description')"
    >
    </textarea>
    <p v-if="errors.description" class="error-text">{{ errors.description }}</p>

    <div class="btn-submit">
      <button type="submit" :disabled="!isFormValid" :class="{ active: isFormValid }">
        {{ submitLabel }}
      </button>
    </div>
  </form>
</template>

<style scoped>
form {
  width: 20vw;
  font-family: var(--font-primary);
  font-weight: 600;
}

form label {
  color: var(--color-text-secondary);
  margin-top: 2rem;
  margin-bottom: 0.5rem;
  font-size: 16px;
}

form .area {
  display: flex;
  width: 20vw;
  justify-content: space-between;
}

.area .form-group {
  display: flex;
  flex-direction: column;
  width: 48%;
}

form input,
.form-group select,
form textarea {
  background-color: var(--color-element-background-2);
  font-family: var(--font-primary);
  font-size: 14px;
  color: var(--color-text-secondary);
  border: none;
  padding: 15px 20px;
  border-radius: 8px;
}

input:focus-visible,
.form-group select:focus-visible,
form textarea:focus-visible {
  outline-width: 0px;
  box-shadow: 0px 2px 5px var(--color-element-tertiary-dark);
}

form textarea {
  resize: none;
  overflow: hidden;
  min-height: 30px;
  line-height: 1.5;
  margin-bottom: 2rem;
}

.btn-submit {
  display: flex;
  justify-content: flex-end;
}
form button {
  opacity: 0.5;
  background-color: var(--color-element-primary);
  font-family: var(--font-primary);
  cursor: not-allowed;
  transition: all 0.2s ease;
  border: none;
  padding: 15px 1rem;
  border-radius: 8px;
  width: 55%;
  color: white;
}

form button.active {
  opacity: 1;
  cursor: pointer;
}

form button:disabled {
  pointer-events: none;
}

.image-upload {
  width: 140px;
  height: 140px;
  margin-top: 1rem;
  border: 2px dashed var(--color-element-tertiary-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: #00000000;
}

.image-upload:hover {
  border-color: #666;
}

.image-upload .img-plus {
  height: 50px;
}

.hidden-input {
  display: none;
}

.img-placeholder {
  font-size: 48px;
  color: #666;
  line-height: 1;
}

.preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

input.error,
textarea.error,
select.error {
  border: 2px solid var(--color-element-primary);
}
textarea.error {
  margin-bottom: 0;
}

input.error::placeholder,
textarea.error::placeholder,
select.error::placeholder {
  color: var(--color-element-primary);
}

.error-text {
  color: var(--color-element-primary);
  font-family: var(--font-secondary);
  font-style: italic;
  font-size: 12px;
  margin-top: 4px;
}

@media screen and (max-width: 431px) {
  form {
    width: 100vw;
    padding: 0 2.5rem;
  }
  form .area {
    width: auto;
  }
  form .btn-submit button {
    width: 100%;
  }
}
</style>
