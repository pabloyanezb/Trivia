<template>
  <v-form v-model="valid" @submit.prevent="register" class="form">
    <v-container>
    <h1>Registro</h1>
      <v-text-field
        v-model="name"
        :rules="[v => !!v || 'Debes ingresar un nombre']"
        label="Nombre"
        color="teal"
        required
      ></v-text-field>
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        color="teal"
        required
      ></v-text-field>
      <v-text-field
        label="Contraseña"
        v-model="password"
        type="password"
        :rules="passRules"
        color="teal"
        required
      ></v-text-field>
      <v-text-field
        label="Confirmar Contraseña"
        v-model="confirm"
        type="password"
        :rules="[(password === confirm) || 'Las contraseñas no coinciden', v => !!v || 'Debes ingresar una contraseña']"
        color="teal"
        required
      ></v-text-field>
      <v-btn color="accent" :disabled="!valid" type='submit' class="mt-5">Registrar</v-btn>
      <v-alert v-if="error != null" type="error" dense outlined>{{error}}</v-alert>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: 'Register',
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
        v => (v && v.length >= 6) || 'La contraseña debe tener 6 o más carácteres' 
      ],
      confirm: '',
      name: ''
    }
  },
  computed: {
    error() {
      return this.$store.state.error_register;
    }
  },
  methods: {
    register() {
      const datos = {
        email: this.email, 
        password: this.password,
        name: this.name
      };
      this.$store.dispatch('register', datos);
    }
  }
}
</script>

<style>

.v-alert {
  margin-top: 1rem;
}
</style>