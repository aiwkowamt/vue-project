<template>
  <div class="about-us-container pt-3 pb-3">
    <AboutUsSlot>
      <template v-slot:header>
        <h1>О нас</h1>
      </template>

      <template v-slot:content>
        <p>Это наше описание о нас. Мы занимаемся чем-то интересным... Стримингом различного контента (миллионов треков, подкастов и видеороликов) от авторов со всего мира.</p>
      </template>

      <template v-slot:footer>
        <p>Наши контакты: email@mail.com</p>
      </template>
    </AboutUsSlot>
  </div>
</template>

<script>
import AboutUsSlot from "./AboutUsSlot.vue";

export default {
  name: "AboutUs",
  components: {
    AboutUsSlot,
  }
}
</script>
