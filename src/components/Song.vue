<template>
  <div>
    <span>{{ song.name }}</span>
  </div>
</template>

<script>
export default {
  name: 'Song',
  props: {
    song: {
      type: Object,
      required: true
    }
  },
}
</script>
