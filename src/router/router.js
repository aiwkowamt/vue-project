import { createRouter, createWebHashHistory } from "vue-router";
import {getAuth, onAuthStateChanged} from "firebase/auth";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {path: "/", component: () => import("@/components/Home.vue"), meta: {requiresAuth: true } },
        {path: "/Home", component: () => import("@/components/Home.vue"), meta: {requiresAuth: true } },
        { path: "/Search", component: () => import("@/components/Search.vue"), meta: {requiresAuth: true } },
        { path: "/FavouritesSongs", component: () => import("@/components/FavouritesSongs.vue"), meta: {requiresAuth: true } },
            { path: '/single-song/:id', component: () => import('@/components/SingleSong.vue'), name: 'single-song', props: true, meta: {requiresAuth: true } },
        { path: '/Playlists', component: () => import('@/components/Playlists.vue'), meta: {requiresAuth: true }},
        { path: '/AboutUs', component: ()=> import('@/components/AboutUs.vue') },
        { path: '/Register', component: () => import("@/components/Register.vue") },
        { path: '/SignIn', component: () => import("@/components/SignIn.vue") },
    ],
});

const getCurrentUser = () => {
  return new Promise((resolve, reject)=> {
      const removeListener = onAuthStateChanged(
          getAuth(),
          (user) => {
            removeListener();
            resolve(user);
          },

          reject
      );
  });
};

router.beforeEach(async (to,from,next)=>{
    if(to.matched.some((record)=>record.meta.requiresAuth)) {
        if(await getCurrentUser()) {
            next();
        } else {
            alert('Сначала нужно авторизоваться или пройти регистрацию!');
            next('/SignIn');
        }
    } else {
        next();
    }
});

export default router;