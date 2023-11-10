<template>
  <div class="card-body pt-3 pb-3" >
    <h5 class="card-title">Войти в аккаунт</h5>

    <div class="form-group">
      <input
          v-model="email"
          type ="text"
          placeholder="Почта"
          class="form-control mt-3"
      />
    </div>

    <div class="form-group">
      <input
          v-model="password"
          type="password"
          placeholder="Пароль"
          class="form-control mt-3"
      />
    </div>

    <div class='alert alert-danger mt-3' v-if="errMsg">{{ errMsg }}</div>

    <button
        @click="register"
        class="btn btn-secondary mt-3"
    >
      Войти
    </button>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {useRouter} from "vue-router";

const email = ref('');
const password = ref('');
const errMsg = ref();
const router = useRouter();

const register = () => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email.value, password.value)
      .then((data) => {
        localStorage.setItem('userUID', data.user.uid);
        console.log('Успешный вход в аккаунт');
        router.push('/')
      })
      .catch((error) => {
        console.log(error.code);
        switch(error.code) {
          case "auth/invalid-email":
            errMsg.value = 'Неверный адрес электронной почты';
            break;
          case 'auth/user-not-found':
            errMsg.value = 'Ни одна учетная запись с таким адресом электронной почты не найдена.';
            break;
          case 'auth/wrong-password':
            errMsg.value = 'Неверный пароль';
            break;
          default:
            errMsg.value = 'Адрес электронной почты или пароль были неверными';
            break;
        }
      })
};
</script>