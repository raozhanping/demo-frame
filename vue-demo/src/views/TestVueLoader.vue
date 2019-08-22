<template>
<section class="test-view-loader">
  <div poster="../assets/audio.mp3">TestVueLoader</div>
</section>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'TestVueLoader',
  components: {
  },
  data() {
    return {
      a: 1
    }
  },
  methods: {

  },
  computed: {}
}
</script>

<style scoped>
.test-view-loader {
  font-size: 20px;
}
</style>
