<template>
  <v-container>
    <h1 class="my-5 white--text">Comienza a responder!</h1>
    <v-form @submit.prevent="enviar" v-model="valido">
      <v-card
        v-for="(question, i) in questions.slice(0,3)"
        :key="i"
        class="mb-5 px-5 pt-2"
      >
        <h3>{{question.text}}</h3>
        <v-radio-group>
          <v-radio
            v-for="(answer, i) in question.answers"
            :key="i"
            :label="answer.answer"
            :value="answer.isCorrect ? 'ok' : answer.answer"
            require
            :v-model="'respuesta' + i"
          ></v-radio>
        </v-radio-group>
      </v-card>
      <v-row>
          <v-col col offset-md="10" md="2">
            <v-btn
              block
              type="submit" 
              color="indigo" 
              dark
              :disabled="!valido"
            >Enviar
            </v-btn>
          </v-col>
        </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { db } from '@/firebase'

export default {
  name: 'Game',
  data() {
    return {
      valido: false,
      questions: []
    }
  },
  // computed: {
  //   selectedQuestions() {
  //     return this.questions.reverse()
  //   }
  // },
  // mounted() {

  //   console.log(this.selectedQuestions)
  // },
  firestore() {
    return {
      questions: db.collection('questions')
    }
  },
  methods: {
    enviar() {
      console.log('a')

    }
  }
  
};
</script>

<style></style>
