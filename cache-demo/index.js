const Koa = require('koa')
const resource = require('koa-static')
const path = require('path')
const etag = require('koa-etag')
const conditional = require('koa-conditional-get')

const app = new Koa()
app.use(conditional())
app.use(etag())
// app.use(async (ctx, next) => {
//   ctx.set('Cache-Control', 'max-age=30')
//   await next()
// })
app.use(resource(path.join(__dirname, './static')))

app.listen(8080, 'localhost', () => {
  console.log(`Server is listenning port 8080.`)
})
