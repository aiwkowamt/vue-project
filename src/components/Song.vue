<template>
  <div class="d-flex flex-column align-items-center">
    <img v-if="song.album" :src="song.album.images[0].url" class="img">
    <div class ="text-center mt-3"><strong>{{ song.artists[0].name }}</strong></div>
    <div class="text-center mb-3">{{ song.name }} </div>

    <audio controls class="mb-3">
      <source :src="song.preview_url" type="audio/mpeg">
    </audio>
  </div>
</template>


<script setup>
import { ref } from 'vue';

const props = defineProps({
  song: {
    type: Object,
    required: true
  }
});

const song = ref(props.song);
</script>

<style scoped>
.img {
  width: 275px;
  height: 275px;
}
</style>
