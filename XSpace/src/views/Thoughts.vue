
<template>
  <section class="ThoughtsContainer">

    <!-- "Thoughts" Text -->
    <div id="thoughtsHeader" :class="{moveUp: isEntry}" data-depth="0.16" ref="pageTitle">
      <svg width="159" viewBox="0 0 158 217" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line y1="11" x2="158" y2="11.5" />
        <line :class="{lineMoveUp: isEntry}" ref="vertLine" x1="79" y1="20" x2="79" y2="217" stroke-linecap="round"/>
      </svg>
      <h1>HOUGHTS</h1>
    </div>

    <!-- Entries -->
    <div ref="entries" class="entries" :class="{ entriesMoveUp: isEntry}" >

      <transition-group name="entries" tag="div">
        <Entry
          ref="m"
          class="entries-entry"
          v-for="entry in entries"
          :key="entry.id"
          @selected="selected(entry.id)"
          :entry="entry">
        </Entry>
      </transition-group>
    </div>

    <transition name="entries">
    <p v-if="isEntry" @click="back" class="back"> <-</p>
    </transition>

  </section>
</template>


<script>
import {TweenLite, TimelineLite, Power4, Power2} from 'gsap/TweenMax';
import SimpleBar from 'simplebar';
import 'simplebar/dist/simplebar.css';

let entriesAPI = [
  {
    id: 1,
    date: "12-02-19",
    title: "Day 4",
    body: "Consectetur tempore enim quisquam esse alias iure asperiores Quia fuga quos accusantium quam ut? Et sed accusantium recusandae provident commodi Eveniet non adipisci vitae vel doloribus Numquam sequi ab enim"
  },
  {
    id: 2,
    date: "19-02-19",
    title: "Day 3",
    body: "Consectetur tempore enim quisquam esse alias iure asperiores Quia fuga quos accusantium quam ut? Et sed accusantium recusandae provident commodi Eveniet non adipisci vitae vel doloribus Numquam sequi ab enim"
  },
  {
    id: 3,
    date: "10-02-19",
    title: "Day 2",
    body: "Consectetur tempore enim quisquam esse alias iure asperiores Quia fuga quos accusantium quam ut? Et sed accusantium recusandae provident commodi Eveniet non adipisci vitae vel doloribus Numquam sequi ab enim"
  },
  {
    id: 4,
    date: "03-02-19",
    title: "Day 1",
    body: "Consectetur tempore enim quisquam esse alias iure asperiores Quia fuga quos accusantium quam ut? Et sed accusantium recusandae provident commodi Eveniet non adipisci vitae vel doloribus Numquam sequi ab enim"
  },
{
    id: 5,
    date: "10-02-19",
    title: "Day 0",
    body: "Consectetur tempore enim quisquam esse alias iure asperiores Quia fuga quos accusantium quam ut? Et sed accusantium recusandae provident commodi Eveniet non adipisci vitae vel doloribus Numquam sequi ab enim"
  },
{
    id: 6,
    date: "10-02-19",
    title: "Day -1",
    body: "Consectetur tempore enim quisquam esse alias iure asperiores Quia fuga quos accusantium quam ut? Et sed accusantium recusandae provident commodi Eveniet non adipisci vitae vel doloribus Numquam sequi ab enim"
  },
{
    id: 7,
    date: "10-02-19",
    title: "Day Before Time",
    body: "Consectetur tempore enim quisquam esse alias iure asperiores Quia fuga quos accusantium quam ut? Et sed accusantium recusandae provident commodi Eveniet non adipisci vitae vel doloribus Numquam sequi ab enim"
  },
];

import Entry from '../components/Entry.vue';

export default {
  name: 'Thoughts',
  components: {Entry},

  data: () => ({
    isEntry: false,
    entries: entriesAPI,
    scrollLocation: '',
  }),
  computed: {
  },

  methods: {
    selected(index) {
      this.entries = this.entries.filter(e => e.id == index);
      this.isEntry = true;

      this.scrollLocation = this.$refs.m[index].$el.scrollTop;
      console.log(this.scrollLocation);

      //TweenLite.to(this.$refs.vertLine, 1, {attr:{y2: "+=620"}});

    },

    back() {
      this.entries = entriesAPI;
      this.isEntry = false;
    },
  },

  mounted() {
    let tl = new TimelineLite();
    const sb = new SimpleBar(this.$refs.entries);

    let {m} = this.$refs;
    m = m.map(e => e.$el);

    let entriesHeight = document.querySelector('.ThoughtsContainer').offsetHeight;
    const height = (entriesHeight * 8);


    tl.from(this.$refs.pageTitle, .4,
      {opacity: 0, ease: Power4.ease},)
      .to(this.$refs.vertLine, 1,
        {attr:{y2: height }, ease: Power2.easeInOut})
      .staggerFrom(m, .5,
        {opacity: 0, x: -10,}, .1, "-=0.5");
  }
};
</script>


<style scoped lang="sass">

.ThoughtsContainer
  height: 100vh
  width: 70%
  min-width: 300px
  padding-top: 75px
  display: flex !important
  flex-direction: column
  pointer-events: auto !important

#thoughtsHeader
  display: flex !important
  height: 3rem
  margin-left: 2.85rem
  position: static !important
  transition: all 1s

  svg
    height: 100%
    width: auto
    transform: translateX(10px)
    overflow: visible
    line
      stroke: #333
      stroke-width: 20
  h1
    font-family: Roboto Condensed
    font-weight: 400
    font-size: 3rem
    color: #333

.entries
  height: 100%
  width: 100%
  font-family: Roboto Condensed
  position: relative !important
  overflow-x: hidden
  margin-top: 30px
  transition: all 1s;

  &-entry
    margin: 30px 0px

  &-move
    transition: transform .6s

  &-enter-active
    transition: transform .2s, opacity 2s

  &-leave-active
    position: absolute
    transition: opacity .4s, transform 1s

  &-enter, &-leave-to
    opacity: 0

.moveUp
  color: transparent
  transform: translateY(-210px)
  transition: all 1s

.entriesMoveUp
  transform: translateY(-70px)

.back
  font-size: 2em
  transform: translateY(-50px)
  cursor: pointer

</style>
