<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <button v-show="false" @click="addToDesktop">Add To Desktop</button>
  </div>
</template>

<script>
// @ is an alias to /src
let deferredPrompt = null
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  console.log(e)
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
});
export default {
  name: 'home',
  components: {
  },
  methods: {
    addToDesktop() {
      console.log('add to desktop')
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
              console.log('User accepted the A2HS prompt');
            } else {
              console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
          });
    }
  }
}
</script>
