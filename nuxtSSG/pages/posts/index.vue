<template lang="pug">
.posts
  button(v-for="tag in tags" :key="tag" @click="setTag(tag)") {{ tag }}
  ul
    li(v-for="post in filteredPosts" :key="post.attributes.title")
      nuxt-link(:to="getPermalink(post)") {{post.attributes.title}}
</template>

<script lang="coffee">
export default
  asyncData: ->
    resolve = require.context "@/posts/", true, /\.md$/
    imports = resolve.keys().map (key) => return resolve key 
    return
      posts: imports
  
  data: ->
    prefix: 'posts',
    filterTag: ''

  computed:
    filteredPosts: ->
      @posts.filter (post) =>
        unless @filterTag is ''
          @filterTag in post.attributes.tags
        else true
          
    tags: ->
      tags = []
      @posts.forEach (post) =>
        post.attributes.tags.forEach (tag) =>
          unless tag in tags then tags.push tag
      tags

  methods:
    getPermalink: (post) -> "#{@prefix}/#{post.attributes.url}"
    setTag: (tag) -> @filterTag = if @filterTag is tag then '' else tag

</script>
