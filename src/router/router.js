import { createRouter, createWebHashHistory } from "vue-router";

import NotFound from "@/components/NotFound.vue";
import Songs from "@/components/Songs.vue";
import ArtistTopSongs from "@/components/ArtistTopSongs.vue";
import {useSongsStore} from "@/store/SongsStore";


const routes = [
    {
        path: "/Songs",
        component: Songs,
        beforeEnter: (to, from, next) => {
            const songsStore = useSongsStore();
            if (songsStore.role === 'user') {
                next();
            } else {
                next('/NotFound');
            }
        },
    },

    {
        path: "/ArtistTopSongs",
        component: ArtistTopSongs,
    },

    {
        path: "/NotFound",
        name: "404",
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router