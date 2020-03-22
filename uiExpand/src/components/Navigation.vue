<template lang="pug">
.navigation
  .navigation-grid
    .navigation-grid-block(
      v-for="view in views"
      :key="`${view}-block`"
      :ref="`${view}-block`"
      :class="`block-${view}`"
      @click="setActiveView(view)"
    )
      .navigation-grid-block-column-bg-left(
        :ref="`${view}-bg-left`" 
        :class="`navigation-grid-block-column-bg-left-${view}`"
      )
      .navigation-grid-block-column-bg-right(
        :ref="`${view}-bg-right`"
        :class="`navigation-grid-block-column-bg-right-${view}`"
      )
    router-view
    h1(
      v-for="view in views"
      :key="`${view}-title`"
      :ref="`${view}-title`"
      :class="`title-${view} navigation-grid-title-${view}`"
      ).navigation-grid-title {{view.toUpperCase()}}
</template>


<script>
import {mapState} from 'vuex';
import animate from '@/assets/animations/navigationGrid';

export default {
  name: 'navigation',
  computed: mapState('navigation', ['activeView', 'views', 'expandView']),

  methods: {
    setActiveView(view) {
      this.$store.dispatch('navigation/setActiveView', view);
      this.$router.push({name: view});
    }
  },

  watch: {
    activeView(newVal, oldVal) {
      if(newVal != 'home') animate.expand(this.$refs, newVal);
      else if(oldVal != '') animate.shrink(this.$refs, oldVal);
    },
    expandView(newVal, oldVal) {
      console.log({newVal, oldVal});
      animate.set(this.$refs, newVal);

    }
  },
}
</script>