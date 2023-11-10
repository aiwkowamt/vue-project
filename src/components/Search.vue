<template>

  <div class="input-group mb-3 pt-3">
    <input placeholder="Введите название" v-model="searchInput" class="form-control" />
    <button @click="startSearch" class="btn btn-primary">Поиск</button>
  </div>

  <div class="row">
    <div v-for="song in search" :key="song.id" class="col-md-4">
      <div class="border p-3 d-flex flex-column justify-content-center align-items-center mt-3">
        <Song :song="song" />
        <button @click="addToFavorites(song)" :class="{'btn btn-outline-success': !song.isInFavorites, 'btn btn-success': song.isInFavorites }">Нравится</button>
      </div>
    </div>
  </div>

</template>

<script setup>
import Song from "@/components/Song.vue";
import { ref, computed, onMounted } from "vue";
import { useSongsStore } from "@/stores/SongsStore";

const searchInput = ref('');
const { search, searchSong, addToFavorites } = useSongsStore();

const startSearch = () => {
  searchSong(searchInput.value);
};

onMounted(() => {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || {};
  for (const song of search.value) {
    if (favorites[song.id]) {
      song.isInFavorites = true;
    }
  }
});
</script>