<template>
  <v-container>
    
    <v-dialog
      v-model="isNewUser"
      width="800"
      persistent
    >
      <TutorialStepper @close-dialogue="handleCloseDialogue"></TutorialStepper>
    </v-dialog>
    <v-dialog
      v-model="isGameOver"
      width="800"
      persistent
    >
      <GameOverDialog></GameOverDialog>
    </v-dialog>
        <WebcamAndPrediction />

        <audio id="audiotag1" src="../assets/Monkeys-Spinning-Monkeys.mp3" preload="auto"></audio>
        
  </v-container>
</template>

<script>
import '@tensorflow/tfjs'

//import Peers from '../components/Peers.vue'
//import Chat from '../components/Chat.vue'
import TutorialStepper from '../components/TutorialStepper.vue'
import GameOverDialog from '../components/GameOverDialog.vue'
import WebcamAndPrediction from '../components/WebcamAndPrediction.vue'

import {
    mapState, mapMutations
  } from 'vuex'


export default {
  components: {
     TutorialStepper, WebcamAndPrediction, GameOverDialog
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

  watch: {
    musicPlaying(isMusicPlaying) {
      if (isMusicPlaying === true) {
        document.getElementById('audiotag1').play();
      } else {
        document.getElementById('audiotag1').pause();
      }
    }
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
  },
  computed: {
    ...mapState(['isNewUser', 'currentPrediction', 'openDialog', 'livesLeft', 'hasStartedNewGame', 'musicPlaying']),
    isGameOver: function () {
      return this.livesLeft <= 0;
    },
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