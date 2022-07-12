var router = require('koa-router')()
const controller = require('../controller/screen')
const jwt = require('jsonwebtoken')

router.get('/', async (ctx) => {
  ctx.body = '123123'
})

router.post('/login', async (ctx) => {
  try {
    const { username, password, type } = ctx.request.body
    // TODO 验证用户
    console.log(ctx.request.body)
    ctx.body = {
      status: 'ok',
      type,
      currentAuthority: 'admin',
    }
  } catch (error) {
    console.log(error)
  }
})

router.post('/currentUser', async (ctx) => {
  try {
    // TODO 获取当前登录用户信息
  } catch (error) {
    
  }
})

module.exports = router
