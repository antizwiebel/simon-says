<template>
  <v-card color="transparent" elevation="12">
    <v-btn
      class="mt-10"
      color="primary"
      elevation="4"
      fab
      top
      absolute
      right
      @click="toggleMusicPlaying"
      ><v-icon class="white--text mr-2 center">
        {{ this.musicPlaying ? "mdi-volume-high" : "mdi-volume-off" }}
      </v-icon></v-btn
    >

    <v-row align="center" justify="center">
      <v-col cols="12" md="6">
        <v-card
          color="primary"
          outlined
          class="text-center"
          align="center"
          v-if="this.currentSign !== null"
        >
          <v-card-title class="text-center"
            >Remember these signs and try to recreate them!</v-card-title
          >
          <v-card-text>
            <v-avatar size="155" color="primaryAccent3">
              <transition name="slide-fade" mode="out-in">
                <v-img
                  contain
                  max-height="140"
                  :src="currentSign.icon"
                  :key="currentSign.icon"
                  color="secondary"
                ></v-img>
              </transition>
            </v-avatar>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="6">
        <v-row align="center" justify="center">
          <v-card flat color="transparent" outlined>
            <v-card-text>
              <div>
                <div v-if="!webcamSetupFinished">
                  <v-icon x-large>mdi-webcam</v-icon>
                  <p class="text-body-2 grey--text text--darken-3">
                    Make sure your camera is turned on and you gave us
                    permission to use your webcam!
                  </p>
                  <v-progress-circular
                    color="primary"
                    indeterminate
                    v-if="webcamIsLoading"
                  ></v-progress-circular>
                </div>
                <v-avatar
                  :color="this.currentSign === null ? linenLighter : background"
                  size="330"
                  v-if="webcamSetupFinished"
                  rounded
                >
                  <div ref="webcam" class="webcam"></div>
                </v-avatar>
              </div>
            </v-card-text>
          </v-card>
        </v-row>
      </v-col>
      <v-col>
        <v-row>
          <v-col
            cols="2"
            v-for="predictionClass in signsImplemented"
            v-bind:key="predictionClass.className"
          >
            <v-card
              flat
              height="100%"
              :class="
                predictionClass.className === currentPrediction.className
                  ? 'primary'
                  : 'primaryAccent3'
              "
            >
              <v-card-title>{{ predictionClass.className }}</v-card-title>
              <v-card-text class="pt-0">
                <v-row class="text-center">
                  <v-col cols="3">
                    <v-avatar tile size="30">
                      <v-img
                        contain
                        :src="predictionClass.icon"
                        :color="
                          predictionClass.className ===
                          currentPrediction.className
                            ? 'secondary'
                            : 'primary'
                        "
                      ></v-img>
                    </v-avatar>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="2"
            v-for="(sign, index) in signsAnswered"
            v-bind:key="index"
          >
            <v-card flat rounded height="100%" class="primaryAccent3">
              <v-card-title>Sign {{ index + 1 }}</v-card-title>
              <v-card-text class="pt-0">
                <v-row class="text-center">
                  <v-col cols="1">
                    <v-avatar
                      v-if="sign.correctSign.className === sign.inputSign"
                      tile
                      size="30"
                      color="linen"
                    >
                    </v-avatar>
                    <v-avatar
                      v-else-if="sign.inputSign === null"
                      tile
                      size="30"
                      color="linenLighter2"
                    >
                    </v-avatar>
                    <v-avatar
                      v-else-if="sign.correctSign.className !== sign.inputSign"
                      tile
                      size="30"
                      color="primaryAccent1"
                    >
                    </v-avatar>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row
      align="center"
      justify="center"
      v-show="currentSignIndex >= numberOfSigns"
    >
      <v-card flat height="100%" color="transparent">
        <v-card-title>{{ congratulationMessage }}</v-card-title>
        <v-card-text>
          <v-row class="text-center">
            <v-col v-for="(sign, index) in signsAnswered" v-bind:key="index">
              <v-avatar
                v-if="sign.correctSign.className === sign.inputSign"
                tile
                size="100"
                color="linen"
              >
                <v-img
                  contain
                  max-height="80"
                  :src="sign.correctSign.icon"
                  :key="sign.correctSign.icon"
                  color="secondary"
                ></v-img>
              </v-avatar>
              <v-avatar v-else size="100" color="primaryAccent1">
                <v-img
                  contain
                  max-height="80"
                  :src="sign.correctSign.icon"
                  :key="sign.correctSign.icon"
                  color="secondary"
                ></v-img>
              </v-avatar>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-row>
    <v-row
      align="center"
      justify="center"
      v-show="currentSignIndex >= numberOfSigns"
    >
      <v-card flat height="100%" color="transparent">
        <v-card-title>{{ newGameTitle }}</v-card-title>
        <v-card-text>
          <v-row class="text-center">
            <v-col>
              <v-btn tabindex="0" color="primary" @click="newGame">{{
                newGameActionTitle
              }}</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-row>
  </v-card>
</template>
<script>
import * as tmImage from "@teachablemachine/image";

import { mapGetters, mapMutations, mapState } from "vuex";

export default {
  data() {
    return {
      currentSign: null,
      count: 2,
      model: null,
      webcam: null,
      webcamIsLoading: false,
      url: "https://teachablemachine.withgoogle.com/models/EhS4luhaf/",
      webcamSetupFinished: false,
      signsImplemented: [
        {
          className: "Thumbs-up",
          icon: require("../assets/thumb-up.svg"),
        },
        {
          className: "Hand",
          icon: require("../assets/hand.svg"),
        },
        {
          className: "Peace",
          icon: require("../assets/peace.svg"),
        },
        {
          className: "Fist",
          icon: require("../assets/fist.svg"),
        },
      ],
      signsAnswered: [
        {
          correctSign: null,
          inputSign: null,
        },
        {
          correctSign: null,
          inputSign: null,
        },
        {
          correctSign: null,
          inputSign: null,
        },
      ],
      currentSignIndex: 0,
      numberOfSigns: 3,
    };
  },
  watch: {
    currentPrediction(prediction) {
      if (
        this.currentState !== prediction.className &&
        prediction.noOfConsecutiveLoops > 7 &&
        this.currentSign === null
      ) {
        this.setCurrentState(prediction.className);
        if (
          prediction.className !== "Neutral" &&
          this.currentSignIndex < this.numberOfSigns
        ) {
          var answeredSign = this.signsAnswered[this.currentSignIndex];
          answeredSign.inputSign = prediction.className;
          this.$set(this.signsAnswered, this.currentSignIndex, answeredSign);
          this.currentSignIndex++;
          this.decreaseLivesOnGameEnd();
        }
      }
    },
    hasStartedNewGame(isNewGame) {
      if (isNewGame === true) {
        this.currentSignIndex = 0;
        this.numberOfSigns = 3;
        this.requestWebcam();
        this.createSignPattern();
        this.newGameStarted();
      }
    },
  },
  computed: {
    ...mapState([
      "currentPrediction",
      "predictions",
      "userKey",
      "currentState",
      "signs",
      "hasStartedNewGame",
      "musicPlaying",
    ]),
    ...mapGetters(["classWithHighestValueFromLatestPrediction"]),
    getProgressBarValue: function () {
      if (this.currentPrediction.noOfConsecutiveLoops < 5) {
        return this.currentPrediction.noOfConsecutiveLoops * 25;
      } else {
        return 100;
      }
    },
    congratulationMessage: function () {
      return (
        "You got " +
        this.correctQuestions +
        " out of " +
        this.numberOfSigns +
        " right!"
      );
    },
    newGameTitle: function () {
      return this.hasClearedLevel
        ? "Progress to next level?"
        : "Oh no! That was not right! You lost a live.... Want to try again?";
    },
    newGameActionTitle: function () {
      return this.hasClearedLevel ? "Next Level" : "Try Again";
    },
    correctQuestions: function () {
      var correctQuestions = 0;
      this.signsAnswered.forEach(
        (element) =>
          (correctQuestions +=
            element.correctSign.className === element.inputSign ? 1 : 0)
      );
      return correctQuestions;
    },
    hasClearedLevel: function () {
      return this.correctQuestions >= this.numberOfSigns;
    },
  },
  methods: {
    ...mapMutations([
      "setPrediction",
      "setCurrentState",
      "setSigns",
      "decreaseLives",
      "newGameStarted",
      "toggleMusicPlaying",
    ]),
    async requestWebcam() {
      var that = this;
      const modelURL = `${this.url}model.json`;
      const metadataURL = `${this.url}metadata.json`;

      // flip camera b/c teachable machine camera was flipped as well
      const flip = true;

      this.model = await tmImage.load(modelURL, metadataURL);

      this.webcam = new tmImage.Webcam(340, 340, flip);
      await this.webcam.setup(); // request access to the webcam
      this.webcamIsLoading = true;
      await this.webcam.play();
      this.webcamSetupFinished = true;

      setTimeout(function () {
        const webcamContainer = that.$refs.webcam;
        webcamContainer.appendChild(that.webcam.canvas);
      }, 500);
      window.requestAnimationFrame(this.loop);
    },
    newGame: function () {
      this.currentSignIndex = 0;
      if (this.hasClearedLevel) {
        this.numberOfSigns++;
      }

      this.createSignPattern();
    },
    decreaseLivesOnGameEnd: function () {
      if (this.currentSignIndex >= this.numberOfSigns) {
        var correctQuestions = 0;
        this.signsAnswered.forEach(
          (element) =>
            (correctQuestions +=
              element.correctSign === element.inputSign ? 1 : 0)
        );
        if (correctQuestions !== this.numberOfSigns) {
          this.decreaseLives();
        }
      }
    },
    createSignPattern: function () {
      var that = this;
      var myArray = new Array(this.numberOfSigns);
      var lastIndex = -1;
      for (let index = 0; index < this.numberOfSigns + 1; index++) {
        if (index === this.numberOfSigns) {
          setTimeout(function () {
            that.currentSign = null;
          }, index * 2000);
        } else {
          var randomSignIndex = Math.floor(
            Math.random() * this.signsImplemented.length
          );
          while (randomSignIndex === lastIndex) {
            randomSignIndex = Math.floor(
              Math.random() * this.signsImplemented.length
            );
          }
          lastIndex = randomSignIndex;
          var sign = {
            correctSign: this.signsImplemented[randomSignIndex],
            inputSign: null,
          };
          myArray[index] = sign;

          this.$set(this.signsAnswered, this.index, sign);
          setTimeout(function () {
            that.currentSign = myArray[index].correctSign;
          }, index * 2000);
        }
      }
      this.setSigns(myArray);
      this.signsAnswered = myArray;
    },
    getIconForSignName(signName) {
      this.signsImplemented.forEach((sign) => {
        if (sign.className === signName) {
          console.log("ICOONNN: ", sign.icon);
          return sign.icon;
        }
      });
      return "";
    },
    async loop() {
      var that = this;
      // check if user initialization finished
      that.webcam.update();
      await this.predict();
      // timeout could be increased to improve performance
      setTimeout(function () {
        window.requestAnimationFrame(that.loop);
      }, 300);
    },
    async predict() {
      this.setPrediction(await this.model.predict(this.webcam.canvas));
    },
  },
};
</script>