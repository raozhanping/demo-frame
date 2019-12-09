export default class TemplateDef {
  static install(Vue) {
    Vue.prototype.$getAncestor = function(scope) {
      let parent = this.$parent
      // console.log(11, parent)
      while (parent) {
        if (parent._uid === scope) {
          return parent
        }

        parent = parent.$parent
      }

      return null
    }

    // TODO
    // 通过 scope 解决了单文件组件内的引用问题
    // 那么 <import /> 如何解决呢？恐怕只能强行读取写入了吧.......
    // 需要拿小程序开发者工具做更多的试验
    Vue.component('template-def', {
      props: {
        name: { type: String, required: true },
        scope: { type: Number, required: true }
      },
      beforeMount() {
        // 隐藏 template-ref
        this.$vnode.data.staticStyle = {display: "none!important"}
      },
      render() {
        const { name, scope } = this
        let p = this.$getAncestor(scope)

        if (!p) {
          console.warn(
            `Could not find an ancestor to register <template-def name="${name}">.`
          )
          return null
        }
        p.__templates = p.__templates || Object.create(null)
        p.__templates[name] = this.$scopedSlots.default

        return p.__templates[name]({ ...this, _uid: scope })
      }
    })

    Vue.component('template-ref', {
      props: {
        name: { type: String, required: true },
        scope: { type: Number, required: true },
        data: { type: Object, required: false }
      },
      render() {
        const { name, scope, data } = this

        const p = this.$getAncestor(scope)
        const templates = p ? p.__templates : null

        if (!templates || !templates[name]) {
          console.warn(`Template is ${name} undefined.`)
          return null
        }

        return templates[name](data)
      }
    })
  }
}
