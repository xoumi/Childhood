<template>
  <ul>
    <li ref="leadingLine" class="line"></li>
    <li class="right">
      <p ref="li1"><router-link to="/thoughts" exact>thoughts</router-link></p>
      <p ref="li2"><router-link to="/" exact>works</router-link></p>
      <p ref="li3"><router-link to="/" exact>about</router-link></p>
    </li>
  </ul>
</template>


<script>
//import Logo from './Logo.vue';
import {TimelineLite, Power3} from 'gsap/TweenMax';
export default {
  name: 'Navbar',

  components: {},
  data: () => ({
  }),

  mounted() {
    const tl = new TimelineLite();
    const [leadingLine, ...li] = Object.values(this.$refs);

    tl.from(leadingLine, 2, {scaleX: 0, transformOrigin:"0% 50%", ease: Power3.easeInOut})
    .staggerFrom(li, 0.5, {opacity: 0, x: '-10'}, 0.2,'-=0.6');
  }
}
</script>


<style scoped lang="sass">
ul
  display: flex
  width: 100%
  align-items: center
  margin-top: 10px
  margin-right: 10px

  li
    list-style-type: none
    p
      padding: 10px
    p:first-child
      padding-left: 20px
    p:last-child
      padding-right: 20px

.logo
  width: 3em
  height: 3em
  margin: 10px 30px 0 0

a
  font-family: Roboto Condensed
  font-size: 1.2rem
  text-decoration: none
  color: #444

.right
  display: flex

ul .line
  width: 100%
  height: 3px
  background: #aaa
</style>
