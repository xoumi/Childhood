<template lang="pug">
.revealTag(ref="size")
  .revealTag-cover(ref="cover" :class="activeView")
  slot
</template>

<script>
import {TimelineLite, Power3} from 'gsap/TweenMax';
import animate from '@/assets/animations/revealTag';
import {mapState} from 'vuex';

export default {
  props: ['content'],
  computed: mapState('navigation', ['activeView']),
  mounted() {
    let tl = new TimelineLite();

    //Slot dimensions doesn't render on first tick.
    //Use nextTick to get vue state after slot hydrated
    this.$nextTick(function() {
      animate.animate(
        this.$refs.cover,
        this.$slots.default[0].elm,
        this.$refs.size
      );
    });
  }
}
</script>