<template>
  <div id="thought">
    <h1>A thought </h1>
  </div>
</template>

<script>
export default {
  data() {return {
    id: this.$route.params.id,
    content: {},
  }},
}
</script>

<style scoped lang="sass">

</style>
