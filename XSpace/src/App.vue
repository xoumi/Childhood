<template>
  <div class="rootContainer">
    <Navbar class="navbar" />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>


<script>
import Navbar from './components/Navbar.vue';
import Landing from './views/Landing.vue';
import Thoughts from './views/Thoughts.vue';

export default {
  name: 'Root',
  components: {Landing, Navbar, Thoughts},
  data: () => ({
  })
}
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css?family=Roboto|Roboto+Condensed')
@import 'assets/css/variables.sass'

*
  box-sizing: border-box
  margin: 0
  padding: 0

body
  height: 100vh
  font-size: 1em
  overflow: hidden

.rootContainer
  height: 100%
  width: 100%
  max-width: 1000px
  position: relative
  margin: auto
  display: flex
  justify-content: center
  align-items: center

.navbar
  position: fixed
  top: 0
  z-index: 1

.fade-enter-active, .fade-leave-active
  transition: all .5s

.fade-enter, .fade-leave-to
  opacity: 0

</style>
