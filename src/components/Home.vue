<template>
  <div class="container pb-4">
    <div class="row">
      <div id="images" class="col-md-4">
        <img src="https://i.pinimg.com/564x/52/60/8f/52608f47436b235524d841d866f464c2.jpg">
        <img src="https://i.pinimg.com/564x/7b/d8/07/7bd8074be04366e786fe612d1dc36d9e.jpg">
        <img src="https://i.pinimg.com/564x/9a/6e/9f/9a6e9ff745e962368e62d220ced5ea7c.jpg">
        <img src="https://i.pinimg.com/564x/e1/76/a7/e176a71c8411c3d32ab1f87dae795783.jpg">
        <img src= "https://i.pinimg.com/564x/15/79/96/1579963ae498a070913f94c4e6da65b7.jpg">
      </div>
      <div id="songs" class="col-md-8">
        <div v-for="song in favourites" :key="song.id" class="mb-3">
          <Song :song="song" :isShowBtnFv="false" :isShowBtnDlt="true" v-color class="border pb-3" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#images {
  width: 50%;
  display: flex;
  flex-direction: column;
}

img{
  margin-top: 30px;
  margin-left: 10px;
}

#songs {
  margin-top: 30px;
  max-width: 30%;
  margin-left: 10%;
  display: flex;
  flex-direction: column;
}
</style>


<script setup>
import { ref, onMounted } from "vue";
import { useSongsStore } from "@/stores/SongsStore";
import Song from "@/components/Song.vue";
const { favourites, getFavouritesSongs } = useSongsStore();

onMounted(() => {
  getFavouritesSongs();
});
</script>