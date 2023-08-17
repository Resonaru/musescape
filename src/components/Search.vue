<script>
    export default {
        
    }
</script>


<template>
    <v-text-field
        :loading="loading"
        density="compact"
        variant="solo"
        label="Search for a song"
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
        @click:append-inner="onClick"
      ></v-text-field>
</template>