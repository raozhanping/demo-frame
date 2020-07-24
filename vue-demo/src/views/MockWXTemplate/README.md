## MockWXTemplate
> wxmp template 拥有自己独立的作用域

## 背景
定义模板  

```html
<template name="msgItem">
  <view>
    <text> {{index}}: {{msg}} </text>
    <text> Time: {{time}} </text>
  </view>
</template>
```

使用模板  
```html
<template is="msgItem" data="{{...item}}"/>
```
```js
Page({
  data: {
    item: {
      index: 0,
      msg: 'this is a template',
      time: '2016-09-15'
    }
  }
})
```
