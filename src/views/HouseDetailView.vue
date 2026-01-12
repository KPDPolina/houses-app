<script setup>
  import { onMounted, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useHousesStore } from '@/stores/houses'
  import { getHouse } from '@/api/houses'
  import HouseCard from '@/components/HouseCard.vue'
  import { computed } from 'vue'

  const route = useRoute()
  const router = useRouter()
  const houseId = route.params.id

  const currentHouses = ref([])
  const error = ref(null)
  const loading = ref(true)

  const housesStore = useHousesStore()

  onMounted(async () => {
    try{
      currentHouses.value = await getHouse(houseId)
      housesStore.fetchHouses()
    }catch(e){
      error.value = e.message
      console.error(e)
    }finally{
      loading.value = false
    }
  } )

  const formatPrice = (value) =>
    new Intl.NumberFormat('nl-NL').format(value)

  const recommendedHouses = computed(() => {
    return housesStore.houses
      .filter(h => h.id !== Number(route.params.id))
      .slice(0, 3)
  })
</script>



<template>
  <button class="back" @click="router.go(-1)">Back to overview</button>
  <div class="content">
    <div v-for="house in currentHouses" class="house-details" :key="house.id">
      <img class="main-img" :src="house.image" alt="house" />
      
      <div class="info">
        <h3> {{ house.location.street }} {{ house.location.houseNumber }}</h3>

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
    .info{
      h2{
        font-size: 1rem;
      }
    }
  }
</style>