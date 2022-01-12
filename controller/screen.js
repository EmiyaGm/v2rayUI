const spawn = require('child_process').spawn
const iconv = require('iconv-lite')

exports.getScreen = async (ctx) => {
  const processObj = spawn('ping', ['www.baidu.com', '-t', '10'])

  // 监听执行命令输出内容事件
  processObj.stdout.on('data', function (thunk) {
    console.log(iconv.decode(thunk, 'cp936'))
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

  return true
}
