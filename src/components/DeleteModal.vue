<script setup>
    // import {ref} from "vue"

    const props = defineProps({
    showDeleteModal: {
      type: Boolean,
      required: true,
    },
  })
    
  const emit = defineEmits(['cancelDelete', 'confirmDelete'])
  const onCancelDelete = () => {
    emit('cancelDelete')        //let the event close the modal
  }

  const onConfirmDelete = () => {
    emit('confirmDelete')        //let's remove the house
  }
    
</script>

<template>
  <div v-if="props.showDeleteModal" class="modal-overlay">
    <div class="modal">
      <p>Are you sure you want to delete this house?</p>
      <button @click="onConfirmDelete">Yes</button>
      <button @click="onCancelDelete">No</button>
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
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    text-align: center;
  }

  .modal button {
    margin: 0 0.5rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
</style>