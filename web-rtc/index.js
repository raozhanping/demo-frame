/* If you're feeling fancy you can add interactivity
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
let connectButton, disconnectButton, sendButton, messageInputBox, receiveBox
function sartup() {
  connectButton = document.getElementById('connectButton')
  disconnectButton = document.getElementById('disconnectButton')
  sendButton = document.getElementById('sendButton')
  messageInputBox = document.getElementById('message')
  receiveBox = document.getElementById('receivebox')

  //   Set event listeners for user interface widgets
  connectButton.addEventListener('click', connectPeers, false)
  disconnectButton.addEventListener('click', disconnectPeers, false)
  sendButton.addEventListener('click', sendMessage, false)
}
sartup()

function connectPeers() {
  const localConnection = new RTCPeerConnection()
  const sendChannel = localConnection.createDataChannel('sendChannel')
  sendChannel.onopen = handleSendChannelStatusChange
  sendChannel.onclose = handleSendChannelStatusChange
}
function disconnectPeers() { }
function sendMessage() { }

function handleSendChannelStatusChange() { }
