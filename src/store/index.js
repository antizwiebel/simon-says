import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isNewUser: true,
    // TM response with all classes and corresponding probabilities
    predictions: [],
    // current prediction (className, probability, noOfConsecutiveLoops)
    currentPrediction: {},
    currentState: 'no-webcam',
    openDialog: 'true',
    signs: [],
    livesLeft: 3,
    maxLives: 3,
    hasStartedNewGame: false,
    musicPlaying: false,
    isFirstGame: true
  },
  getters: {

  },
  mutations: {
    setPrediction(state, predictions) {
      // save TM response with all classes
      state.predictions = predictions

      // extract and save current prediction
      let previousPrediction = state.currentPrediction

      // get class w highest probability
      let iMax = 0
      for(let i = 0; i < predictions.length; i++){
        if (predictions[i].probability > predictions[iMax].probability) {
          iMax = i
        }
      }
      // construct predictionObject
      var currentPrediction = {}
      currentPrediction.className = predictions[iMax].className
      currentPrediction.probability = predictions[iMax].probability
      console.log('objkect.keys', Object.keys(previousPrediction), 
        Object.keys(previousPrediction).length && previousPrediction.className === currentPrediction.className, 
        previousPrediction.className, currentPrediction.className)

      // check if previous state equals current state and save number of consecutive loops
      if (Object.keys(previousPrediction).length && previousPrediction.className === currentPrediction.className) {
        currentPrediction.noOfConsecutiveLoops = previousPrediction.noOfConsecutiveLoops + 1
      } else {
        currentPrediction.noOfConsecutiveLoops = 1
      }

      state.currentPrediction = currentPrediction
    },
    setOpenDialog(state, openDialog) {
      state.openDialog = openDialog
    },
    setCurrentState(state, currrentState) {
      state.currentState = currrentState
    },
    setSigns(state, newSigns) {
      state.signs = newSigns
    },
    decreaseLives(state) {
      state.livesLeft -= 1;
    },
    startNewGame(state) {
      state.isNewUser = false;
      state.hasStartedNewGame = true;
      state.livesLeft = state.maxLives;
      state.musicPlaying = true;
    },
    newGameStarted(state) {
      state.hasStartedNewGame = false;
    },
    firstGameStarted(state) {
      state.isFirstGame = false;
    },
    toggleMusicPlaying(state) {
      state.musicPlaying = !state.musicPlaying;
    }
  },
  modules: {}
})