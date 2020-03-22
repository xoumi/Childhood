<template lang="pug">
.view
  Column(ref="col1" :content="data[0]")
  Column(ref="col2" :content="data[1]")
  .view-content(@click="back")
</template>

<script>
import Column from '@/components/Column.vue';

export default {
  components: { Column },
  methods: {
    back() {
      this.$store.dispatch('navigation/setActiveView', 'home');
      this.$router.push({name: 'home'});
    }
  },
  data() {
    return {
      data: [
        { title: 'The List' },
        { title: 'The SubList' }
      ]
    }
  },
  mounted() {
    if(this.$store.state.navigation.activeView == '')
      this.$store.dispatch('navigation/setExpandView', 'ventures');
  }
}
</script>
