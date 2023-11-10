<template>
  <div class="modalWindowContainer" v-if="isConfirmVisible">
    <div class="modalContent">
      <p class="text-bg">Уверены?</p>
      <button @click="handlerRemovePlaylist" class="btn btn-outline-danger">Да</button>
      <button @click="isConfirmVisible = false" class="btn btn-success">Нет</button>
    </div>
  </div>
  <button class="btn btn-outline-dark btn-lg mb-3 mt-3" @click="isWindowVisible = true" v-if="!isWindowVisible">Создать плейлист</button>
  <div v-if="playlists.length === 0 && !isWindowVisible" class="pb-1">
    <p class="alert alert-warning">У вас нету плейлистов</p>
  </div>

  <div v-if="isWindowVisible" class="pt-3 pb-1">
    <input v-model="playlistName" placeholder="Введите название плейлиста" class="form-control mb-3">
    <div class="btn-group mb-3" >
      <button @click="isWindowVisible = false" class="btn btn-outline-danger">Отмена</button>
      <button @click="handlerCreatePlaylist" class="btn btn-success" :disabled="isInvalidName">Создать</button>
    </div>
    <p v-if="isInvalidName" class="alert alert-danger mb-3">Введите от 4 до 20 букв и/или цифр, не использовать одинаковые имена плейлистов</p>
  </div>


  <div v-for="playlist in playlists" :key="playlist">
    <div class="btn-group mb-3" >
      <button class="btn btn-outline-danger btn-sm" @click="showConfirm(playlist.name)">Удалить</button>
      <button class="btn btn-outline-secondary btn-sm" @click="selectedPlaylist = playlist.name">{{ playlist.name }}</button>
    </div>
  </div>

  <div v-if="selectedPlaylist" class="pb-3">
      <p class="text-center font-bold"><strong>{{ selectedPlaylist }}</strong></p>
      <div class="row">
        <div class="col-md-4" v-for="song in selectedPlaylistSongs" :key="song.id">
          <div class="border p-3 d-flex flex-column justify-content-center align-items-center mt-3">
            <Song :song="song" />
            <button class="btn btn-outline-danger mt-3 btn-sm" @click="removeFromThisPlaylist(song, selectedPlaylist)">Удалить</button>
          </div>
        </div>
      </div>
      <p v-if="selectedPlaylistSongs.length === 0" class="alert alert-warning">Плейлист пуст, перейдите в  <router-link to="/FavouritesSongs" class="alert-link">избранное</router-link>, чтобы добавить песни.</p>
    </div>

</template>

<script setup>
import Song from "@/components/Song.vue";
import { useSongsStore } from "@/stores/SongsStore";
import { ref, computed, onMounted } from "vue";

const { playlists, createPlaylist, removePlaylist, removeFromThisPlaylist, getPlaylists } = useSongsStore();
const selectedPlaylist = ref(null);
const playlistName = ref("");

const isInvalidName = computed(() => {
  return (
      playlistName.value.length < 4 ||
      playlistName.value.length > 20 ||
      playlists.value.some(playlist => playlist.name === playlistName.value)
  );
});

const isConfirmVisible = ref(false);
const currentPlaylist = ref(null);
const showConfirm = (playlistName) => {
  currentPlaylist.value = playlistName;
  isConfirmVisible.value = true;
}
const handlerRemovePlaylist = () => {
  removePlaylist(currentPlaylist.value);
  isConfirmVisible.value = false;
  selectedPlaylist.value = null;
};

const isWindowVisible = ref(false);

const handlerCreatePlaylist = () => {
  if (!isInvalidName.value) {
    createPlaylist(playlistName.value);
    isWindowVisible.value = false;
    playlistName.value = "";
  }
};

const selectedPlaylistSongs = computed(() => {
  return playlists.value.find(playlist => playlist.name === selectedPlaylist.value)?.songs || [];
});

onMounted(() => {
  getPlaylists();
});
</script>

<style>
.modalWindowContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modalContent {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  backdrop-filter: blur(10px);
}
</style>