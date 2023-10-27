<template>
  <div>
    <div v-for="song in artistTopSongs" :key="song.id">
      <Song :song="song" />
    </div>
  </div>
</template>

<script>
import Song from "@/components/Song.vue";
import { useArtistTopSongsStore } from "@/store/AtristTopSongsStore";
import { mapActions, mapState } from "pinia";

export default {
  name: 'ArtistTopSongs',
  components: {
    Song
  },

  methods: {
    ...mapActions(useArtistTopSongsStore, ['getTopSongs'])
  },

  computed: {
    ...mapState(useArtistTopSongsStore, ['artistTopSongs'])
  },

  mounted() {
    this.getTopSongs();
  }
}
</script>