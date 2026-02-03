<script setup>
const props = defineProps({
  label: {
    type: String,
  },
  options: {
    type: Array,
  },
  error: {
    type: String,
  },
  modelValue: {
    type: String,
  },
})

const emit = defineEmits(['update:modelValue', 'blur'])
</script>

<template>
  <label>{{ props.label }}</label>
  <select
    :value="props.modelValue"
    @change="emit('update:modelValue', $event.target.value)"
    @blur="emit('blur')"
    :class="{ error: props.error }"
  >
    <option disabled value="">Select</option>

    <option v-for="opt in props.options" :key="opt.value" :value="opt.value">
      {{ opt.label }}
    </option>
  </select>
  <p v-if="error" class="error-text">{{ props.error }}</p>
</template>

<style scoped>
label {
  color: var(--color-text-secondary);
  margin-top: 2rem;
  margin-bottom: 0.5rem;
  font-size: 16px;
}
select {
  background-color: var(--color-element-background-2);
  font-family: var(--font-primary);
  font-size: 14px;
  color: var(--color-text-secondary);
  border: none;
  padding: 15px 20px;
  border-radius: 8px;
}
select:focus-visible {
  outline-width: 0px;
  box-shadow: 0px 2px 5px var(--color-element-tertiary-dark);
}
select.error {
  border: 2px solid var(--color-element-primary);
}
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
</style>
