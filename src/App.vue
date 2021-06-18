<template>
  <v-app :style="{background: $vuetify.theme.themes.light.background}">
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-icon
        class="white--text mr-2 center"
      >
        mdi-account-voice
      </v-icon>

      <span
        class="text-h6 font-weight-bold white--text"
      >
        Simon Says
      </span>

      <v-spacer></v-spacer>
      <span class="mr-4">LIVES: </span>
      
      <span v-for="n in maxLives" v-bind:key="n">
        <v-icon >{{ getLiveIcon(n) }}</v-icon>
      </span>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import {
    mapMutations,
    mapState
  } from 'vuex'

export default {
  name: 'App',

  data: () => ({
    //
  }),

  computed: {
      ...mapState(['livesLeft', 'maxLives']),
  },

  methods: {
    ...mapMutations(['setOpenDialog']),

    handleSettiingsClick: function() {
      this.setOpenDialog(true)
    },
    getLiveIcon (n) {
        return (n <= this.livesLeft ) ? "mdi-heart" : "mdi-heart-off"; 
    }
  }
};
</script>
