/* If you're feeling fancy you can add interactivity
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
let connectButton = null
let disconnectButton = null
let sendButton = null
let messageInputBox = null
let receiveBox = null

let localConnection = null
let remoteConnection = null

let sendChannel = null
let receiveChannel = null

function startup() {
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

function connectPeers() {
  // Create the local connection and its event listeners
  localConnection = new RTCPeerConnection()
  // Create RTCDataChannel and establish its event listeners
  sendChannel = localConnection.createDataChannel('sendChannel')
  sendChannel.onopen = handleSendChannelStatusChange
  sendChannel.onclose = handleSendChannelStatusChange

  // Create the remote connection and its event listeners

  remoteConnection = new RTCPeerConnection()
  remoteConnection.ondatachannel = receiveChannelCallback

  // Set up the ICE candidates for the two peers

  localConnection.onicecandidate = e =>
    !e.candidate ||
    remoteConnection.addIceCandidate(e.candidate).catch(handleAddCandidateError)

  remoteConnection.onicecandidate = e =>
    !e.candidate ||
    localConnection.addIceCandidate(e.candidate).catch(handleAddCandidateError)

  // Now create an offer to connect; this stars the process

  localConnection.createOffer()
    .then(offer => localConnection.setLocalDescription(offer))
    .then(() => remoteConnection.setRemoteDescription(localConnection.localDescription))
    .then(() => remoteConnection.createAnswer())
    .then(answer => remoteConnection.setLocalDescription(answer))
    .then(() => localConnection.setRemoteDescription(remoteConnection.localDescription))
    .catch(handleCreateDescritptionError)
}

// Handle errors attempting to create a description;
// this can hanppen both when creating an offer and when
// creating an answer. In this simple example, we handle
// both the same way

function handleCreateDescritptionError(error) {
  console.log('Unable to create an offer: ' + error.toString())
}

// Handle successful addition of the ICE candidate
// on the "local" end of the connection

// function handleLocalAddCandidateSuccess() {
//   connectButton.disabled = true
// }

// Handle successful addition of ICE candidate
// on the "remote" end of the connection

// function handleRemoteAddCandidateSuccess() {
//   disconnectButton.disabled = false
// }

// Handle an error that occurs during addition of ICE candidate

function handleAddCandidateError() {
  console.log('Oh noes! addICECandidate failed!')
}

// Handle clicks on the "Send" button by transmitting
// a message to the remote peer.

function sendMessage() {
  const message = messageInputBox.value

  sendChannel.send(message)

  // Clear the input box and re-focus it, so that we're
  // ready for the next message

  messageInputBox.value = ''
  messageInputBox.focus()
}

// Handle status changes on the local end of the data
// channel; this is the end doing the sending of data
// in this example.

function handleSendChannelStatusChange(event) {
  if (sendChannel) {
    const state = sendChannel.readyState

    if (state === 'open') {
      messageInputBox.disabled = false
      messageInputBox.focus()
      sendButton.disabled = false
      disconnectButton.disabled = false
      connectButton.disabled = true
    } else {
      messageInputBox.disabled = true
      sendButton.disabled = true
      connectButton.disabled = false
      disconnectButton.disabled = true
    }
  }
}

// Called when the connection opens and the data
// channel is ready to be connected to the remote.

function receiveChannelCallback(event) {
  receiveChannel = event.channel
  receiveChannel.onmessage = handleReceiveMessage
  receiveChannel.onopen = handleReceiveChannelStatusChange
  receiveChannel.onclose = handleReceiveChannelStatusChange
}

// Handle onmessage events for the receiving channel.
// These are the data messages sent by the sending channel.

function handleReceiveMessage(event) {
  const el = document.createElement('p')
  const txtNode = document.createTextNode(event.data)
  el.appendChild(txtNode)
  receiveBox.appendChild(el)
}

// Handle status changes on the receive's channel.

function handleReceiveChannelStatusChange(event) {
  if (receiveChannel) {
    console.log(`Receive channel's status has changed to ${receiveChannel.readyState}`)
  }

  // Here you would do stuff that needs to be done
  // when the channel's status changes.
}

// Close the connection, including data channels if they're open.
// Also update the UI to reflect the disconnected status.

function disconnectPeers() {
  // Close the RTCDataChannels if they're open.

  sendChannel.close()
  receiveChannel.close()

  // Close the RTCPeerConnections

  localConnection.close()
  remoteConnection.close()

  sendChannel = null
  receiveChannel = null
  localConnection = null
  remoteConnection = null

  // Update user interface elements

  connectButton.disabled = false
  disconnectButton.disabled = true
  sendButton.disabled = true

  messageInputBox.value = ''
  messageInputBox.disabled = true
}

window.addEventListener('load', startup, false)
