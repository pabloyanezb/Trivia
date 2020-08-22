<template>
  <v-container>
    <v-row>
      <v-col md='4' offset-md='1' id="register" class="d-none d-sm-flex">
        <v-card class="pa-5 carta">
          <Register></Register>
        </v-card>
      </v-col>
      <v-col md='4' offset-md='2' id="login">
        <v-card class="pa-5 carta">
          <Login></Login>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Login from './Login'
import Register from './Register'

export default {
  components: {
    Login, 
    Register 
  },

}
</script>

<style>
.carta {
  width: inherit !important;
}
</style>