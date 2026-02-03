<script setup>
/**
 * Checkbox component props
 * @prop {String} label - Text label displayed next to the checkbox
 * @prop {Boolean} modelValue - Current checked state (v-model)
 *
 * @event update:modelValue
 */
const props = defineProps({
  label: {
    type: String,
  },
  modelValue: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <label class="checkbox">
    <input
      type="checkbox"
      :checked="props.modelValue"
      @change="emit('update:modelValue', $event.target.checked)"
    />
    <span class="box"></span>
    {{ props.label }}
  </label>
</template>

<style scoped>
.checkbox {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
  font-family: var(--font-primary);
}

/* Hide native checkbox */
.checkbox input {
  display: none;
}

/* Visual box */
.box {
  width: 18px;
  height: 18px;
  border: 2px solid var(--color-element-primary);
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

/* When checked -> red background */
.checkbox input:checked + .box {
  background-color: var(--color-element-primary);
}
</style>
