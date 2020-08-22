<template>
  <v-container>
    <h1 class="my-5 white--text">Comienza a responder!</h1>
    <v-form @submit.prevent="enviar">
      <v-card
        v-for="pregunta in preguntasDesordenadas.slice(0,1)"
        :key="pregunta.id"
        class="mb-5 px-5 pt-2"
      >
        <h3>{{pregunta.text}}</h3>
        <v-radio-group v-model="respuesta1">
          <v-radio
            v-for="(answer, i) in pregunta.answers"
            :key="i"
            :label="answer.answer"
            :value="answer.isCorrect ? 'ok' : answer.answer"
            require      
          ></v-radio>
        </v-radio-group>
      </v-card>
      <v-card
        v-for="pregunta in preguntasDesordenadas.slice(1,2)"
        :key="pregunta.id"
        class="mb-5 px-5 pt-2"
      >
        <h3>{{pregunta.text}}</h3>
        <v-radio-group v-model="respuesta2">
          <v-radio
            v-for="(answer, i) in pregunta.answers"
            :key="i"
            :label="answer.answer"
            :value="answer.isCorrect ? 'ok' : answer.answer"
            require          
          ></v-radio>
        </v-radio-group>
      </v-card>
      <v-card
        v-for="pregunta in preguntasDesordenadas.slice(2,3)"
        :key="pregunta.id"
        class="mb-5 px-5 pt-2"
      >
        <h3>{{pregunta.text}}</h3>
        <v-radio-group v-model="respuesta3">
          <v-radio
            v-for="(answer, i) in pregunta.answers"
            :key="i"
            :label="answer.answer"
            :value="answer.isCorrect ? 'ok' : answer.answer"
            require
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
      valido: true,
      respuesta1: '',
      respuesta2: '',
      respuesta3: '',
    }
  },
  computed: {
    preguntasDesordenadas() {
      let preguntas = [...this.questions]
      preguntas.sort(() => 0.5 - Math.random());
      return preguntas;
    }
  },
  firestore() {
    return {
      questions: db.collection('questions'),
      puntajes: db.collection('puntajes')
    }
  },
  methods: {
    enviar() {
      let correctas = 0;
      if (this.respuesta1 == 'ok'){
        correctas++
      }
      if (this.respuesta2 == 'ok'){
        correctas++
      }
      if (this.respuesta3 == 'ok'){
        correctas++
      }
      const fecha = new Date();
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit', hour12: true};
      const fechaActual =  fecha.toLocaleDateString("es-CL", options);
      
      let porcentaje = (correctas / 3) * 100;
      porcentaje = porcentaje.toFixed(1);

      db.collection('puntajes').add ({
        nombre: this.$store.state.user.displayName,
        correctas: correctas + '/3',
        porcentaje: porcentaje + '%',
        fechaActual: fechaActual,
        fecha: fecha
      })
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style></style>
