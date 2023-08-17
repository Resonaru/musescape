<script>
    import SongCard from '@/components/SongCard.vue';
    export default {
        components: {
            SongCard
        },
        data() {
            return {
                songList: [
                {
                    artist: "Yorushika",
                    title: "Eat the Wind",
                    img: "https://i.scdn.co/image/ab67616d0000b2734e25902b79f09e0c71f6c552",
                    timestamp: new Date('August 15, 2023 03:24:00'),
                    ID: "0001"
                },
                {
                    title: "Idol",
                    artist: "YOASOBI",
                    img: "https://i.scdn.co/image/ab67616d0000b273b7d6ca50bf766ad72226290c",
                    timestamp: new Date('August 15, 2023 03:24:00'),
                    ID: "0002"
                },
                {
                    title: "Idol",
                    artist: "YOASOBI",
                    img: "https://i.scdn.co/image/ab67616d0000b273b7d6ca50bf766ad72226290c",
                    timestamp: new Date('August 15, 2023 03:24:00'),
                    ID: "0002"
                },
                {
                    title: "Idol",
                    artist: "YOASOBI",
                    img: "https://i.scdn.co/image/ab67616d0000b273b7d6ca50bf766ad72226290c",
                    timestamp: new Date('August 15, 2023 03:24:00'),
                    ID: "0002"
                }
        ]
            }
        }
    }
</script>

<template>
    <!-- <div class="scrollable text-center green flex-grow-1 flex-shrink-0 overflow-auto"> -->
      <v-row dense>
            <template v-for="songItem in songList">
                <v-col cols="12">
                    <SongCard :songObject="songItem"/>
                </v-col>
            </template> 
      </v-row>
    <!-- </div> -->
</template>