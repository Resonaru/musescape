<script>
    import SongCard from '@/components/SongCard.vue';
    import { db } from '@/firebase';
    import {
    collection,
    doc,
    addDoc,
    setDoc,
    getDoc,
    getDocs,
    query,
    where,
    deleteDoc,
    } from 'firebase/firestore'



    class Song {
    constructor (title, img, artist ) {
        this.title = title;
        this.img = img;
        this.artist = artist;
    }
    toString() {
        return 'not implemented'
    }
}

// Firestore data converter
const songConverter = {
    toFirestore: (song) => {
        return {
            title: song.title,
            img: song.img,
            artist: song.artist
            };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Song(data.title, data.img, data.artist);
    }
};

    export default {
        components: {
            SongCard
        },
        data() {
            return {
                songList: [
                // {
                //     artist: "Yorushika",
                //     title: "Eat the Wind",
                //     img: "https://i.scdn.co/image/ab67616d0000b2734e25902b79f09e0c71f6c552",
                //     timestamp: new Date('August 15, 2023 03:24:00'),
                //     ID: "qgVboFyiK6uvSxvKgvwk"
                // },
                // {
                //     title: "Idol",
                //     artist: "YOASOBI",
                //     img: "https://i.scdn.co/image/ab67616d0000b273b7d6ca50bf766ad72226290c",
                //     timestamp: new Date('August 15, 2023 03:24:00'),
                //     ID: "ycaBLqkvQ412TEzrVJnO"
                // },
                // {
                //     title: "Us Without Me",
                //     artist: "grentperez",
                //     img: "https://i.scdn.co/image/ab67616d0000b273f90b90e763ba5f4d1d98ffac",
                //     timestamp: new Date('August 15, 2023 03:24:00'),
                //     ID: "7FD4aahMbUhXuvKTOw9F"
                // },
                 ],
                 loading: true
            }
        },
        async created() {
            this.loading = true;
            console.log("querying song database...")
            const querySnapshot = await getDocs(collection(db, "songs"));
            querySnapshot.forEach(async (doc) => {
            // doc.data() is never undefined for query doc snapshots
                const song = doc.data();
                const artist = (await getDoc(song.artist)).data();
                this.songList.push({
                    title: song.title,
                    artist: artist.name,
                    img: song.img,
                    timestamp: new Date('August 15, 2023 03:24:00'),
                    ID: doc.id
                })
                // console.log(doc.id, " => ", doc.data());
            });
            console.log('all songs loaded')
            this.loading = false;
            this.songList.forEach(song => console.log(song))
        },
    }
</script>

<template>
    <!-- <div class="scrollable text-center green flex-grow-1 flex-shrink-0 overflow-auto"> -->
      <v-row dense>
        <template v-if="loading">
            <h1>Loading feed...</h1>
        </template>
        <template v-else>
            <template v-for="songItem in songList">
                <v-col cols="12">
                    <SongCard :songObject="songItem"/>
                </v-col>
            </template> 
        </template>
      </v-row>
    <!-- </div> -->
</template>