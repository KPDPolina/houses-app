<script setup>
/**
 * Props for the toggle button.
 * @property {string} label - The text displayed on the button.
 * @property {string} value - The value this button represents.
 * @property {string} modelValue - The current selected value of the toggle group.
 */
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

/**
 * Emits when the button is clicked to update the toggle selection.
 * @event update:modelValue
 */
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
