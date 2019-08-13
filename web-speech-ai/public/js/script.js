const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()
const log = console.log
log(recognition)

recognition.lang = 'en-ZH'
recognition.interimResults = false

document.querySelector('button').addEventListener('click', () => {
  recognition.start()

  setTimeout(() => {
    log('stop')
    recognition.stop()
  }, 2000);
})

let socket

recognition.addEventListener('audioend', (e) => {
  log(e)
  // let last = e.results.length - 1
  // let text = e.results[last][0].transcript
  let text = ''

  // console.log('Confidence: ' + e.results[0][0].confidence)

  //We will use the Socket.IO here later
  socket = io('localhost:80')
  socket.emit('chat message', text || 'how are you')

  socket.on('bot reply', replyTxt => {
    synthVoice(replyTxt)
  })
})

function synthVoice (text) {
  const synth = window.speechSynthesis
  const utterance = new SpeechSynthesisUtterance()
  utterance.text = text
  synth.speak(utterance)
}


