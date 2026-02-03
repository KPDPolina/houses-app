<script setup>
const props = defineProps({
  label: {
    type: String,
  },
  value: {
    type: String,
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
  },
  error: {
    type: String,
  },
  modelValue: {
    type: [String, Number],
  },
})

const emit = defineEmits(['update:modelValue', 'blur'])
</script>

<template>
  <label>{{ props.label }}</label>

  <input
    :type="type"
    :value="modelValue"
    :placeholder="props.placeholder"
    @input="emit('update:modelValue', $event.target.value)"
    @blur="emit('blur')"
    :class="{ error: props.error }"
  />

  <p v-if="props.error" class="error-text">
    {{ props.error }}
  </p>
</template>

<style scoped>
label {
  color: var(--color-text-secondary);
  margin-top: 2rem;
  margin-bottom: 0.5rem;
  font-size: 16px;
}
input {
  background-color: var(--color-element-background-2);
  font-family: var(--font-primary);
  font-size: 14px;
  color: var(--color-text-secondary);
  border: none;
  padding: 15px 20px;
  border-radius: 8px;
}
input:focus-visible {
  outline-width: 0px;
  box-shadow: 0px 2px 5px var(--color-element-tertiary-dark);
}
input.error {
  border: 2px solid var(--color-element-primary);
}
input.error::placeholder {
  color: var(--color-element-primary);
}

.error-text {
  color: var(--color-element-primary);
  font-family: var(--font-secondary);
  font-style: italic;
  font-size: 12px;
  margin-top: 4px;
}
</style>
