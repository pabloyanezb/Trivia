<template>
  <v-app>
    <v-app-bar class="font-weight-bold" color="deep-purple darken-4" dense dark>
      <v-toolbar-title>Molde</v-toolbar-title>
      <v-spacer></v-spacer>
      <h3 v-if="user">
        {{ user.displayName }}
      </h3>
      <v-list-item-avatar v-if="user" color="blue-grey white--text" class="mr-5">
        <img v-if="user.photoURL" :src="user.photoURL" alt="" />
        <span v-else >{{ user.displayName.charAt(0) }}</span>
      </v-list-item-avatar>
      <v-btn
        v-if="user"
        color="grey lighten-3 blue-grey--text text--darken-3"
        @click="logOut"
        class="logout"
        >Log Out</v-btn>
    </v-app-bar>
    <div class="background blue-grey darken-4" >
      <router-view></router-view>
    </div>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch("logOut");
    },
  },
};
</script>

<style>
html {
  overflow-y: auto !important;
}
.background {
  width: 100%;
  height: 100%;
  margin: 0 0;
}
.logout {
  top: -0.5rem;
}
@import url('https://fonts.googleapis.com/css2?family=Rowdies:wght@700&display=swap');
.v-toolbar__title {
  font-family: 'Rowdies', cursive;
}
.col-sm-12.col {
  flex-basis: auto;
}
</style>