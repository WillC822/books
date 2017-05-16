const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')

const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', require('./routes')(express))

const server = app.listen(port, () => {
  console.log("Server running on Port: ", port)
})

module.exports = server
