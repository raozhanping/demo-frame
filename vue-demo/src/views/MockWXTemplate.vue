<template>
  <main class="mock-wx-template" ref="ddd">
    <script type="text/x-template" ref="custome-name" id="custome-name" >
      `<span>自定义模板</span>
      <span>自定义模板...</span>`
    </script>
    <section>
      <button class="btn" @click="addField">增加data字段</button>
      <button class="btn" @click="delField">删除data字段</button>
      <button class="btn" @click="pushList">list 添加</button>
      <button class="btn" @click="popList">list 删除</button>
      <button class="btn" @click="data.number++">number++数据</button>
      <button class="btn" @click="data.number--">number--数据</button>
      <p><code>{{JSON.stringify(data, null, 2)}}</code></p>
      </section>
    <textarea name="se-template" id="se-template" cols="50" rows="10" v-model="seTemplate">
    </textarea>

    <dynamic-component class="name" :se-template="seTemplate" :data="data"></dynamic-component>
  </main>
</template>
<script>
// @ is an alias to /src
// import Vue from 'vue'

export default {
  name: 'mock-wx-template',
  data() {
    return {
      data: {
        number: 1,
        string: '1',
        list: '1'.repeat(3).split('').map((_, index) => index),
        object: {
          a: 1,
        },
        toDelField: null
      },
      seTemplate: `<p>自定义模板</p>
<p>{{JSON.stringify(data)}}</p>
<p>number: {{number}} ----- string: {{string}}</p>
<p v-if="!toDelField">如果 toDelField 为假 显示</p>
<ol>
  <li @click="logThis" v-for="(item, index) in list">list-item: {{item}}---index: {{index}}</li>
  <li @click="logThis" v-for="(item, index) in toDelField">to-del-item: {{item}}---index: {{index}}</li>
</ol>`
    }
  },
  methods: {
    addField: function() {
      this.$set(this.data, 'toDelField', [1, 2, 3])
    },
    delField: function() {
      console.log('del')
      this.$delete(this.data, 'toDelField')
    },
    findField: function () {
      console.log('find')
    },
    updateData: function () {
      console.log('update')
      this.data.a = 4
    },
    pushList() {
      this.data.list.push(Math.floor((Math.random()*10)))
    },
    popList() {
      this.data.list.pop()
    }
  }
}
</script>
<style scoped>
.mock-wx-template {
  padding: 20px 15px 40px;
}
.btn {
  margin-right: 8px;
}
</style>
