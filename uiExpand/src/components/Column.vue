<template lang="pug">
.column
  .column-content
    RevealTag(
    ).column-content-title
      h2 {{ content.title }}
    //- .column-content-vertLine(ref="vertline")
    .column-content-list(ref="list")
      p Learn Blanching Lorem Ipsum Lorem Ipsum Lorem Ipsum
      p Learn chopping onions
      p Item 3
      p Item 4 
</template>

<script>
import {TimelineLite, Power3} from 'gsap/TweenMax';
import RevealTag from '@/components/RevealTag.vue';

export default {
  name: 'column',
  props: ['content'],
  components: { RevealTag },
  mounted() {
    let tl = new TimelineLite();

    tl.from(this.$refs.list, 1, {
      opacity: 0, x: -15, ease: Power3.easeOut,
    }, 1);
    /*
    tl.from(this.$refs.vertline, .5, {
      scaleY: 0, transformOrigin: 'top', ease: Power3.easeInOut,
    }, 1);
    */
  }
}
</script>