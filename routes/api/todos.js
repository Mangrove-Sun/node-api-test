const fs = require('fs')
const { nanoid } = require('nanoid')
const express = require('express')
const router = express.Router()

// 경로 변수에 담기
const todosDir = `${global.appRoot}/todos`
const todosFile = `${global.appRoot}/todos/index.json`

// Read
router.get('/', (req, res) => {
  const todos = JSON.parse(fs.readFileSync(todosFile, 'utf8'))
  
  res.status(200).json(todos)
})

// Create
router.post('/', (req, res) => {
  const { title } = req.body
  let todos = {}
  try {
    todos = JSON.parse(fs.readFileSync(todosFile, 'utf8'))
  } catch (error) {
    fs.mkdirSync(todosDir)
    fs.writeFileSync(todosFile, '{}')
  }
  
  todos[nanoid()] = { title }
  fs.writeFileSync(todosFile, JSON.stringify(todos, null, 2)) //JSON.stringify(todos, null, 2) 예쁘게 정렬되서 들어간다.

  res.status(200).json({ title })
})

// Update
router.put('/:sun', (req, res) => {
  const { id } = req.params
  const { title } = req.body

  const todos = JSON.parse(fs.readFileSync(todosFile, 'utf8')) // 객체데이터로 만들고 todos에 담는다.
  todos[id].title = title

  fs.writeFileSync(todosFile, JSON.stringify(todos, null, 2))

  res.status(200).json(todos[id])
})

// Delete
router.delete('/:sun', (req, res) => {
  const { id } = req.params

  const todos = JSON.parse(fs.readFileSync(todosFile, 'utf8'))
  delete todos[id]

  fs.writeFileSync(todosFile, JSON.stringify(todos, null, 2))

  res.status(200).json(true)
})

// 이 코드는 꼭 있어야 함! -내보내기-
module.exports = router
