<script setup>
  import { useRouter } from 'vue-router'
  import { deleteHouse } from '@/api/houses'
  import { useHousesStore } from '@/stores/houses'

  const housesStore = useHousesStore()
  const router = useRouter()

  const props = defineProps({
    house: {
      type: Object,
      required: true,
    },
  })
  
  const goToDetails = () => {
    router.push({ name: 'HouseDetail', params: { id: props.house.id } })
  }

  const goToEdits = () => {
    router.push({ name: 'EditHouse', params: { id: props.house.id } })
  }

  const formatPrice = (value) =>
    new Intl.NumberFormat('nl-NL').format(value)

  const deleteMyHouse = async () => {
    try {
      await deleteHouse(props.house.id)   // ждём, пока сервер удалит дом
      housesStore.loaded = false // сбросс флага
      await housesStore.fetchHouses()     //  обновляем стор
    } catch (error) {
      console.error('Error duuring deleting:', error)
    }
  }
</script>


<template>
  <div class="card" @click="goToDetails">
    <img class="preview" :src="house.image" alt="house" />

    <div class="info">
      <h2>{{ house.location.street }} {{ house.location.houseNumber }} {{ house.location.houseNumberAddition }}</h2>

      <div class="price">
        € {{ formatPrice(house.price) }}
      </div>

      <div class="address">
        {{ house.location.zip }} {{ house.location.city }}
      </div>

      <div class="meta">
        <span><img src="../assets/ic_bed@3x.png"/> {{ house.rooms.bedrooms }}</span>
        <span><img src="../assets/ic_bath@3x.png"/> {{ house.rooms.bathrooms }}</span>
        <span><img src="../assets/ic_size@3x.png"/> {{ house.size }} m2</span>
      </div>
    </div>
    <button v-if="house.madeByMe" @click.stop="deleteMyHouse">X</button>
    <button v-if="house.madeByMe" @click.stop="goToEdits">0</button>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.preview {
  width: 140px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}

.info {
  flex: 1;
  margin-left: 16px;
}

.price {
  font-weight: 600;
  margin: 4px 0;
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

.meta img{
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
</style>