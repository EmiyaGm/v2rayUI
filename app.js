var app = require('koa')(),
  logger = require('koa-logger'),
  json = require('koa-json'),
  views = require('koa-views'),
  onerror = require('koa-onerror'),
  WebSocket = require('ws')

var index = require('./routes/index')
var users = require('./routes/users')

const spawn = require('child_process').spawn
const iconv = require('iconv-lite')

// error handler
onerror(app)

// global middlewares
app.use(
  views('views', {
    root: __dirname + '/views',
    default: 'ejs',
  }),
)
app.use(require('koa-bodyparser')())
app.use(json())
app.use(logger())

app.use(function* (next) {
  var start = new Date()
  yield next
  var ms = new Date() - start
  console.log('%s %s - %s', this.method, this.url, ms)
})

app.use(require('koa-static')(__dirname + '/public'))

// routes definition
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

const wss = new WebSocket.Server({
  path: '/ping',
  port: 3001,
})

wss.on('connection', (ws) => {
  ws.wss = wss
  console.log('服务端：客户端已连接')
  ws.on('message', function (msg) {
    msg = msg.toString()
    if (msg === 'ping') {
      const processObj = spawn('ping', ['www.baidu.com', '-t', '10'])
      // 监听执行命令输出内容事件
      processObj.stdout.on('data', function (thunk) {
        ws.send(iconv.decode(thunk, 'cp936'), (err) => {})
      })

      processObj.stderr.on('data', function (data) {
        console.log('stderr: ', data.toString())
      })

      processObj.on('close', function (code) {
        console.log('close: ', code)
      })

      processObj.on('exit', function (code) {
        console.log('exit: ', code)
      })
    }
  })
})

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
