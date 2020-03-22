<template lang='pug'>
.root
  header.root-header
    QueryBar(ref="search" v-model="searchQuery")

  .root-h-separator
  Bookmarks

  .root-separator.l1
  .c

  .root-separator.l2
  .c

  .root-separator.l3
  .c

  .root-separator.l4
  .c
</template>

<script>
import {mapState} from 'vuex';

export default {

  computed: {
    searchQuery: {
      get() { return this.$store.state.root.searchQuery },
      set(value) { this.$store.commit('root/setQuery', value) }
    },
    ...mapState('root', ['activeView', 'isSearching', 'hideSearch'])
  },

  mounted() { document.addEventListener('keyup', this.keyUps) },

  watch: {
    activeView() {
      if(this.activeView != '') {
        document.removeEventListener('keyup',this.keyUps);
      }
      else
        document.addEventListener('keyup', this.keyUps );
    },
    isSearching() {
      if(this.isSearching == true) {
        console.log('focus set');
        this.$refs.search.focus();
      }
      else this.$refs.search.blur();
    }
    
  },
  methods: {
    keyUps(e) {
      if(e.key == ' ') {
        this.$store.commit('root/setSearching', true);
      }
      if(e.key == 'Escape') {
        this.$store.commit('root/setQuery', '');
        this.$store.commit('root/setSearching', false);
        this.$store.commit('root/setActiveView', '');
      }
      if(e.key.toLowerCase() == 'b') {
        this.$store.commit('root/setActiveView', 'bookmarks');
      }
    }
  }
}
</script>

<style lang="sass">
@import './assets/sass/main'
</style>
