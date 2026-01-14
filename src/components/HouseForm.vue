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

// если извне пришли новые данные (edit)
watch(
  () => props.modelValue,
  async (newValue) => {
    Object.assign(form, newValue)
    await nextTick()
    autoResizeTextarea()
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
    (typeof form.hasGarage === "boolean")
  )
})


</script>

<template>
    <form @submit.prevent="onSubmit">
        <label for="streetName">Street name*</label>
        <input id="streetName" v-model="form.streetName" placeholder="Enter the street name" required />

        <div class="area number-addition">
            <div class="form-group">
                <label for="houseNumber">House number*</label>
                <input id="houseNumber" type="number" v-model="form.houseNumber" placeholder="Enter house number" required />
            </div>
            
            <div class="form-group">
                <label for="numberAddition">Addition</label>
                <input id="numberAddition" v-model="form.numberAddition" placeholder="e.g. A" />
            </div>
        </div>

        <label for="zip">Post code*</label>
        <input id="zip" v-model="form.zip" placeholder="e.g. 1000 AA" required />

        <label for="city">City*</label>
        <input id="city" v-model="form.city" placeholder="e.g. Utrecht" required />

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

            <div v-if="!preview" class="placeholder">
                <img class="img-plus" src="../assets/ic_plus_grey@3x.png">
            </div>

            <img v-else :src="preview" alt="Preview" class="preview" />
        </div>
        

        <label for="price">Price*</label>
        <input id="price" type="number" v-model="form.price" placeholder="e.g. €150.000" required />

        <div class="area size-garage">
            <div class="form-group">
                <label for="size">Size*</label>
                <input id="size" type="number" v-model="form.size" placeholder="e.g. 60 m2" required />
            </div>
            
            <div class="form-group">
                <label for="garage">Garage*</label>
                <select id="garage" v-model="form.hasGarage" required>
                    <option disabled value="">Select</option>
                    <option :value="true">Yes</option>
                    <option :value="false">No</option>
                </select>
            </div>
        </div>

        <div class="area size-garage">
            <div class="form-group">
                <label for="bedrooms">Bedrooms*</label>
                <input id="bedrooms" type="number" v-model="form.bedrooms" placeholder="Enter amount" required />
            </div>
            <div class="form-group">
                <label for="bathrooms">Bathrooms*</label>
                <input id="bathrooms" type="number" v-model="form.bathrooms" placeholder="Enter amount" required />
            </div>
        </div>

        <label for="constructionYear">Construction year*</label>
        <input
        id="constructionYear"
        type="number"
        v-model="form.constructionYear"
        placeholder="e.g. 1990"
        required
        />

        <label for="description">Description*</label>
        <textarea id="description" 
            ref="descriptionRef" 
            v-model="form.description" 
            placeholder="Description" 
            maxlength="700"
            required 
            @input="autoResizeTextarea">
        </textarea>

        <div class="btn-submit">
            <button type="submit" 
            :disabled="!isFormValid"
            :class="{active: isFormValid}">{{ submitLabel }}</button>
        </div>
    </form>
</template>


<style scoped>

form{
    width: 20vw;
    font-family: var(--font-primary);
    font-weight: 600;
}

form label{
    color: var(--color-text-secondary);
    margin-top: 2rem;
    margin-bottom: 0.5rem;
    font-size: 16px;
}

form .area{
    display: flex;
    width: 20vw;
    justify-content: space-between;
}

.area .form-group{
    display: flex;
    flex-direction: column;
    width: 48%;
}

form input,
.form-group select,
form textarea{
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
form textarea:focus-visible{
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

.btn-submit{
    display: flex;
    justify-content: flex-end;
}
form button{
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

.image-upload .img-plus{
    height: 50px;
}

.hidden-input {
  display: none;
}

.placeholder {
  font-size: 48px;
  color: #666;
  line-height: 1;
}

.preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>