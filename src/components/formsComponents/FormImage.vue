<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  label: {
    type: String,
  },
  error: {
    type: String,
  },
  placeholder: {
    type: String,
  },
  preview: {
    type: String,
    default: null,
  },
  modelValue: {
    type: File,
    default: null,
  },
})

const emit = defineEmits(['update:modelValue', 'blur'])

const fileInput = ref(null)
const localPreview = ref(props.preview || null)

watch(
  () => props.preview,
  (newVal) => {
    localPreview.value = newVal
  },
  { immediate: true },
)

const triggerFileInput = () => {
  fileInput.value.click()
}

const onFileChange = (event) => {
  const file = event.target.files[0]
  if (!file) return

  emit('update:modelValue', file)

  if (localPreview.value) {
    URL.revokeObjectURL(localPreview.value)
  }
  localPreview.value = URL.createObjectURL(file)
}
</script>

<template>
  <label>{{ props.label }}</label>

  <div class="image-upload" @click="triggerFileInput">
    <input
      ref="fileInput"
      type="file"
      accept="image/png, image/jpeg"
      class="hidden-input"
      @change="onFileChange($event)"
      @blur="emit('blur')"
    />

    <div v-if="!localPreview" class="img-placeholder">
      <img class="img-plus" src="../../assets/ic_plus_grey@3x.png" />
    </div>

    <img v-else :src="localPreview" alt="Preview" class="preview" />
  </div>
</template>

<style scoped>
label {
  color: var(--color-text-secondary);
  margin-top: 2rem;
  margin-bottom: 0.5rem;
  font-size: 16px;
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

.error-text {
  color: var(--color-element-primary);
  font-family: var(--font-secondary);
  font-style: italic;
  font-size: 12px;
  margin-top: 4px;
}
</style>
