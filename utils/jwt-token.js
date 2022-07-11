const jwt = require('jsonwebtoken') // 用于签发、解析`token`
const jwtSecret = 'jwtSecret'
const tokenExpiresTime = 60 * 60 * 4 // 4小时
/* 获取一个期限为4小时的token */
function getToken(payload = {}) {
  return jwt.sign(payload, jwtSecret, { expiresIn: tokenExpiresTime })
}

/* 通过token获取JWT的payload部分 */
function getJWTPayload(token) {
  // 验证并解析JWT
  return jwt.verify(token.split(' ')[1], jwtSecret)
}

/* 通过token获取JWT的payload部分 */
function getJWTPayComplete(token) {
  // 验证JWT
  return jwt.verify(token.split(' ')[1], jwtSecret, {
    complete: true,
  })
}

function tokenVerify(token) {
  if (token) {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        switch (err.name) {
          case 'JsonWebTokenError':
            res.status(403).send({ code: -1, msg: '无效的token' })
            break
          case 'TokenExpiredError':
            res.status(403).send({ code: -1, msg: 'token过期' })
            break
        }
      }
    })
  }
}

module.exports = {
  getToken,
  getJWTPayload,
  getJWTPayComplete,
}
