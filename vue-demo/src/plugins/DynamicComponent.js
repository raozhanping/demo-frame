function install(Vue) {
  // v-template
  // departed

  // dynamic-component
  // 缓存render content
  const mixin = {
    template: ''
  }

  Vue.component('dynamicComponent', {
    mixins: [mixin],
    props: ['se-data', 'se-template', 'se-template-name'],
    data() {
      this.$identifier = Object.keys(this.seData)
      const result = Object.assign({}, {
        ...this.seData,
      })
      return result
    },
    methods: {
      logThis: function () {
        console.log('dynamic component', this, this.$identifier)
      }
    },
    beforeCreate() {
      const { propsData: { seTemplate, seTemplateName }, setRender } = this.$options
      setRender.call(this, seTemplate[seTemplateName])
    },
    beforeUpdate() {
      this.$options.updateData.call(this)
    },

    setRender(html='') {
      html = `<section>${html}</section>`
      const res = Vue.compile(html)
      console.log(this)
      this.$options = Object.assign(this.$options, res)
    },
    updateData() {
      const that = this
      const newIdentifier = Object.keys(that.seData)
      // clear $identifier data
      this.$identifier.forEach(key => {
        that[key] = null
      })
      // update identifier data
      newIdentifier.forEach(key => {
        that[key] = that.seData[key]
      })
      // update $identifier
      that.$identifier = newIdentifier
    }
  })
}

export default class DynamicComponent {
  static install = install
}
