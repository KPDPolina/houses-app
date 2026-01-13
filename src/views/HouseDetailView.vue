<script setup>
  import { onMounted, ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useHousesStore } from '@/stores/houses'
  import { getHouse, deleteHouse } from '@/api/houses'
  import HouseCard from '@/components/HouseCard.vue'
  import DeleteModal from '@/components/DeleteModal.vue'
  import { computed } from 'vue'

  const route = useRoute()
  const router = useRouter()
  let houseId = route.params.id

  const currentHouses = ref([])
  const house = ref({})
  const error = ref(null)
  const loading = ref(true)

  const housesStore = useHousesStore()

  const loadHouse = async (id) => {
    loading.value = true
    try{
      currentHouses.value = await getHouse(id)
      house.value = currentHouses.value[0]
      housesStore.fetchHouses()
      houseId = house.value.id
    }catch(e){
      error.value = e.message
      console.error(e)
    }finally{
      loading.value = false
    }
  }


  onMounted(() => {
    loadHouse(houseId)
  } )

  watch (
    () => route.params.id,
    (newId) => {
      loadHouse(newId)
    }
  )

  const formatPrice = (value) =>
    new Intl.NumberFormat('nl-NL').format(value)

  const recommendedHouses = computed(() => {
    if (!house.value.location) return []
    console.log(house);
    
    return housesStore.houses.filter((h) =>{
        return h.id !== Number(houseId) && 
                (h.location.city.toLowerCase().includes(house.value.location.city.toLowerCase()) ||
                h.location.zip.toLowerCase().includes(house.value.location.zip.toLowerCase()) ||
                h.location.street.toLowerCase().includes(house.value.location.street.toLowerCase()) ||
                Math.abs(h.constructionYear - house.value.constructionYear) <= 10 ||
                Math.abs(h.price - house.value.price) <= 500 ||
                Math.abs(h.size - house.value.size) <= 20 )})
      // .slice(0, 4)
  })

  const goToEdits = () => {
    router.push({ name: 'EditHouse', params: { id: houseId } })
  }

  // const deleteMyHouse = async () => {
  //   try {
  //     await deleteHouse(houseId)   // waiting for the server to delete the house
  //     housesStore.loaded = false // flag reset
  //     await housesStore.fetchHouses()     //  updating the store
  //     router.push({ name: 'Home'})
  //   } catch (error) {
  //     console.error('Error duuring deleting:', error)
  //   }
  // }

  const showDeleteModal = ref(false) 
  const confirmDelete = () => {
    showDeleteModal.value = true         // open the modal
  }

  const hideDeleteModal = () => {
    showDeleteModal.value = false          // close the modal
  }

  const deleteHouseConfirmed = async () => {
    try {
        await deleteHouse(houseId)   
        housesStore.loaded = false
        await housesStore.fetchHouses()
        showDeleteModal.value = false      // close the modal
        router.push({ name: 'Home' })
    } catch (error) {
        console.error('Error during deleting:', error)
    }
  }

</script>



<template>
  <button class="back" @click="router.push({ name: 'Home' })">Back to overview</button>
  <div class="content">
    <div v-for="house in currentHouses" class="house-details" :key="house.id">
      <img class="main-img" :src="house.image" alt="house" />
      
      <div class="info">
        <h3> {{ house.location.street }} {{ house.location.houseNumber }} {{ house.location.houseNumberAddition }}</h3>
        <!-- <button v-if="house.madeByMe" @click.stop="deleteMyHouse">X</button> -->
        <button v-if="house.madeByMe" @click.stop="confirmDelete">X</button>
        <button v-if="house.madeByMe" @click.stop="goToEdits">0</button>

        <div class="address">
          <img style="height: 14px;" src="../assets/ic_location@3x.png"/> {{ house.location.zip }} {{ house.location.city }}
        </div>

        <div class="meta">
          <span><img src="../assets/ic_price@3x.png"/> {{ formatPrice(house.price) }}</span>
          <span><img src="../assets/ic_size@3x.png"/> {{ house.size }} m2</span>
          <span><img src="../assets/ic_construction_date@3x.png"/>  Build in {{ house.constructionYear }}</span>
        </div>
        <div class="meta">
          <span><img src="../assets/ic_bed@3x.png"/> {{ house.rooms.bedrooms }}</span>
          <span><img src="../assets/ic_bath@3x.png"/> {{ house.rooms.bathrooms }}</span>
          <span><img src="../assets/ic_garage@3x.png"/> {{ house.hasGarage ? "Yes" : "No" }}</span>
        </div>
        <br/>
        <div class="description">{{ house.description }}</div>

      </div>
    </div>
    <div class="recommended-area"> 
      <p>Recommended for you</p>
      <HouseCard 
        class="recommended-hous"
        v-for="house in recommendedHouses"
        :key="house.id"
        :house="house"
      />
    </div>
  </div>

<DeleteModal 
:showDeleteModal="showDeleteModal"
@cancelDelete="hideDeleteModal"
@confirmDelete="deleteHouseConfirmed"
/>

</template>

<style >
  .info{
    padding: 10px;
  }
  .content{
    display: flex;
    flex-direction: row;
    gap: 4rem;
  }
  .house-details{
    width: 60vw;
    background-color: wheat;
  }
  .main-img{
    width: 100%;
  }
  .meta{
    display: flex;
    gap: 1rem;
  }
  .meta img{
    height: 12px;
  }
  .recommended-hous{
    padding: 10px;
    margin-bottom: 10px;
  }
  .recommended-hous .info h2{
    font-size: 1rem;
  }


</style>