const spawn = require('child_process').spawn
const iconv = require('iconv-lite')

exports.getScreen = async (ctx) => {
  // 这货第一个参数就是命令本身, 后面的参数要放在数组里, 我最开始把 ping baidu.com 当成命令了, -t 当成参数, 死活没有数据输出
  const processObj = spawn('ping', ['www.baidu.com']) // 这个方法后面有个参数可以指定编码, 我这设置没有用..

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

  return true;
}
