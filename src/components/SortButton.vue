<script setup>
const props = defineProps({
  label: {
    type: String,
  },
  value: {
    type: String,
  },
  modelValue: {
    type: String,
  },
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <button
    :class="{ active: props.modelValue === props.value }"
    @click="emit('update:modelValue', props.value)"
  >
    {{ props.label }}
  </button>
</template>

<style>
.toggle button {
  padding: 0.5rem 3rem;
  border: none;
  background: transparent;
  cursor: pointer;
  font-weight: 500;
  color: #fff;
}

.toggle .active {
  background: var(--color-element-primary);
}
</style>
