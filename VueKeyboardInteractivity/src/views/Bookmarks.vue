<template lang="pug">
.bkms(ref="root")
  //- h3.bkms-title(v-if="activeView == ''") BOOKMARKS
  h3.bkms-title BOOKMARKS
  nav.bkms-list
    a(
      v-for="bookmark in bookmarks"
      :key="bookmark.id"
      ref="bookmark"
      :href="bookmark.link"
      @mouseover="$store.commit('bookmarks/setActiveRow', bookmark.id)"
    ).bkms-list-item
      summary.bkms-list-title {{bookmark.title}}
      aside.bkms-list-subTitle {{bookmark.link.substring(0, 35) + '...'}}

    transition(name='fade')
      .bkms-list-select(ref="activeRow" v-show="activeView == 'bookmarks'")
</template>

<script>
import animate from '../assets/animations/Bookmarks';
import {mapState} from 'vuex';
export default {
  data() { return {
    animate : true
  }},

  computed: {
    ...mapState('root', ['activeView']),
    ...mapState('bookmarks', ['bookmarks', 'activeRow'])
  },

  watch: {
    activeRow() { this.animateActiveRow() },
    activeView() {
      if(this.activeView == 'bookmarks') { 
        document.addEventListener('keydown', this.keyDowns);
        document.addEventListener('keyup', this.keyUps);
        this.animateColumn(3)
      } 
      if(this.activeView == '') { 
        document.removeEventListener('keydown', this.keyDowns);
        document.removeEventListener('keyup', this.keyUps);
        this.animateColumn(1)
      } 
    }
  },

  methods: {
    animateColumn(endCol) { animate.column(endCol, this.$refs) },
    animateActiveRow() { 
      if(this.animate) {
        this.animate = false;
        animate.row(this.activeRow, this.$refs);
      setTimeout(() => {this.animate = true}, 100)
      }
    },

    keyDowns(e) {
    if(document.activeElement == document.body && this.animate)
      switch(e.key) {
        case 'j' : this.$store.commit('bookmarks/setActiveRow', 'down'); break;
        case 'k' : this.$store.commit('bookmarks/setActiveRow', 'up'); break;
    }},

    keyUps(e) {
      if(document.activeElement == document.body)
      switch(e.key) {
        case ' ':
          this.$store.commit('root/setSearching', true); break;
        case 'Enter':
          window.location = this.bookmarks[this.activeRow].link; break;
        case 'Escape':
          this.$store.commit('root/setQuery', '');
          this.$store.commit('root/setActiveView', '');
    }}
  }
}
</script>