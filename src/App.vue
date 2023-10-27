<template>
  <router-link to="/Songs">Songs</router-link>
  <router-link to="/ArtistTopSongs">ArtistTopSongs</router-link>

  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',

}
</script>