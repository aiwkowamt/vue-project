import { defineStore } from 'pinia';

import axiosInstance from "@/utils/axios";
import { accessToken } from "@/utils/getBearerToken";

export const useArtistTopSongsStore = defineStore('artistTopSongs', {
    state: () => ({
        artistTopSongsState: [],
    }),

    getters: {
        artistTopSongs: (state) => state.artistTopSongsState,
    },

    actions: {
        async getTopSongs(params = {}) {
            try {
                const response = await axiosInstance.get('/v1/artists/0TnOYISbd1XYRBk9myaseg/top-tracks', {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    },
                    params: {
                        market: "ES",
                        ...params
                    }
                });
                this.artistTopSongsState = response.data.tracks;
            } catch (error) {
                console.error("Error:", error);
            }
        },
    },
});
