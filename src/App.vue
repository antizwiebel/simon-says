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
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import {
    mapMutations
  } from 'vuex'

export default {
  name: 'App',

  data: () => ({
    //
  }),

  methods: {
    ...mapMutations(['setOpenDialog']),

    handleSettiingsClick: function() {
      this.setOpenDialog(true)
    },
  }
};
</script>
