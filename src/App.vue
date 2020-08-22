<template>
  <v-app>
    <v-app-bar class="font-weight-bold nav" dense dark elevate-on-scroll fixed>
      <v-btn :to="{ path: '/' }" text large tile class="home">Trivia</v-btn>|
      <v-btn
        v-if="user"
        :to="{ path: '/new_question' }"
        text
        large
        tile
        class="nuevaPregunta d-none d-sm-flex"
        >Agregar Pregunta</v-btn
      >
      <v-spacer></v-spacer>
      <v-btn text large tile class="perfil pr-0 mr-2  d-none d-sm-flex">
        <h3 v-if="user" class="name">
          {{ user.displayName }}
        </h3>
        <v-list-item-avatar
          v-if="user"
          color="blue-grey white--text"
          class="mr-5"
        >
          <img v-if="user.photoURL" :src="user.photoURL" alt="" />
          <span v-else>{{ user.displayName.charAt(0) }}</span>
        </v-list-item-avatar>
      </v-btn>
      <v-btn v-if="user" @click="logOut" class="logout  d-none d-sm-flex"
        >Cerrar Sesión</v-btn
      >
    </v-app-bar>

    <div class="background blue-grey darken-4 mt-10">
      <router-view></router-view>
    </div>
    <div class="bottom blue-grey darken-4"></div>

    <v-bottom-navigation grow color="teal" fixed class="d-flex d-sm-none" :value="activeBtn">
      <v-btn v-if="!user" @click.prevent="ingresar">
        <span class="teal--text text--darken-3">Ingresar</span>
        <v-icon class="teal--text">mdi-login</v-icon>
      </v-btn>
      <v-btn v-if="!user" @click.prevent="registrarse">
        <span class="teal--text text--darken-3">Registrarse</span>
        <v-icon class="teal--text">mdi-account-plus</v-icon>
      </v-btn>
      <v-btn
        v-if="user"
        :to="{ path: '/new_question' }"
      >
        <span class="blue-grey--text">Pregunta</span>
        <span class="blue-grey--text">Agregar</span>
        <v-icon>mdi-comment-question</v-icon>
      </v-btn>

      <v-btn v-if="user">
        <span class="blue-grey--text">{{ user.displayName }}</span>
        <v-list-item-avatar
          v-if="user"
          color="blue-grey white--text"
          class="ma-0"
        >
          <img v-if="user.photoURL" :src="user.photoURL" alt="" />
          <span v-else>{{ user.displayName.charAt(0) }}</span>
        </v-list-item-avatar>
      </v-btn>

      <v-btn v-if="user" @click="logOut">
        <span class="blue-grey--text">Sesión</span>
        <span class="blue-grey--text">Cerrar</span>
        <v-icon class="blue-grey--text">mdi-logout-variant</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data () {
      return {
        activeBtn: 1,
      }
    },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("logOut");
    },
    ingresar() {
      const register = document.getElementById("register");
      const login = document.getElementById("login");
      register.classList.add("d-none");
      register.classList.add("d-sm-flex");
      login.classList.remove("d-none");
      login.classList.remove("d-sm-flex");
    },
    registrarse() {
      const login = document.getElementById("login");
      const register = document.getElementById("register");
      login.classList.add("d-none");
      login.classList.add("d-sm-flex");
      register.classList.remove("d-none");
      register.classList.remove("d-sm-flex");
    }
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
.bottom {
  height: 52px;
}
.home {
  font-size: 2rem !important;
}
.col-sm-12.col {
  flex-basis: auto;
}
.nav {
  background: rgb(0, 105, 92);
  background: linear-gradient(
    90deg,
    rgba(0, 105, 92, 1) 0%,
    rgba(0, 191, 165, 1) 50%,
    rgba(178, 223, 219, 1) 100%
  );
}
.theme--light.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background-image: none;
}
.form .v-btn,
.logout {
  background-size: 200% auto;
  background-image: linear-gradient(
    to right,
    #26a69a 0%,
    #1de9b6 51%,
    #26a69a 100%
  );
  transition: 0.5s;
}
.v-btn:hover {
  background-position: right center;
}
.name {
  font-size: medium;
}
</style>
