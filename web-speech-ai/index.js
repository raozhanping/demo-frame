const express = require('express')
const app = express()
const io = require('socket.io')(80)

app.use(express.static(__dirname + '/views'))
app.use(express.static(__dirname + '/public'))

const server = app.listen(5000)
app.get('/', (req, res) => {
  res.sendFile('index.html')
})

//api ai
const APIAI_TOKEN = 'ad5d8aea46b54fe7b2db31b8af304f8f'
const APIAI_SESSION_ID = 'ad5d8aea46b54fe7b2db31b8af304f8f'
const apiai = require('apiai')(APIAI_TOKEN)

io.on('connection', socket => {
  socket.on('chat message', text => {
    let apiaiReq = apiai.textRequest(text, {
      sessionId: APIAI_SESSION_ID
    })

    apiaiReq.on('response', res => {
      let aiText = res.result.fulfillment.speech
      socket.emit('bot reply', aiText)
    })

    apiaiReq.on('error', error => {
      console.log(error)
    })

    apiaiReq.end()
  })
})
