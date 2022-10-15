const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const items = require('./items.json')

const multer = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images')
  },
  filename: (req, file, callback) => {
    console.log(file)
    callback(null, path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

app.use(cors())

app.get('/', upload.single('photo'), (req, res) => {
  res.send(items)
})

app.get('/item/:id', (req, res) => {
  const item = items.find((item) => item.id == req.params.id)
  res.send(item)
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/sell', (req, res) => {
  items.push(req.body)
  let json = JSON.stringify(items)
  fs.writeFile('items.json', json, function (err) {
    if (err) throw err
  })
  res.send('')
})

app.listen(4000)