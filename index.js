const express = require('express')
const cors = require('cors')

// global.appRoot를 사용하면 이 루트경로의 정보를 가져올 수 있다.
global.appRoot = __dirname

const app = express()
app.use(express.json())
app.use(cors()) // 들어오는 모든 요청 허용
app.use('/api/todos', require('./routes/api/todos.js'))

// app.use('/', (req, res) => {
//   res.status(200).json({
//     name: 'Sun!!!'
//   })
// })

// port번호가 로컬에선 없으니 1234가 쓰이고 헤로쿠나 다른 곳에서는 그곳의 port번호를 쓴다.
const port = process.env.PORT || 1234
// http://localhost:1234/  => 위 app.use('/')에서 /가 1234뒤의 /을 말한다.
// http://localhost:1234/api/todos?a=1&b=sun  => 위 app.use('/')에서 /가 1234뒤의 /을 말한다.
app.listen(1234, () => {
  console.log('서버 동작중!~')
})
