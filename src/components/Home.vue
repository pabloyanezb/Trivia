<template>
  <v-container>
    <v-row justify="center">
      <v-col col md="6" sm="12">
        <v-card class="text-center pb-2 px-2">
          <v-btn
            rounded
            dark
            x-large
            class="ma-5 jugar"
            min-width="170px"
            :to="{ path: '/game' }"
          >
            Jugar!
          </v-btn>
          <p>Haz click en el botón para iniciar un nuevo juego de trivia</p>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-card class="mx-5">
        <v-card-title>
          Tabla de posiciones
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Buscar"
            single-line
            hide-details
          >
          </v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="puntajes"
          :items-per-page="5"
          :search="search"
        >
          <template v-slot:[`item.porcentaje`]="{ item }">
            <span>{{ item.porcentaje }}</span>
            <span>%</span>
          </template>
          <template v-slot:[`item.nombre`]="{ item }">
            <b>{{ item.nombre }}</b>
          </template>
        </v-data-table>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { db } from "@/firebase";

export default {
  name: "Home",
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Jugador",
          align: "start",
          sortable: false,
          value: "nombre",
        },
        { text: "Correctas", value: "correctas" },
        { text: "Porcentaje(%)", value: "porcentaje" },
        { text: "Fecha", value: "fechaActual" },
      ],
    };
  },

  firestore() {
    return {
      puntajes: db.collection("puntajes").orderBy("fecha", "desc"),
    };
  },
};
</script>

<style>
a {
  color: white !important;
  text-decoration: none;
}
.jugar {
  background-size: 200% auto;
  background-image: linear-gradient(
    to right,
    #26a69a 0%,
    #1de9b6 51%,
    #26a69a 100%
  );
  transition: 0.5s;
}
</style>
