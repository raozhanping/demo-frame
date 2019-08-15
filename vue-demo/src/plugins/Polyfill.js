function install(Vue) {
  // v-template
  // departed

  // dynamic-component
  // 缓存render content
  const mixin = {
    props: ['se-template'],
    beforeCreate() {
      const { propsData: { seTemplate }, setRender } = this.$options
      setRender.call(this, seTemplate)
    },
    setRender(html='') {
      html = `<section>${html}</section>`
      const res = Vue.compile(html)
      this.$options = Object.assign(this.$options, res)
    },
    template: ''
  }

  Vue.component('dynamicComponent', {
    mixins: [mixin],
    props: ['data'],
    data() {
      this.$identifier = Object.keys(this.data)
      const result = Object.assign({}, this.data, {
        ...this.data,
      })
      return result
    },
    methods: {
      logThis: function () {
        console.log('dynamic component', this, this.$identifier)
      }
    },
    beforeUpdate() {
      this.$options.updateData.call(this)
    },
    updateData() {
      const that = this
      const newIdentifier = Object.keys(that.data)
      // clear $identifier data
      this.$identifier.forEach(key => {
        that[key] = null
      })
      // cover $identifier
      that.$identifier = newIdentifier
      // update identifier data
      newIdentifier.forEach(key => {
        that[key] = that.data[key]
      })
    }
  })
}

export default class Polyfill {
  static install = install
}
