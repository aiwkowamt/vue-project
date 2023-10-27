import { defineStore } from 'pinia';
import { useSongsStore } from './SongsStore';

import axiosInstance from "@/utils/axios";
import { accessToken } from "@/utils/getBearerToken";

export const usePaginationStore = defineStore('pagination', {
    state: () => ({
        pageNum: 0,
        elementsOnThePage: 4,
    }),
    getters: {
        songs() {
            const songsStore = useSongsStore();
            const start = this.pageNum * this.elementsOnThePage;
            const end = start + this.elementsOnThePage;
            return songsStore.songsState.slice(start, end);
        },
        hasMorePages() {
            const songsStore = useSongsStore();
            console.log(this.pageNum < Math.ceil(songsStore.songsState.length / this.elementsOnThePage) - 1)
            return this.pageNum < Math.ceil(songsStore.songsState.length / this.elementsOnThePage) - 1;
        },
    },
    actions: {
        async getSongs(params = {}) {
            const songsStore = useSongsStore();

            try {
                const response = await axiosInstance.get('/v1/albums/4aawyAB9vmqN3uQ7FjRGTy', {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    },
                    params: {
                        limit: this.elementsOnThePage,
                        ...params
                    }
                });

                songsStore.songsState = response.data.tracks.items;
                this.pageNum = 0;
            } catch (error) {
                console.error("Error:", error);
            }
        },
        nextPage() {
            if (this.hasMorePages) {
                this.pageNum++;
            }
        },
        prevPage() {
            if (this.pageNum > 0) {
                this.pageNum--;
            }
        },
    }
});
