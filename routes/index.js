var router = require('koa-router')()
const controller = require('../controller/screen')

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

module.exports = router
