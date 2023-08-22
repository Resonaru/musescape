<script>
export default {
    props:{
        info:{
            type:Object,
            required : true,
        },
    },
};
</script>

<template>
    <v-btn
    :href="info.link"
    :rounded="rounded"
    elevation="2">
        <template v-slot:prepend>
            <v-img
                class="(info.type === 'artist' ? 'rounded-circle' : 'rounded-0')"
                :width="300"
                aspect-ratio="1"
                cover
                src="info.img"
            ></v-img>
        </template>
            <div>
                {{ info.name }}
            </div>
    </v-btn>
</template>