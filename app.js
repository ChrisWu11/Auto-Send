const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const contentRouter = require('./app/api/content')

const app = new Koa()


app.use(bodyParser())

app.use(contentRouter.routes())

app.listen(5000)
console.log('5000端口服务器已启动')