<template>
  <v-container>
    <h1 class="my-5 white--text text-center">Responde las preguntas</h1>
    <v-form @submit.prevent="enviar">
      <v-card>
        <v-window v-model="onboarding" vertical class="px-6 pt-5"> 
          <v-window-item v-for="pregunta in preguntasDesordenadas.slice(0, 1)"
            :key="pregunta.id"
            class="mb-5 px-5 pt-2"
          >
            <h3 class="teal--text text--darken-2">{{ pregunta.text }}</h3>
            <v-radio-group v-model="respuesta1">
              <v-radio
                v-for="(answer, i) in pregunta.answers"
                :key="i"
                :label="answer.answer"
                :value="answer.isCorrect ? 'ok' : answer.answer"
                color="teal accent-3"
                require
                @click="next"
              ></v-radio>
            </v-radio-group>
          </v-window-item>
          <v-window-item v-for="pregunta in preguntasDesordenadas.slice(1, 2)"
            :key="pregunta.id"
            class="mb-5 px-5 pt-2"
          >
            <h3 class="teal--text text--darken-2">{{ pregunta.text }}</h3>
            <v-radio-group v-model="respuesta2">
              <v-radio
                v-for="(answer, i) in pregunta.answers"
                :key="i"
                :label="answer.answer"
                :value="answer.isCorrect ? 'ok' : answer.answer"
                color="teal accent-3"
                require
                @click="next"
              ></v-radio>
            </v-radio-group>
          </v-window-item>
          <v-window-item v-for="pregunta in preguntasDesordenadas.slice(2, 3)"
            :key="pregunta.id"
            class="mb-5 px-5 pt-2"
          >
            <h3 class="teal--text text--darken-2">{{ pregunta.text }}</h3>
            <v-radio-group v-model="respuesta3">
              <v-radio
                v-for="(answer, i) in pregunta.answers"
                :key="i"
                :label="answer.answer"
                :value="answer.isCorrect ? 'ok' : answer.answer"
                color="teal accent-3"
                require
              ></v-radio>
            </v-radio-group>
          </v-window-item>
        </v-window>

        <v-card-actions class="justify-space-between">
          <v-btn text @click="prev">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-item-group v-model="onboarding" class="text-center" mandatory>
            <v-item
              v-for="n in length"
              :key="`btn-${n}`"
              v-slot:default="{ active, toggle }"
            >
              <v-btn :input-value="active" icon @click="toggle">
                <v-icon>mdi-record</v-icon>
              </v-btn>
            </v-item>
          </v-item-group>
          <v-btn text @click="next">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-row justify="center">
        <v-btn
          rounded
          x-large
          type="submit"
          dark
          class="jugar mt-5"
          min-width="170px"
          :disabled="!valido"
          >Enviar
        </v-btn>
      </v-row>
    </v-form>
    <v-snackbar v-model="snackbar" :timeout="timeout" top light>
      Acertaste {{ correctas }} de 3!
      <template v-slot:action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { db } from "@/firebase";

export default {
  name: "Game",
  data() {
    return {
      valido: false,
      respuesta1: null,
      respuesta2: null,
      respuesta3: null,
      snackbar: false,
      timeout: 2000,
      correctas: null,
      length: 3,
      onboarding: 0,
    };
  },
  computed: {
    preguntasDesordenadas() {
      let preguntas = [...this.questions];
      preguntas.sort(() => 0.5 - Math.random());
      return preguntas;
    },
  },
  firestore() {
    return {
      questions: db.collection("questions"),
      puntajes: db.collection("puntajes"),
    };
  },
  methods: {
    enviar() {
      let correctas = 0;
      if (this.respuesta1 == "ok") {
        correctas++;
      }
      if (this.respuesta2 == "ok") {
        correctas++;
      }
      if (this.respuesta3 == "ok") {
        correctas++;
      }
      const fecha = new Date();
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      const fechaActual = fecha.toLocaleDateString("es-CL", options);

      let porcentaje = (correctas / 3) * 100;
      if (porcentaje != 100 && porcentaje != 0) {
        porcentaje = porcentaje.toFixed(1);
      }

      this.correctas = correctas;

      db.collection("puntajes").add({
        nombre: this.$store.state.user.displayName,
        correctas: correctas + "/3",
        porcentaje: porcentaje + "%",
        fechaActual: fechaActual,
        fecha: fecha,
      });
      this.snackbar = true;
      setTimeout(() => this.$router.push({ path: "/" }), 1300);
    },
    next () {
      this.onboarding = this.onboarding + 1 === this.length
        ? 0
        : this.onboarding + 1
    },
    prev () {
      this.onboarding = this.onboarding - 1 < 0
        ? this.length - 1
        : this.onboarding - 1
    },
  },
  updated() {
    if (this.respuesta1 && this.respuesta2 && this.respuesta3) {
      this.valido = true;
    }
  },
};
</script>

<style>
h3 {
  font-size: x-large;
}
.v-window__container {
  height: fit-content !important;
}
.mdi-record, .mdi-chevrton-right, .mdi-chevrton-left {
  color: #1DE9B6 !important;
}
</style>
