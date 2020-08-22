<template>
  <v-app>
    <v-app-bar class="font-weight-bold nav" dense dark elevate-on-scroll fixed>
      <v-btn :to="{ path: '/' }" text large tile class="home">Trivia</v-btn>|
      <v-btn v-if="user" :to="{ path: '/new_question' }" text large tile class="nuevaPregunta">Agregar Pregunta</v-btn>
      <v-spacer></v-spacer>
      <v-btn text large tile class="perfil pr-0 mr-2">
        <h3 v-if="user">
          {{ user.displayName }}
        </h3>
        <v-list-item-avatar v-if="user" color="blue-grey white--text" class="mr-5">
          <img v-if="user.photoURL" :src="user.photoURL" alt="" />
          <span v-else >{{ user.displayName.charAt(0) }}</span>
        </v-list-item-avatar>
      </v-btn>
      <v-btn
        v-if="user"
        @click="logOut"
        class="logout"
        >Cerrar Sesión</v-btn>
    </v-app-bar>
    <div class="background blue-grey darken-4 mt-10" >
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
.home {
  font-size: 2rem !important;
}
.col-sm-12.col {
  flex-basis: auto;
}
.nav {
  background: rgb(0,105,92);
  background: linear-gradient(90deg, rgba(0,105,92,1) 0%, rgba(0,191,165,1) 50%, rgba(178,223,219,1) 100%);
}
.theme--light.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background-image: none
}
.form .v-btn, .logout {
  background-size: 200% auto;
  background-image: linear-gradient(to right,  #26A69A 0%, #1DE9B6 51%, #26A69A 100%);
  transition: 0.5s;
}
.v-btn:hover {
  background-position: right center;
}

</style>