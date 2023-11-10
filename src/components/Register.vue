<template>
  <div class="card-body pt-3 pb-3">
    <h5 class="card-title ">Создать аккаунт</h5>

    <div class="form-group">
      <input
          :value="email"
          @input="email=$event.target.value"
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

    <p class='alert alert-danger mt-3' v-if="errMsg">{{ errMsg }}</p>
    <button
        @click="register"
        class="btn btn-secondary mt-3"
    >
      Зарегистрироваться
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useRouter } from "vue-router";

const email = ref("") ;
const password = ref("");
const errMsg = ref();
const router = useRouter();

const register = async () => {
  const auth = getAuth();
  const db = getFirestore();
  try {
    const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.value,
        password.value
    );

    const user = userCredential.user;

    const usersRef = doc(db, "users", user.uid);
    await setDoc(usersRef, {uid: user.uid,});

    console.log("Успешная регистрация");
    localStorage.setItem('userUID', user.uid);

    router.push("/");
  } catch (error) {
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
      case 'auth/weak-password':
        errMsg.value = 'Слабый пароль';
        break;
      default:
        errMsg.value = 'Адрес электронной почты или пароль были неверными';
        break;
    }
  }
};
</script>
