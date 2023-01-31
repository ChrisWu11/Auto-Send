const Router = require('@koa/router')
const users = require('../../data/users')
const { generateToken } = require('../../core/util')
const Auth = require('../../middlewares/auth')

const tokenRouter = new Router({
  // 设置路由前缀 /token
  prefix: '/token'
})

// 检测用户名、密码，返回 token 接口
tokenRouter.post('/', async ctx => {
  const { username, password } = ctx.request.body

  const token = verifyUsernamePassword(username, parseInt(password))

  if (!token) {
    ctx.body = {
      errCode: 10001,
      msg: '用户名或密码不正确',
      request: `${ctx.method} ${ctx.path}`
    }
    return
  }
  ctx.cookies.set('token',token,{
    maxAge:60*1000*60
 });

  ctx.body = {
    token
  }
})

// 检测 token 的有效性
tokenRouter.post('/verify', async ctx => {
  const token = ctx.request.body.token
  const isValid = Auth.verifyToken(token)

  ctx.body = {
    isValid
  }
})

function verifyUsernamePassword(username, password) {
  const index = users.findIndex(user => {
    return user.username === username && user.password === password
  })

  const user = users[index]

  if (!user) {
    return
  }

  const token = generateToken(user.id, Auth.USER)

  return token
}

module.exports = tokenRouter