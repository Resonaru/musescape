


<template>
    <RouterLink :to="'/song/'+songObject.ID">
    <v-card color="" theme="dark">
        <div class="d-flex flex-no-wrap justify-space-between w-100%" width="100%">
            <div>
            <v-card-title class="text-h5 overflow-auto">
                {{songObject.title.length < 40 ? songObject.title : `${songObject.title.substring(0,30)}...`}}
            </v-card-title>

            <v-card-subtitle class="overflow-auto">{{ songObject.artist }}</v-card-subtitle>
            <v-card-text class="overflow-auto">{{ songObject.text }}</v-card-text>
            
            <v-card-actions>
                <v-btn
                class="ms-2"
                variant="outlined"
                size="small"
                >
                Join Discussion
                </v-btn>
                <v-chip
                class="ma-2"
                color="pink"
                text-color="white"
                >
                {{ songObject.numPosts + ' posts' }}
                </v-chip>
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
    </RouterLink>
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