<script>
    export default {
        name: 'Post',
        data() {
            return {
                postData: {
                        title: "Default post/comment",
                        author: "komay sugiyama",
                        content: "default text",
                        likes: 0,
                        timestamp: new Date('August 15, 2023 03:24:00'),
                }
            }
        }
    }
</script>

<template>
    <div class="component">
      <v-row class="overlap-group">
        <Rectangle class="rectangle-9" />
        <!-- <v-img class="vector" src="vector.svg" /> -->
        <p class="text-wrapper"> {{ postData.title }}</p>
        <v-container class="div"> {{ postData.likes }} </v-container>
        <div class="text-wrapper-2">3</div>
        <!-- <v-img class="img" src="image.svg" /> -->
        <p class="p">
          {{ postData.content }}
        </p>
        <div class="text-wrapper-3">{{ postData.author }}</div>
        <!-- <v-img class="forum" src="forum-fill0-wght400-grad0-opsz48-2.png" /> -->
      </v-row>
    </div>
</template>