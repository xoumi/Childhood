<template lang="pug">
  transition(name="draw")
    svg.search-icon(width="27" height="27" fill="none" xmlns="http://www.w3.org/2000/svg")
      path(d="M25 25l-8.87-8.86a8.24 8.24 0 0 1-11.69 0A8.27 8.27 0 1 1 16.13 4.41a8.26 8.26 0 0 1 0 11.71" stroke="#fff" stroke-width="4" stroke-linecap="round")
</template>

<script>

export default { name: 'search-icon' }
</script>