<script setup>
import { ref } from 'vue'
/**
 * FormTextarea component
 * Reusable textarea field with auto-resize, label, validation error display and v-model support.
 *
 * @component
 *
 * @prop {string} label - Text label for the textarea
 * @prop {string|null} [error] - Validation error message
 * @prop {string|null} [placeholder] - Placeholder text
 * @prop {string|number|null} [maxlength] - Maximum number of characters allowed
 * @prop {string} modelValue - Bound textarea value (v-model)
 *
 * @emits update:modelValue - Emits the new value when user types
 * @emits blur - Emits blur event for validation handling
 */
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
  maxlength: {
    type: String,
  },
  modelValue: {
    type: String,
  },
})

const emit = defineEmits(['update:modelValue', 'blur'])

const descriptionRef = ref(null)

const autoResizeTextarea = () => {
  const el = descriptionRef.value
  if (!el) return

  el.style.height = 'auto'
  el.style.height = el.scrollHeight + 'px'
}
</script>

<template>
  <label>{{ props.label }}</label>
  <textarea
    ref="descriptionRef"
    :value="props.modelValue"
    :placeholder="props.placeholder"
    :maxlength="maxlength"
    required
    @input="
      (event) => {
        emit('update:modelValue', event.target.value)
        autoResizeTextarea()
      }
    "
    :class="{ error: props.error }"
    @blur="emit('blur')"
  ></textarea>
  <p v-if="props.error" class="error-text">{{ props.error }}</p>
</template>

<style scoped>
label {
  color: var(--color-text-secondary);
  margin-top: 2rem;
  margin-bottom: 0.5rem;
  font-size: 16px;
}
textarea {
  background-color: var(--color-element-background-2);
  font-family: var(--font-primary);
  font-size: 14px;
  color: var(--color-text-secondary);
  border: none;
  padding: 15px 20px;
  border-radius: 8px;
}
textarea:focus-visible {
  outline-width: 0px;
  box-shadow: 0px 2px 5px var(--color-element-tertiary-dark);
}
textarea.error {
  border: 2px solid var(--color-element-primary);
}
textarea.error::placeholder {
  color: var(--color-element-primary);
}
form textarea {
  resize: none;
  overflow: hidden;
  min-height: 30px;
  line-height: 1.5;
  margin-bottom: 2rem;
}

.error-text {
  color: var(--color-element-primary);
  font-family: var(--font-secondary);
  font-style: italic;
  font-size: 12px;
  margin-top: 4px;
}
</style>
