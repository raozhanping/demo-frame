<template>
<div class="about">
    <h1>This is an about page {{ _uid }}</h1>
    <template-def name="Staff" :scope="_uid" v-show="false" class="template-def">
      <template v-slot="_self">
        <div>
          <li>{{ staffA }}: {{ staffId }}</li>

          <template-def name="Staff1" :scope="_uid">
            <template v-slot="{ staffA, staffId }">
              <div>
                <li>{{ staffA }}: {{ staffId }}</li>
                <li>{{ other }}: {{ other }}</li>
              </div>
            </template>
          </template-def>
        </div>
      </template>
    </template-def>
    <ol>
      <template-ref
        v-for="(item, index) in staffList"
        :key="index"
        name="Staff1"
        :scope="_uid"
        :data="{ ...tData }"
      />
    </ol>
</div>
</template>
<script>
export default {
  data() {
    return {
      staffA: 'staffA',
      staffId: 'staffId',
      other: 'other',
      staffList: [1, 2, 3, 4],
      tData: {
        staffA: '11',
        staffId: '22'
      }
    }
  },
  beforeCreate() {
    console.log('About')
  },
  mounted() {
    console.log(this)
  }
}
</script>
