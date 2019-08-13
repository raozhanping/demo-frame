<template>
  <section class="mock-wx-template">
    <template v-template name="customeName">
      <view>自定义模板</view>
      <span>自定义模板...</span>
    </template>
  </section>
</template>

<script>
// @ is an alias to /src
Vue.directive('template', {
  
})
export default {
  name: 'mock-wx-template',
  components: {
  }
}
</script>
<style scoped>
.mock-wx-template {
  padding: 20px 15px 40px;
}
</style>
