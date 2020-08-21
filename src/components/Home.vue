<template>
  <v-container>
    <v-row justify="center">
      <v-col col md="6" sm="12">
        <v-card class="text-center pb-2 px-2">
          <v-btn rounded color="indigo" dark x-large class="ma-5" min-width="170px">Jugar!</v-btn>
          <p>Haz click en el botón para iniciar un nuevo juego de trivia</p>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col col md="10" sm="12">
        <h1 class="mt-10 white--text">Resultados:</h1>
        <v-simple-table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Puntaje</th>
              <th>Porcentaje</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Pablo</th>
              <td>3/3</td>
              <td>100%</td>
              <td>21-08-2020 15:52</td>
            </tr>
            <tr>
              <th>Pablo</th>
              <td>3/3</td>
              <td>100%</td>
              <td>21-08-2020 15:52</td>
            </tr>
            <tr>
              <th>Pablo</th>
              <td>3/3</td>
              <td>100%</td>
              <td>21-08-2020 15:52</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: "Home",
};
</script>

<style>
</style>
