import Vue from 'vue'
import Vuex from 'vuex'
import vuetify from './plugins/vuetify';

import firebase from 'firebase/app'
import 'firebase/auth' // Imports para la autentificación
import './firebase.js'
import VueFirestore from 'vue-firestore';
import App from './App.vue'
import router from './router';

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(VueFirestore, {key: 'id'});
firebase.auth().languageCode = 'es';

const store = new Vuex.Store({
  state: {
    user: null,
    error_register: null,
    error_login: null
  },
  mutations: {
    set_user(state, new_user) {
      state.user = new_user;
    },
    set_error_register(state, set_error_register) {
      state.error_register = set_error_register;
    },
    set_error_login(state, set_error_login) {
      state.error_login = set_error_login;
    },
  },
  actions: {
    register(context, datos) {
      firebase.auth().createUserWithEmailAndPassword(datos.email, datos.password)
      .then(response => {
        console.log(response)
        firebase.auth().currentUser.updateProfile({
          displayName: datos.name
        })
      })
      .then(response => {
        console.log(response)
        context.commit('set_error_register', null);
        context.commit('set_user', {email: datos.email, displayName: datos.name});
        router.push('/');
      })
      .catch(error => {
        context.commit('set_error_register', error.message);
        context.commit('set_user', null);
      })
    },
    login(context, datos) {
      firebase.auth().signInWithEmailAndPassword(datos.email, datos.password)
      .then(response => {
        console.log(response)
        context.commit('set_error_login', null);
        context.commit('set_user', response.user);
        router.push('/');
      })
      .catch(error => {
        context.commit('set_error_login', error.message);
        context.commit('set_user', null);
      })
    },
    logOut(context) {
      firebase.auth().signOut()
      .then(() => {
        context.commit('set_error_login', null);
        context.commit('set_user', null);
        router.push('/login');
      }) 
    }
  }
})

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
