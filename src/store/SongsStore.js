import { defineStore } from 'pinia';

import axiosInstance from "@/utils/axios";
import { accessToken } from "@/utils/getBearerToken";

export const useSongsStore = defineStore('song', {
    state: () => ({
        songsState: [],
        role:  'user',
    }),

    getters: {
        songs: (state) => state.songsState,
    },

    actions: {
        async getSongs(params = {}) {
            try {
                const response = await axiosInstance.get('/v1/albums/4aawyAB9vmqN3uQ7FjRGTy', {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    },
                    params: {
                        limit: 10,
                        ...params
                    }
                });
                this.songsState = response.data.tracks.items;
            } catch (error) {
                console.error("Error:", error);
            }
        },
    },
});
