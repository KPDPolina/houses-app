<script setup>
/**
 * The current value of the search input.
 * @type {string}
 */
defineProps({
  modelValue: String,
})

/**
 * Emits when the input value changes.
 * @event update:modelValue
 */
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="search">
    <img src="../assets/ic_search@3x.png" class="search-icon" />

    <input
      type="text"
      placeholder="Search for a house"
      :value="modelValue"
      @input="emit('update:modelValue', $event.target.value)"
    />

    <img
      v-if="modelValue.length"
      src="../assets/ic_clear@3x.png"
      class="clear-btn"
      @click="emit('update:modelValue', '')"
    />
  </div>
</template>

<style>
.search {
  position: relative;
  width: 22rem;
}

.search input {
  font-family: var(--font-primary);
  width: 100%;
  padding: 0.8rem 3rem 0.8rem 3.5rem;
  border-radius: 10px;
  border: none;
  color: var(--color-text-secondary);
  background-color: var(--color-element-tertiary-light);
  outline: none;
}

.search input::placeholder {
  font-family: var(--font-primary);
  color: var(--color-element-tertiary-dark);
  left: 0.8rem;
}

.search-icon {
  position: absolute;
  height: 1.1rem;
  left: 1.3rem;
  top: 50%;
  transform: translateY(-50%);
  color: #777;
  pointer-events: none;
}

.clear-btn {
  height: 1.3rem;
  position: absolute;
  right: 10px;
  top: 25%;
  cursor: pointer;
}
</style>
