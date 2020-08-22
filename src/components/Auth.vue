<template>
  <v-container>
    <v-row>
      <v-col md='4' offset-md='1'>
        <v-card class="pa-5">
          <Register></Register>
        </v-card>
      </v-col>
      <v-col md='4' offset-md='2'>
        <v-card class="pa-5">
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
</style>