<!-- <template>
    <div class="search-results-dropdown">
      <ul>
        <li v-for="(result, index) in results" :key="index">
          <search-results-item :info="result" />
        </li>
      </ul>
    </div>
  </template> -->
  <template>
    <div class="autocomplete-container">
      <v-autocomplete
        :items="results"
        label="Search"
        auto-select-first
        variant="outlined"
        class="custom-autocomplete"
      ></v-autocomplete>
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
  .autocomplete-container {
    position: relative;
  }
  
  .custom-autocomplete__content {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000; /* Adjust the z-index value as needed */
  }
  </style>
  