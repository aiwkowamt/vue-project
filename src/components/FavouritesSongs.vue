<template>
    <div class="modalWindowContainer" v-if="isConfirmVisible">
      <div class="modalContent">
        <p class="text-bg">Уверены?</p>
        <button @click="handlerRemoveFromFavorites" class="btn btn-outline-danger">Да</button>
        <button @click="isConfirmVisible = false" class="btn btn-success">Нет</button>
      </div>
    </div>

    <div class='modalWindowContainer' v-if="isModalVisible">
      <div class="modalContent">
        <div v-for="playlist in playlists" :key="playlist">
          <button @click="handlerAddToPlaylist(playlist.name)" class="btn btn-outline-primary mb-3">{{ playlist.name }}</button>
        </div>
        <button @click="isModalVisible = false" class="btn btn-danger" >Отмена</button>
        <p v-if="playlists.length===0" class="alert alert-danger mt-3">У вас нету плейлистов, перейди в <router-link to="/Playlists" class="alert-link">плейлисты</router-link>, чтобы создать</p>
      </div>
    </div>

  <div class="row pb-3">
    <div v-for="song in favourites" :key="song.id" class="col-md-4">
      <div class="border p-3 d-flex flex-column justify-content-center align-items-center mt-3">
        <Song :song="song" :isShowBtnFv="false" :isShowBtnDlt="true" v-color/>
        <div class="btn-group">
          <button @click="showDetails(song.id)" class="btn btn-info btn-sm">Подробнее</button>
          <button @click="changeCurrentSong(song)" class="btn btn-primary btn-sm">В плейлист</button>
          <button @click="showConfirm(song)" class="btn btn-outline-danger btn-sm">Удалить</button>
        </div>
      </div>
    </div>
  </div>
  <div class="pb-1" v-if="favourites.length===0">
    <p class="alert alert-warning mt-3">Список избранного пуст, перейдите в <router-link to="/Search" class="alert-link">поиск</router-link>, чтобы добавить.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useSongsStore } from "@/stores/SongsStore";
import Song from "@/components/Song.vue";
const { favourites, playlists, getFavouritesSongs, addToPlaylist, removeFromFavorites, getPlaylists } = useSongsStore();

import { useRouter } from "vue-router";
const  router  = useRouter();
const showDetails = (id) => {
  router.push({ name: 'single-song', params: { id } });
};

const currentSong = ref(null);
const isModalVisible = ref(false);
const changeCurrentSong = (song) => {
  currentSong.value = song;
  isModalVisible.value = true;
};

const handlerAddToPlaylist = (playlistName) => {
  const playlist = playlists.value.find(playlist => playlist.name === playlistName);
  if (playlist && playlist.songs) {
    const songExistsInPlaylist = playlist.songs.some(song => song.id === currentSong.value.id);
    if (songExistsInPlaylist) {
      window.alert("Эта песня уже есть в этом плейлисте");
    } else {
      addToPlaylist(currentSong.value, playlistName);
    }
  } else {
    addToPlaylist(currentSong.value, playlistName);
  }
  isModalVisible.value = false;
};

const isConfirmVisible = ref(false);
const showConfirm = (song) => {
  currentSong.value = song;
  isConfirmVisible.value = true;
};

const handlerRemoveFromFavorites = () => {
  removeFromFavorites(currentSong.value);
  isConfirmVisible.value = false;
};

onMounted(() => {
  getFavouritesSongs();
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