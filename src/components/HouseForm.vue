<script setup>
import FormImage from './formsComponents/FormImage.vue'
import FormInput from './formsComponents/FormInput.vue'
import FormSelect from './formsComponents/FormSelect.vue'
import FormTextarea from './formsComponents/FormTextarea.vue'
import { reactive, watch, ref, computed } from 'vue'

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

// if new data came from outside (edit)
watch(
  () => props.modelValue,
  async (newValue) => {
    Object.assign(form, newValue)
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

const localImage = ref(null)

watch(localImage, (file) => {
  emit('image-selected', file)
})

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
  const hasImage = form.image || localImage.value
  return (
    form.streetName &&
    form.houseNumber &&
    form.zip &&
    form.city &&
    hasImage &&
    form.price &&
    form.size &&
    form.bedrooms &&
    form.bathrooms &&
    form.constructionYear &&
    form.description &&
    form.hasGarage !== '' &&
    form.hasGarage !== null
  )
})
</script>

<template>
  <form @submit.prevent="onSubmit">
    <FormInput
      label="Street name*"
      v-model="form.streetName"
      :error="errors.streetName"
      placeholder="Enter street name"
      @blur="validateField('streetName')"
    />

    <div class="area number-addition">
      <div class="form-group">
        <FormInput
          label="House number*"
          type="number"
          v-model="form.houseNumber"
          :error="errors.houseNumber"
          placeholder="Enter house number"
          @blur="validateField('houseNumber')"
        />
      </div>

      <div class="form-group">
        <FormInput
          label="Addition*"
          v-model="form.numberAddition"
          :error="errors.numberAddition"
          placeholder="e.g. A"
        />
      </div>
    </div>

    <FormInput
      label="Post code*"
      v-model="form.zip"
      :error="errors.zip"
      placeholder="e.g. 1000 AA"
      @blur="validateField('zip')"
    />
    <FormInput
      label="City*"
      v-model="form.city"
      :error="errors.city"
      placeholder="e.g. Utrecht"
      @blur="validateField('city')"
    />

    <FormImage label="Upload picture (PNG or JPG)*" v-model="localImage" :preview="form.image" />

    <FormInput
      label="Price*"
      type="number"
      v-model="form.price"
      :error="errors.price"
      placeholder="e.g. €150.000"
      @blur="validateField('price')"
    />

    <div class="area size-garage">
      <div class="form-group">
        <FormInput
          label="Size*"
          type="number"
          v-model="form.size"
          :error="errors.size"
          placeholder="e.g. 60 m2"
          @blur="validateField('size')"
        />
      </div>

      <div class="form-group">
        <FormSelect
          label="Garage*"
          v-model="form.hasGarage"
          :options="[
            { label: 'Yes', value: true },
            { label: 'No', value: false },
          ]"
          :error="errors.hasGarage"
          @blur="validateField('hasGarage')"
        />
      </div>
    </div>

    <div class="area bedrooms-bathrooms">
      <div class="form-group">
        <FormInput
          label="Bedrooms*"
          type="number"
          v-model="form.bedrooms"
          :error="errors.bedrooms"
          placeholder="Enter amount"
          @blur="validateField('bedrooms')"
        />
      </div>

      <div class="form-group">
        <FormInput
          label="Bathrooms*"
          type="number"
          v-model="form.bathrooms"
          :error="errors.bathrooms"
          placeholder="Enter amount"
          @blur="validateField('bathrooms')"
        />
      </div>
    </div>

    <FormInput
      label="Construction year*"
      type="number"
      v-model="form.constructionYear"
      :error="errors.constructionYear"
      placeholder="e.g. 1990"
      @blur="validateField('constructionYear')"
    />

    <FormTextarea
      label="Description*"
      v-model="form.description"
      placeholder="Description"
      maxlength="700"
      :error="errors.description"
      @blur="validateField('description')"
    />

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

@media screen and (max-width: 800px) {
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
