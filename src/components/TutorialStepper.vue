<template>
  <v-stepper v-model="step">
    <v-stepper-header>
      <v-stepper-step :complete="step > 1" step="1">Introduction</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="step > 2" step="2">Game Goal</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <div>
          If you feel lost and you need to train your brain, because you cannot focus we have just the right solution for you! You can improve your memory by playing just a single game.
          Simon says is designed just for this purpose. Have fun and stimulate your memory.
        </div>
        <br/>
        <v-img aspect-ratio="1.7" contain
          src="https://www.shop-apotheke.com/magazin/familie/wp-content/uploads/2020/05/familienmagazin_memory_955x594.jpg"
          max-height="250" />
        <br/>
        <v-btn tabindex="0" color="primary" @click="step = 2">Continue</v-btn>

        <v-btn text @click="closeClicked" >Cancel</v-btn>
      </v-stepper-content>
      <v-stepper-content step="2">
        <div>
          In this game there are four different signs "Thumbs Up", "Hand","Peace" and "Fist". At the beginning of every game you will receive a combination of this signs.
          You have to remember the signs and repeate them. 
          The field for the sign you choose should change in another colour and when you stay long enough on the sign you will see if the answer was right or wrong.
          With every correct answer the levels get harder. With every wrong answer you lose a life.
          <br/>
          To make things easier for you, no sign can be twice in a row.
        </div>
         <br/>
        <v-img aspect-ratio="1.7" contain
          src="https://www.seekpng.com/png/full/392-3922843_asl-sign.png"
          max-height="250" />

        <v-btn tabindex="0" color="primary" @click="closeClicked">START GAME</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import { mapMutations } from "vuex";

  export default {
    data() {
      return {
        step: 1,
      };
    },
    methods: {
      ...mapMutations(["startNewGame"]),
      closeClicked: function () {
        this.startNewGame();
        this.dialog.value = false;
      }
    }
  };
</script>