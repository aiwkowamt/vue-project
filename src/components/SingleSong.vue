<template>
  <div class="pt-3">
    <div v-if="song" class="card">
      <a :href="song.external_urls.spotify" target="_blank" class="btn btn-lg btn-secondary mt-3">Открыть полную песню в Spotify: {{ song.name }}</a>

      <div class="card-body mt-3">
        <h5 class="card-title">Исполнитель: {{ song.artists[0].name }}</h5>
        <p class="card-text">Длительность: {{ formatDuration(song.duration_ms) }}</p>
        <p class="card-text">Дата релиза альбома: {{ song.album.release_date }}</p>
        <img :src="song.album.images[0].url" alt="Обложка альбома" class="img-fluid mx-auto">
        <p class="card-text">Популярность: {{ song.popularity }}</p>
        <p class="card-text">Доступные рынки: {{ song.available_markets.join(', ') }}</p>
      </div>
    </div>
    <div v-else class="pb-1">
      <p  class="alert alert-warning mt-1">Песня не найдена</p>
    </div>
  </div>
</template>


<script setup>
import { computed } from "vue";
import { useSongsStore } from "@/stores/SongsStore";
import { useRoute } from "vue-router";

const route = useRoute();
const { favourites } = useSongsStore();

const song = computed(() => {
  return favourites.value.find((song) => song.id === route.params.id);
});

const formatDuration = (durationMs) => {
  const seconds = Math.floor(durationMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes} минут ${remainingSeconds} секунд`;
};
</script>
