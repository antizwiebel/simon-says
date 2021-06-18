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
          If you feel lost and you need to train your brain, because you cannot focus. You can improve your memory by playing just a single game.
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
          
          You have to remember the signs and repeate them. With every correct answer the levels get harder.
         
        </div>
        <v-img aspect-ratio="1.7" contain
          src="https://images.unsplash.com/photo-1620315188768-150b72a07020?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
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
        newUser: true,
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