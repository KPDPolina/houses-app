<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { deleteHouse } from '@/api/houses'
import { useHousesStore } from '@/stores/houses'
import DeleteModal from '@/components/DeleteModal.vue'

const housesStore = useHousesStore()
const router = useRouter()

const props = defineProps({
  house: {
    type: Object,
    required: true,
  },
})

const goToDetails = (id) => {
  router.push({ name: 'HouseDetail', params: { id: id } })
}

const goToEdits = () => {
  router.push({ name: 'EditHouse', params: { id: props.house.id } })
}

const formatPrice = (value) => new Intl.NumberFormat('nl-NL').format(value)

const showDeleteModal = ref(false)
const confirmDelete = () => {
  showDeleteModal.value = true // open modal
}

const hideDeleteModal = () => {
  showDeleteModal.value = false // close modal
}

const deleteHouseConfirmed = async () => {
  try {
    await deleteHouse(props.house.id)
    housesStore.loaded = false
    await housesStore.fetchHouses()
    showDeleteModal.value = false // close modal
  } catch (error) {
    console.error('Error during deleting:', error)
  }
}
</script>

<template>
  <div class="card" @click="goToDetails(house.id)">
    <img class="preview" :src="house.image" alt="house" />

    <div class="info">
      <h2>
        {{ house.location.street }} {{ house.location.houseNumber }}
        {{ house.location.houseNumberAddition }}
      </h2>

      <div class="price">€ {{ formatPrice(house.price) }}</div>

      <div class="address">{{ house.location.zip }} {{ house.location.city }}</div>

      <div class="meta">
        <span><img src="../assets/ic_bed@3x.png" /> {{ house.rooms.bedrooms }}</span>
        <span><img src="../assets/ic_bath@3x.png" /> {{ house.rooms.bathrooms }}</span>
        <span><img src="../assets/ic_size@3x.png" /> {{ house.size }} m2</span>
      </div>
    </div>
    <img
      class="my-house-actions"
      src="../assets/ic_edit@3x.png"
      v-if="house.madeByMe"
      @click.stop="goToEdits"
    />
    <img
      class="my-house-actions"
      src="../assets/ic_delete@3x.png"
      v-if="house.madeByMe"
      @click.stop="confirmDelete"
    />
  </div>

  <DeleteModal
    :showDeleteModal="showDeleteModal"
    @cancelDelete="hideDeleteModal"
    @confirmDelete="deleteHouseConfirmed"
  />
</template>

<style scoped>
.card {
  display: flex;
  align-items: start;
  background: #fff;
  border-radius: 5px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  cursor: pointer;
}

.preview {
  width: 9rem;
  height: 9rem;
  object-fit: cover;
  border-radius: 8px;
}

.info {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 16px;
  gap: 0.3rem;
}

.info h2 {
  margin-bottom: 0.2rem;
  margin-top: 0.5rem;
}

.price {
  font-weight: 600;
}

.address {
  color: #888;
  font-size: 14px;
}

.meta {
  display: flex;
  gap: 12px;
  margin-top: 8px;
  font-size: 14px;
  color: #555;
}

.meta img {
  height: 12px;
}

.actions {
  display: flex;
  gap: 8px;
}

.icon {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

.my-house-actions {
  height: 1.1rem;
  margin: 0.4rem;
  cursor: pointer;
}

@media (max-width: 800px) {
  .preview {
    width: 7rem;
    height: 7rem;
    object-fit: cover;
    border-radius: 8px;
  }
}
</style>
