<template>
  <v-container>
    <v-dialog
      v-model="openDialog"
      width="800"
      :persistent="!newUser"
    >
      <TutorialStepper @close-dialogue="handleCloseDialogue" :newUser="newUser"></TutorialStepper>
    </v-dialog>
        <WebcamAndPrediction />

        <audio id="audiotag1" src="../assets/Monkeys-Spinning-Monkeys.mp3" preload="auto"></audio>
        <v-btn text @click="play_single_sound" ref="audioBtn">Play that funky music</v-btn>
  </v-container>
</template>

<script>
import '@tensorflow/tfjs'

//import Peers from '../components/Peers.vue'
//import Chat from '../components/Chat.vue'
import TutorialStepper from '../components/TutorialStepper.vue'
import WebcamAndPrediction from '../components/WebcamAndPrediction.vue'

import {
    mapState, mapMutations
  } from 'vuex'


export default {
  components: {
     TutorialStepper, WebcamAndPrediction
  },
  data() {
    return {
      dialog: true,
      model: null,
      url: 'https://teachablemachine.withgoogle.com/models/erVKbrLsV/',
      newUser: true
    }
  },

  mounted() {
    document.addEventListener('beforeunload', this.leaving);
    window.addEventListener('beforeunload', this.leaving)
  },

  methods: {
    ...mapMutations(['setUserKey', 'setEmojiSettings', 'setOpenDialog']),
      
    getIcon: function(className) {
      switch (className) {
        case 'present':
          return 'mdi-check-bold'
        case 'not present':
          return 'mdi-close-thick'
        case 'hand raised':
          return 'mdi-hand'
        default:
          return 'mdi-exclamation-thick'
      }
    },
    handleCloseDialogue: function({nickname, emojiColor, emojiGender, heartEmojiColor, notPresentEmojiType}) {
      this.nickname = nickname
      this.emojiColor = emojiColor
      this.emojiGender = emojiGender
      this.dialog = false
      this.setOpenDialog(false)
      this.setEmojiSettings({emojiGender, emojiColor, heartEmojiColor, notPresentEmojiType})
      
    },
    play_single_sound: function() {
      document.getElementById('audiotag1').pause();
      document.getElementById('audiotag1').play();
    }
  },
  computed: {
    ...mapState(['users', 'currentPrediction', 'openDialog']),
  }
}
</script>
<style scoped>
.opacity {
  opacity: 0.3;
}
.webcam {
  width: 200;
  height: 200;
}
</style>