<template>
  <v-form v-model="valid" @submit.prevent="login">
    <v-container>
    <h1>Ingresar</h1>
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>
      <v-text-field
        label="Contraseña"
        v-model="password"
        type="password"
        :rules="passRules"
        required
      ></v-text-field>
      <v-btn color="accent" :disabled="!valid" type="submit">Ingresar</v-btn>
      <v-alert v-if="error" type="error" dense outlined>{{error}}</v-alert>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      valid: false,
      email: '',
      emailRules: [
        v => !!v || 'Debes ingresar un E-mail',
        v => /.+@.+/.test(v) || 'E-mail no válido',
      ],
      password: '',
      passRules: [
        v => !!v || 'Debes ingresar una contraseña', 
        v => (v && v.length >= 5) || 'La contraseña debe tener 5 o más carácteres' 
      ],
    }
  },
  computed: {
    error() {
      return this.$store.state.error_login;
    }
  },
  methods: {
    login() {
      const datos = {
        email: this.email, 
        password: this.password,
      };
      this.$store.dispatch('login', datos);
    }
  }
}
</script>