<template v-slot:default="dialog">
  <v-card>
    <v-toolbar
      color="primary"
      dark
    ><div class="text-h4">Game Over</div></v-toolbar>
    <v-card-text >
      <div class="text-h4 pa-12">You lost! Keep trying and play another game!</div>
      <v-img aspect-ratio="1.7" contain
          src="https://images.unsplash.com/photo-1453227588063-bb302b62f50b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
          max-height="250" />
        <br/>
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn
        text
        @click="closeClicked"
         color="primary"
         elevation="4"
      >New Game</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

import { mapMutations } from "vuex";

  export default {
    methods: {
      ...mapMutations(["startNewGame"]),
      closeClicked: function () {
        this.startNewGame();
        this.dialog.value = false;
      }
    }
  };
</script>