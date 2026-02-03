<script setup>
const props = defineProps({
  showDeleteModal: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['cancelDelete', 'confirmDelete'])
const onCancelDelete = () => {
  emit('cancelDelete') //let the event close the modal
}

const onConfirmDelete = () => {
  emit('confirmDelete') //let's remove the house
}
</script>

<template>
  <div v-if="props.showDeleteModal" class="modal-overlay">
    <div class="modal">
      <h1>Delete listing</h1>
      <div class="modal-message">
        <p>Are you sure you want to delete this listing?</p>
        <p>This action cannot be undone.</p>
      </div>
      <button class="confirm-btn" @click="onConfirmDelete">YES, DELETE</button>
      <button class="reject-btn" @click="onCancelDelete">GO BACK</button>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  width: 35vw;
  padding: 3rem 2rem 4rem 2rem;
  border-radius: 8px;
  text-align: center;
  font-size: var(--font-secondary);
}

.modal .modal-message p {
  margin: 0;
  color: var(--color-text-secondary);
  font-weight: 400;
}

.modal-message {
  margin-bottom: 2rem;
}

.modal button {
  margin: 0 0.5rem;
  padding: 1rem 1rem;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  margin-top: 2rem;
  color: white;
  width: 65%;
}

.confirm-btn {
  background-color: var(--color-element-primary);
}
.reject-btn {
  background-color: var(--color-element-secondary);
}

@media screen and (max-width: 800px) {
  .modal {
    width: 90vw;
    font-size: 13px;
  }
  .modal .modal-message {
    margin-bottom: 1rem;
  }
  .modal button {
    margin: 0.3rem 0;
    padding: 0.6rem;
  }
}
</style>
