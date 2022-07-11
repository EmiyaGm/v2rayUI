var router = require('koa-router')()
const controller = require('../controller/screen')
const jwt = require('jsonwebtoken')

router.get('/', function* (next) {
  yield this.render('index', {
    title: 'Hello World Koa!',
  })
})

router.get('/foo', function* (next) {
  yield this.render('index', {
    title: 'Hello World foo!',
  })
})

router.get('/getscreen', function* (next) {
  yield this.render('index', {
    title: 'Hello World screen!',
    shell: '',
  })
})

router.get('/screen', function* (next) {
  this.body = {
    result: '123',
  }
  // controller.getScreen(this)
})

router.post('/login', async (ctx) => {
  try {
    const {username, password} = ctx.request.body
  } catch (error) {
    
  }
})

module.exports = router
