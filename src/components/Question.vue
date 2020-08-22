<template>
  <v-container>
    <h1 class="my-5 white--text">Nueva Pregunta</h1>
    <v-card>
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
        <v-row>
          <v-col col offset-md="9" md="2">
            <v-btn
              block
              type="submit" 
              color="secondary"
              class="mt-0"
              :disabled="!valido"
            >Agregar Pregunta
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
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
      respuestas = respuestas.sort(() => 0.5 - Math.random());
      console.log(respuestas);
      db.collection("questions").add({
        text: this.pregunta,
        answers: respuestas
      })
      this.pregunta = null
      this.correcta = null
      this.incorrecta1 = null
      this.incorrecta2 = null
      this.incorrecta3 = null
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
</style>
