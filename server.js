const express = require('express')
const app = express()
const cors = require('cors')

const items = require('./items.json')

app.use(cors())

app.get('/', (req, res) => {
  res.send(items)
})

app.listen(4000)