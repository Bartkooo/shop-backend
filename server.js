const express = require('express')
const app = express()
const cors = require('cors')

const items = require('./items.json')

app.use(cors())

app.get('/', (req, res) => {
  res.send(items)
})

app.get('/item/:id', (req,res) => {
  const item = items.find(item => item.id == req.params.id)
  res.send(item)
})

app.listen(4000)