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
          Do you want to chat with your friends or take part in a school meeting, but your wifi can't handle all that
          video bandwith? Fret no more!
          Our low-bandwith video chat will analyze your video feed without needing to send all that data to your friends
          and colleagues. All you need to get started is to choose your preferred emoji style and color!
        </div>
        <v-img aspect-ratio="1.7" contain
          src="https://us.123rf.com/450wm/microone/microone1907/microone190700323/128173861-stock-vector-video-conference-people-group-on-computer-screen-taking-with-colleague-video-conferencing-and-online.jpg?ver=6"
          max-height="250" />

        <v-btn tabindex="0" color="primary" @click="step = 2">Continue</v-btn>

        <v-btn text @click="sendCloseEvent" >Cancel</v-btn>
      </v-stepper-content>
      <v-stepper-content step="2">
        <div>
          Do you want to chat with your friends or take part in a school meeting, but your wifi can't handle all that
          video bandwith? Fret no more!
          Our low-bandwith video chat will analyze your video feed without needing to send all that data to your friends
          and colleagues. All you need to get started is to choose your preferred emoji style and color!
        </div>
        <v-img aspect-ratio="1.7" contain
          src="https://us.123rf.com/450wm/microone/microone1907/microone190700323/128173861-stock-vector-video-conference-people-group-on-computer-screen-taking-with-colleague-video-conferencing-and-online.jpg?ver=6"
          max-height="250" />

        <v-btn tabindex="0" color="primary" @click="step = 2">Continue</v-btn>

        <v-btn text @click="sendCloseEvent" >Cancel</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
  export default {
    data() {
      return {
        newUser: true,
        step: 1,
      };
    },
    methods: {
      sendCloseEvent: function () {
        this.step = 2
        this.newUser = false
        this.$emit("close-dialogue", {nickname: this.nickname, emojiColor: this.emojiColor, emojiGender: this.emojiGender, 
                                      heartEmojiColor: this.heartEmojiColor, notPresentEmojiType: this.notPresentEmojiType});
      }
    }
  };
</script>