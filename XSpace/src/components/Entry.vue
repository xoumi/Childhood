<template>
  <section class="entry-wrapper">
    <p class="date">{{entry.date}}</p>
    <a
      @click="$emit('selected')"
      class="article">
      <h2>{{entry.title}}</h2>
      <p>{{entry.body}}</p>
    </a>
  </section>
</template>

<script>
import {TimelineLite, Expo} from "gsap/TweenMax";

export default {
  name: 'Entry',
  props: ['entry'],
  data: () => ({
  }),
}
</script>

<style scoped lang="sass">
@import '../assets/css/variables.sass'
.entry-wrapper
  display: flex
  align-items: center

  &:hover > .date::before
    transform: translateX(0px)
    transition: all .3s
  &:hover > .date
    color: white
    transition: color .3s

  .date
    position: relative
    width: 5em
    flex-grow: 0
    flex-shrink: 0
    padding: 5px 0px 5px 10px
    overflow-x: hidden
    font-size: 0.9rem
    transition: color .4s
    &::before
      content: ''
      position: absolute
      top: 0
      left: 0
      height: 100%
      width: 100%
      border-radius: 100px 0 0 100px
      background: #333
      transform: translateX(100%)
      transition: all .3s
      z-index: -1
  .article
    text-decoration: none
    color: #333
    padding: 0px 20px
    cursor: pointer
    h2
      font-family: Roboto Condensed
      padding-bottom: 5px
    p
      font-family: Roboto
      font-size: 0.9rem

</style>
