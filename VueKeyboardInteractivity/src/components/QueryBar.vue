<template lang="pug">
  .qb
    Base-SearchIcon.qb-search-icon(v-show="show")
    .qb-inputContainer(ref="inputCon")
      span.qb-text {{ activeView.toUpperCase() }}
      span.qb-text(
        v-bind="$attrs"
        :textContent="value"
        @input="input"
        @focus="focus"
        @blur="blur"
        @keyup="keyUp"
        @onchange="input"
        ref="input"
        contentEditable="true"
      )
    .qb-underline(ref="underline")
</template>

<script>
import {mapState} from 'vuex';

export default {
  props: ['value'],
  computed: {
    show() {
      if(this.isSearching == true) return false;
      else return this.activeView.length == 0 && this.searchQuery == 0
    },
   ...mapState('root', ['activeView', 'searchQuery', 'isSearching'])
  },

  watch: {
    searchQuery() {
      this.$refs.input.textContent = this.searchQuery; 
      this.setUnderline();
    },
    activeView() { this.$nextTick(() => this.setUnderline()) },
  },

  methods: {
    input(e) { this.$emit('input', e.target.textContent) },
    focus() { this.$nextTick(() => this.$refs.input.focus()) },
    blur() {
      this.$store.commit('root/setSearching', false);
      this.$refs.input.blur();
    },

    keyUp(e) {
      e.stopPropagation();
      switch(e.key) {
        case 'Escape':
          this.blur(); break;
        case 'Backspace':
          if( this.value == '') this.blur(); break;
        case 'Enter':
          e.preventDefault();
          window.location.href=`https://www.google.com/search?q=${this.searchQuery}`; break;
      }
    },

    setUnderline() {
      let width = this.$refs.underline.getBoundingClientRect().width;
      let endWidth = this.$refs.inputCon.getBoundingClientRect().width;
      let multiplier = endWidth == 0 ? .15 : .05;

      let lerped = (endWidth - width) * multiplier + width;
      lerped = lerped < 1 ? 0 : lerped;
      
      this.$refs.underline.style.width = `${lerped}px`;

      if(endWidth - width >= 1 || endWidth - width <= -1)
        requestAnimationFrame(this.setUnderline);
    }
  }
}
</script>