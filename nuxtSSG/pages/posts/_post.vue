<template lang="pug">
.post
  component(:is="postTemplate")
</template>

<script lang="coffee">
export default
  head: ->
    title: @title
  asyncData: ({params}) ->
    try
      post = await import("~/posts/#{params.post}.md")
      return
        title: post.attributes.title,
        postTemplate: post.vue.component
    catch err
      console.debug err
      false
</script>