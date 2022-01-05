var router = require('koa-router')();
const controller = require('../controller/screen')

router.get('/', function *(next) {
  yield this.render('index', {
    title: 'Hello World Koa!'
  });
});

router.get('/foo', function *(next) {
  yield this.render('index', {
    title: 'Hello World foo!'
  });
});

router.get('/getscreen', controller.getScreen)

module.exports = router;
