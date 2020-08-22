<template>
  <v-container>
    <v-row justify="center">
      <v-col col md="6" sm="12">
        <v-card class="text-center pb-2 px-2">
          <v-btn rounded color="indigo" dark x-large class="ma-5" min-width="170px" :to="{ path: '/game' }">
             Jugar!
          </v-btn>
          <p>Haz click en el botón para iniciar un nuevo juego de trivia</p>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col col md="10" sm="12">
        <h1 class="mt-10 white--text">Resultados:</h1>
        <v-simple-table fixed-header height="300px">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Puntaje</th>
              <th>Porcentaje</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="puntaje in puntajes" :key='puntaje.id'>
              <th>{{puntaje.nombre}}</th>
              <td>{{puntaje.correctas}}</td>
              <td>{{puntaje.porcentaje}}</td>
              <td>{{puntaje.fechaActual}}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { db } from '@/firebase'

export default {
  name: "Home",
  firestore() {
    return {
      puntajes: db.collection("puntajes").orderBy("fecha", "desc")
    }
  },
};
</script>

<style>
a {
  color: white !important;
  text-decoration: none;
}
</style>
