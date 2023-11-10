<template>
  <div style="max-width: 1200px; margin: 0 auto;"  class="scroll-container mt-3 mb-4">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style="padding-left: 10px;">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/Home" class="nav-link">Главная</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/Search" class="nav-link">Поиск</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/FavouritesSongs" class="nav-link">Избранное</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/Playlists" class="nav-link">Плейлисты</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/AboutUs" class="nav-link">О нас</router-link>
        </li>
      </ul>

      <div class="navbar-nav ms-auto">
        <router-link to="/Register" class="nav-link" v-if="!isLoggedIn"
        >Регистрация</router-link
        >
        <router-link to="/SignIn" class="nav-link" v-if="!isLoggedIn"
        >Войти</router-link
        >
        <button @click="handleSignOut" v-if="isLoggedIn" class="btn nav-link"
        >Выйти</button
        >
      </div>

      <div class="nav-item">
        <span class="text-white" style="margin-right: 10px;" v-if="isLoggedIn"> из {{ acc.email }}</span>
      </div>
    </nav>
    <div class="container" style="background-color: white;">
      <router-view></router-view>
    </div>

  </div>
</template>


<script setup>
import {onMounted, ref} from 'vue';
import {getAuth, onAuthStateChanged, signOut} from 'firebase/auth'
import router from "@/router/router";

const isLoggedIn = ref (false);
const acc = ref ('');

let auth;
onMounted(()=> {
  auth = getAuth();
  onAuthStateChanged(auth, (user)=> {
    if (user) {
      isLoggedIn.value = true;
      acc.value = {...user};
    } else {
      isLoggedIn.value = false;
    }
  });
});
const handleSignOut = () => {
  signOut(auth).then(()=> {
    router.push('/SignIn');
    localStorage.removeItem('userUID');
  });
};
</script>

