<template>
  <div class="container">
    <div ref="scene" >
      <p ref="the" data-depth="0.3">THE</p>
      <Logo data-depth="0.1" class="logo" :animate=true />
      <p ref="space" data-depth="0.3">SPACE</p>
    </div>
  </div>
</template>

<script>
import Logo from '../components/Logo.vue';
import Parallax from 'parallax-js';
import TweenLite from 'gsap/TweenMax';

export default {
  name: 'Landing',
  components: {Logo},
  data: () => ({
  }),
  mounted() {
    let parallaxInstance = new Parallax(this.$refs.scene);

    let [the, space] = Object.values(this.$refs);
    TweenLite.from([the, space], 2, { opacity: 0});
  },
}
</script>

<style scoped lang="sass">
@import '../assets/css/variables.sass'

.container
  height: 100%
  width: 100%

div
  display: flex !important
  justify-content: center
  align-items: center

p
  padding: 0px 20px
  font-family: Roboto Condensed
  font-size: 4rem
  font-weight: 300
  color: $primaryBlack
  display: block !important
  position: relative !important

.logo
  width: 10rem
  display: block !important
  position: relative !important
</style>
