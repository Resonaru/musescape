


<template>
    <v-card color="#1F7087" theme="dark">
        <div class="d-flex flex-no-wrap justify-space-between">
            <div>
            <v-card-title class="text-h5">
                {{songObject.title}}
            </v-card-title>

            <v-card-subtitle>{{ songObject.artist }}</v-card-subtitle>
            <v-card-text>{{ songObject.text }}</v-card-text>
            <v-card-subtitle>{{ songObject.timestamp }}</v-card-subtitle>
            <v-card-actions>
                <v-btn
                class="ms-2"
                variant="outlined"
                size="small"
                >
                <RouterLink :to="'/song/'+songObject.ID">Join discussion</RouterLink>
                </v-btn>
            </v-card-actions>
            </div>

            <v-avatar
            class="ma-3"
            size="125"
            rounded="0"
            >
            <v-img :src="songObject.img"></v-img>
            </v-avatar>
        </div>
        </v-card>
</template>

<script>
    export default {
        data() {
            return {
                count: 0
            }
        },
        props: {
        songObject: {
            type: Object,
            default: function () {
                return {
                    title: "Idol",
                    artist: "YOASOBI",
                    img: "https://i.scdn.co/image/ab67616d0000b273b7d6ca50bf766ad72226290c",
                    text: "default text",
                    timestamp: new Date('August 15, 2023 03:24:00'),
                    ID: "0001"
                };
            }
        }
    }
    }
</script>