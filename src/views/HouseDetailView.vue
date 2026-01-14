<script setup>
  import '../assets/base.css'
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
  <div class="back-btn">
    <img src="../assets/ic_back_grey@3x.png" class="back" @click="router.push({ name: 'Home' })"/>
    <h4>Back to overview</h4>
  </div>
  <div class="content">
    <div v-for="house in currentHouses" class="house-details" :key="house.id">
      <img class="main-img" :src="house.image" alt="house" />
      
      <div class="detail">
        <div class="detail-header">
          <h2> {{ house.location.street }} {{ house.location.houseNumber }} {{ house.location.houseNumberAddition }}</h2>
          <!-- <button v-if="house.madeByMe" @click.stop="deleteMyHouse">X</button> -->
           <div class="detail-actions">
             <img class="my-house-actions" src="../assets/ic_edit@3x.png" v-if="house.madeByMe" @click.stop="goToEdits"/>
             <img class="my-house-actions" src="../assets/ic_delete@3x.png" v-if="house.madeByMe" @click.stop="confirmDelete"/>
            </div>
        </div>

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
        <div class="description">{{ house.description }}</div>

      </div>
    </div>
    <div class="recommended-area"> 
      <h3>Recommended for you</h3>
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

<style>

  .back-btn{
    display: flex;
    align-items: center;
  }

  .back{
    height: 1.1rem;
    margin-right: 0.6rem;
    cursor: pointer;
  }

  .detail{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0.8rem 1.8rem;
    font-family: var(--font-secondary);
    color: var(--color-text-secondary);
    font-weight: 600;
    font-size: 16px;
  }

  .detail-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: var(--font-primary);
    color: var(--color-text-primary);
  }

  .detail-header h2{
    margin-bottom: 0;
  }
  
  .my-house-actions{
    margin: 0.5rem 1rem 0.5rem 0;
    height: 1.2rem;
  }

  .content{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    /* gap: 3rem; */
  }

  .house-details{
    height: max-content;
    width: 42vw;
    background-color: var(--color-element-background-2);
    cursor: pointer;
  }

  .main-img{
    width: 100%;
  }

  .meta{
    display: flex;
    gap: 1rem;
    
  }

  .meta span{
    display: flex;
    align-items: center;
  }

  .meta img{
    height: 1rem;
    margin-right: 0.4rem;
  }

  .description{
    font-size: 16px;
    font-weight: 500;
    line-height: 180%;
  }

  .recommended-area h3{
    margin-top: 0;
  }

  .recommended-area .card{
    margin: 1rem 0;
    padding-right: 5rem;
    
  }

  .recommended-area .card .preview{
    width: 5.7rem;
    height: 5.7rem;
  }


  .recommended-area .card .info div{
    font-size: 0.7rem;
  }
    
  .recommended-area .card .info h2{
    font-size: 0.8rem;
  }

  .recommended-area .card .my-house-actions{
    display: none;
  }

  .recommended-hous{
    padding: 10px;
    margin-bottom: 10px;
  }

  .recommended-hous .info h2{
    font-size: 1rem;
  }


</style>