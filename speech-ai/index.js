const express = require('express')
const app = express()

app.use(express.static(__dirname + '/views'))
app.use(express.static(__dirname + '/public'))

const server = app.listen(5000)
app.get('/', (req, res) => {
  res.sendFile('index.html')
})

//api ai
const APIAI_TOKEN = 'ad5d8aea46b54fe7b2db31b8af304f8f'
const apiai = require('apiai')(APIAI_TOKEN)

io.connect('connection', socket => {
  socket.on('chat message', text => {

  })
})
