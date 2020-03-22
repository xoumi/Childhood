<template>
  <div>
    <nuxt />
  </div>
</template>

<style lang="sass">
.page-enter-active, .page-leave-active
  transition: opacity .5s

.page-enter, .page-leave-active
  opacity: 0

html
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI'
  font-size: 16px
  word-spacing: 1px
  -ms-text-size-adjust: 100%
  -webkit-text-size-adjust: 100%
  -moz-osx-font-smoothing: grayscale
  -webkit-font-smoothing: antialiased
  box-sizing: border-box

*, *:before, *:after
  box-sizing: border-box
  margin: 0
</style>
