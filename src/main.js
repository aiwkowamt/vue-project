import { createApp } from 'vue'
import App from './App.vue'

import { createPinia } from 'pinia'

import router from "@/router/router.js"

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'

import ColorDirective from "@/directives/ColorDirective";

import 'firebase/compat/auth';
import 'firebase/compat/database'
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const fbApp = initializeApp({
    apiKey: "AIzaSyCADv5NwXoqFA0p1Wk9XTpO7UIidQdX8u4",
    authDomain: "spotify-vue.firebaseapp.com",
    projectId: "spotify-vue",
    storageBucket: "spotify-vue.appspot.com",
    messagingSenderId: "865473827524",
    appId: "1:865473827524:web:d9415888d40ad124d6af91",
    measurementId: "G-6WZQZ48XZN"
});

const app = createApp(App);
const pinia = createPinia();

app
    .use(pinia)
    .use(router)
    .directive('color', ColorDirective)
    .mount('#app');

const db = getFirestore(fbApp);
export {db}