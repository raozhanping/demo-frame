<template>
  <section class="example">
    Page Example
    <button @click="sendRequest">Send request to mp.360.cn</button>
  </section>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'

export default {
  name: 'example',
  components: {
  },
  beforeCreate() {
    console.log('Example', process.env.NODE_ENV)
  },
  data() {
    return {}
  },
  methods: {
    sendRequest(e) {
      // e.currentTarget = {a: 1}
      console.log(e, Object.getOwnPropertyDescriptors(e.__proto__))
      axios.get(`${process.env.HOST}/data/city.json`).then(res => {
          console.log(res)
        }).catch(error => {
          console.log('error', error)
        })
    }
  },
  computed: {}
}
</script>

<style lang="less" scoped>
.example {

}
</style>
