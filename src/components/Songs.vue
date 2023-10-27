<template>
  <div>

    <div v-for="song in songs" :key="song.id">
      <Song :song="song" />
    </div>

    <div>
      <button @click="prevPage" :disabled="!hasMorePages">Назад</button>
      <button @click="nextPage" :disabled="!hasMorePages">Вперед</button>
    </div>

  </div>
</template>

<script>
import Song from "@/components/Song.vue";
import {usePaginationStore} from "@/store/PaginationStore";
import {useSongsStore} from "@/store/SongsStore";
import { mapActions, mapState } from "pinia";

export default {
  name: 'Songs',
  components: {
    Song
  },

  methods: {
    ...mapActions(useSongsStore, ['getSongs']),
    ...mapActions(usePaginationStore, ['hasMorePages','nextPage', 'prevPage']),
  },

  computed: {
    ...mapState(usePaginationStore, ['songs'])
  },

  mounted() {
    this.getSongs();
  }
}
</script>