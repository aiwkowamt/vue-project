import { defineStore } from 'pinia';

import axiosInstance from "@/utils/axios";
import { accessToken } from "@/utils/getBearerToken";

import { collection, setDoc, getDocs,getDoc, deleteDoc, doc, query, where } from "firebase/firestore";
import { db } from "@/main";

import { ref, computed } from 'vue';

export const useSongsStore = defineStore('song', () => {
    const searchSongsState = ref([]);
    const favouriteMusicState = ref([]);
    const playlistsState = ref([]);

    const search = computed(() => {
        return searchSongsState;
    });
    const favourites = computed(() => {
        return favouriteMusicState;
    });
    const playlists = computed(() => {
        return playlistsState;
    });

    const searchSong = async (params) => {
        try {
            if (params !== undefined) {
                const searchString = `q=${encodeURIComponent(params)}&`;

                const response = await axiosInstance.get(`/search?${searchString}type=track&include_external=audio`, {
                    headers: {
                        "Authorization": `Bearer ${await accessToken}`
                    },
                    params: {
                        ...params
                    }
                });

                searchSongsState.value = response.data.tracks.items;
            }
        } catch (error) {
            console.error("Ошибка в функции searchSongs():", error);
        }
    };

    const addToFavorites = async (song) => {
        try {
            const userUID = localStorage.getItem('userUID');
            const collectionRef = collection(db, 'users', userUID, 'favourites');
            const songId = song.id;
            const docRef = doc(collectionRef, songId);

            await setDoc(docRef, song);

            song.isInFavorites = true;

            const favorites = JSON.parse(localStorage.getItem('favorites')) || {};
            favorites[song.id] = true;
            localStorage.setItem('favorites', JSON.stringify(favorites));
        } catch (error) {
            console.error('Ошибка addToFavorites():', error);
        }
    };

    const getFavouritesSongs = async () => {
        try {
            const userUID = localStorage.getItem('userUID');
            const collectionRef = collection(db, 'users', userUID, 'favourites');
            const querySnapshot = await getDocs(collectionRef);

            const favouriteSongs = [];
            querySnapshot.forEach((doc) => {
                const songData = doc.data();
                favouriteSongs.push(songData);
            });

            favouriteMusicState.value = favouriteSongs;
        } catch (error) {
            console.error('Ошибка getFavouriteSongs():', error);
        }
    };

    const removeFromFavorites = async (song) => {
        try {
            const userUID = localStorage.getItem('userUID');
            const collectionRef = collection(db, 'users', userUID, 'favourites');
            const songId = song.id;
            const docRef = doc(collectionRef, songId);

            await deleteDoc(docRef);

            song.isInFavorites = false;

            const favorites = JSON.parse(localStorage.getItem('favorites')) || {};
            delete favorites[song.id];
            localStorage.setItem('favorites', JSON.stringify(favorites));

            const indexToRemove = favouriteMusicState.value.findIndex(item => item.id === songId);
            if (indexToRemove !== -1) {
                favouriteMusicState.value.splice(indexToRemove, 1);
            }
        } catch (error) {
            console.error('Ошибка при removeFromFavorites():', error);
        }
    };

    const getPlaylists = async () => {
        try {
            const userUID = localStorage.getItem('userUID');
            const playlistsRef = collection(db, 'users', userUID, 'playlists');

            const querySnapshot = await getDocs(playlistsRef);

            const playlists = [];

            querySnapshot.forEach((doc) => {
                playlists.push(doc.data());
            });

            playlistsState.value = playlists;
        } catch (error) {
            console.error('Ошибка getPlaylists():', error);
        }
    };

    const createPlaylist = async (playlistName) => {
        try {
            const userUID = localStorage.getItem('userUID');
            const playlistRef = doc(collection(db, 'users', userUID, 'playlists'), playlistName);

            const data = {name:playlistName};
            await setDoc(playlistRef, data);
            await getPlaylists();
        } catch (error) {
            console.error('Ошибка createPlaylist():', error);
        }
    };

    const addToPlaylist = async (song, playlistName) => {
        const userUID = localStorage.getItem('userUID');

        try {
            const playlistDocRef = doc(db, 'users', userUID, 'playlists', playlistName);
            const playlistDocSnapshot = await getDoc(playlistDocRef);

            let songsArray = playlistDocSnapshot.data().songs || [];
            songsArray.push(song);
            await setDoc(playlistDocRef, { songs: songsArray }, { merge: true });
            await getPlaylists();
        } catch (error) {
            console.error('Произошла ошибка при добавлении песни в плейлист:', error);
        }
    };

    const removePlaylist = async (playlistName) => {
        try {
            const userUID = localStorage.getItem('userUID');
            const playlistsRef = collection(db, 'users', userUID, 'playlists');

            const querySnapshot = await getDocs(query(playlistsRef, where('name', '==', playlistName)));

            const doc = querySnapshot.docs[0];
            await deleteDoc(doc.ref);
            await getPlaylists();
        } catch (error) {
            console.error('Ошибка removePlaylist():', error);
        }
    };

    const removeFromThisPlaylist = async (song, playlistName) => {
        const userUID = localStorage.getItem('userUID');
        try {
            const playlistDocRef = doc(db, 'users', userUID, 'playlists', playlistName);
            const playlistDocSnapshot = await getDoc(playlistDocRef);
            let songsArray = playlistDocSnapshot.data().songs || [];
            const index = songsArray.findIndex(item => item.id === song.id);
            songsArray.splice(index, 1);
            await setDoc(playlistDocRef, { songs: songsArray }, { merge: true });

            await getPlaylists();
        } catch (error) {
            console.error('Ошибка removeFromThisPlaylist():', error);
        }
    };

    return {
        search,
        favourites,
        playlists,

        searchSong,
        addToFavorites,

        getFavouritesSongs,
        removeFromFavorites,

        getPlaylists,
        createPlaylist,
        addToPlaylist,
        removePlaylist,
        removeFromThisPlaylist,
    };
});