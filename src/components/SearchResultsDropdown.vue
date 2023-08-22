<template>
    <div class="search-results-dropdown">
      <ul>
        <li v-for="(result, index) in results" :key="index">
          <search-results-item :info="result" />
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import SearchResultsItem from './SearchResultsItem.vue';
  
  export default {
    components: {
      SearchResultsItem,
    },
    props: {
      results: Array, // The search results array
    },
  };
  </script>
  
  <style>
  /* Add your custom styles here */
  </style>
  