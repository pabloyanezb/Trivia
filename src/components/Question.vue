<template>
  <v-container>
    <v-card class="mt-10">
      <v-form v-model="valido" @submit.prevent="agregarPregunta" class="pa-5 newQuestion">
        <v-textarea
          v-model="pregunta"
          label="Pregunta"
          placeholder="Ej: ¿Cual es la montaña más alta de sudamérica?"
          prepend-icon="mdi-comment-question-outline"
          rows="3"
          outlined
          clearable
          auto-grow
          counter
          color="indigo"
          :rules="[v => !!v || 'Debes ingresar una pregunta']"
          required
        ></v-textarea>
        <v-row>
          <v-col md="3" sm="12">
            <v-text-field
              v-model="correcta"
              label="Respuesta correcta"
              placeholder="Ej: Monte Aconcagua"
              prepend-icon="mdi-check-outline"
              outlined
              color="indigo"
              :rules="[v => !!v || 'Debes ingresar una respuesta correcta']"
              required
            ></v-text-field>
          </v-col>
          <v-col md="3" sm="12">
            <v-text-field
              v-model="incorrecta1"
              label="Respuesta incorrecta 1"
              placeholder="Ej: Ojos del Salado"
              prepend-icon="mdi-close-outline"
              outlined
              color="indigo"
              :rules="[v => !!v || 'Debes ingresar una respuesta']"
              required
            ></v-text-field>
          </v-col>
          <v-col md="3" sm="12">
            <v-text-field
              v-model="incorrecta2"
              label="Respuesta incorrecta 2"
              placeholder="Ej: Monte Everest"
              prepend-icon="mdi-close-outline"
              outlined
              color="indigo"
              :rules="[v => !!v || 'Debes ingresar una respuesta']"
              required
            ></v-text-field>
          </v-col>
          <v-col md="3" sm="12">
            <v-text-field
              v-model="incorrecta3"
              label="Respuesta incorrecta 3"
              placeholder="Ej: Machu Picchu"
              prepend-icon="mdi-close-outline"
              outlined
              color="indigo"
              :rules="[v => !!v || 'Debes ingresar una respuesta']"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      <v-row justify="center">
        <v-btn
          rounded
          x-large
          type="submit"
          light
          class="jugar"
          color="white--text"
          min-width="170px"
          :disabled="!valido"
        >Agregar Pregunta
        </v-btn>
      </v-row>
      </v-form>
    </v-card>
    <v-snackbar v-model="snackbar" :timeout="timeout" top light>
      Agregaste una nueva pregunta!
      <template v-slot:action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { db } from '@/firebase'

export default {
  name: "Question",
  data() {
    return {
      valido: false,
      pregunta: null,
      correcta: null,
      incorrecta1: null,
      incorrecta2: null,
      incorrecta3: null,
      snackbar: false,
      timeout: 2000,
    }
  },
  methods: {
    agregarPregunta() {
      let respuestas = [
        {
          answer: this.correcta,
          isCorrect: true
        },
        {
          answer: this.incorrecta1,
          isCorrect: false
        },
        {
          answer: this.incorrecta2,
          isCorrect: false
        },
        {
          answer: this.incorrecta3,
          isCorrect: false
        },
      ]
      respuestas.sort(() => 0.5 - Math.random());
      console.log(respuestas);
      db.collection("questions").add({
        text: this.pregunta,
        answers: respuestas
      })
      this.snackbar = true;
      setTimeout( () => this.$router.push({ path: '/'}), 1300);
      // this.pregunta = null;
      // this.correcta = null;
      // this.incorrecta1 = null;
      // this.incorrecta2 = null;
      // this.incorrecta3 = null;
    }
  },
  firestore() {
    return {
      questions: db.collection('questions')
    }
  }
};
</script>

<style>
.newQuestion .v-input__slot .v-label{
  font-weight: bold;
}
.mdi-comment-question-outline {
  color: #546E7A !important;
}
.mdi-check-outline {
  color: #1DE9B6 !important;
}
.mdi-close-outline {
  color: #D50000 !important;
}
</style>
