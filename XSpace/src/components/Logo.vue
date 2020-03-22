<template>
  <svg width="284" height="284" viewBox="0 0 284 284" fill="red" xmlns="http://www.w3.org/2000/svg">
    <path ref="path" d="M76.6664 40.5L131.762 40.5L243.822 236L188.242 236L76.6664 40.5Z" />
    <line ref="l1" x1="164" y1="236" x2="263" y2="236" />
    <line ref="l2" x1="59" y1="40" x2="157" y2="40" />
    <line ref="l3" x1="189" y1="40" x2="249" y2="40"  />
    <line ref="l4" x1="65" y1="236" x2="125" y2="236"  />
    <line ref="l5" x1="138.352" y1="149.935" x2="88.5762" y2="236.149" />
    <line ref="l6" x1="224.892" y1="38.5652" x2="178.201" y2="119.435" />
    <line v-if="animate" class="guide" ref="g1" x1="70.5" y1="273.5" x2="70.5" y2="2.5" stroke-linecap="round"/>
    <line v-if="animate" class="guide" ref="g2" x1="243.5" y1="285.5" x2="243.5" y2="14.5" stroke-linecap="round"/>
    <line v-if="animate" class="guide" ref="g3" x1="158.5" y1="278.5" x2="158.5" y2="7.5" stroke-linecap="round"/>
    <line v-if="animate" class="guide" ref="g4" x1="281.5" y1="235.5" x2="10.5" y2="235.5" stroke-linecap="round"/>
    <line v-if="animate" class="guide" ref="g5" x1="273.5" y1="39.5" x2="2.5" y2="39.5" stroke-linecap="round"/>
  </svg>

</template>

<script>
import {TimelineLite, Expo} from "gsap/TweenMax";

export default {
  name: 'Logo',
  data: () => ({ }),
  props: ['animate'],
  mounted() {
    let guidesLength = [];
    Object.values(this.$refs).forEach(e => {
      let length = e.getTotalLength();
      e.style.strokeDasharray = length;
      if(e.classList.contains("guide")) guidesLength.push(length * -1);
      if(this.animate) e.style.strokeDashoffset = length;
    });

    if(this.animate) {
      const [ path, l1, l2, l3, l4, l5, l6, ...g]  = Object.values(this.$refs);
      const tl = new TimelineLite();
      const anim = {strokeDashoffset: "0", ease: Expo.easeOut };

      tl.staggerTo(g, 1, anim, 0.2)
      .add('l1', '-=0.9')
      .to(l1, 1, anim,"l1")
      .to(l2, 1, anim, "l1+=0.3")
      .to(l3, 1.25, anim, "l1+=0.5")
      .to(l4, 1.25, anim, "l1+=0.8")
      .to(l5, 1.75, anim, "l1+=1" )
      .to(l6, 1.75, anim, "l1+=1.3")
      .to(path, 2.3, {strokeDashoffset: "0", ease: Expo.easeInOut}, "l1+=0.3")
      .fromTo(path, 1,{fill: "transparent"}, {fill: "#333", ease: Expo.easeOut}, "l1+=1.5")
      .staggerTo(g, 0.5, {cycle: {strokeDashoffset: guidesLength}, ease: Expo.easeOut}, 0.2, "-=1");
    }
  }
}
</script>


<style scoped lang="sass">
@import '../assets/css/variables.sass'

svg
  path
    fill: $primaryBlack
    stroke: $primaryBlack
    stroke-width: 8
  line
    stroke-width: 10
    stroke: $primaryBlack
  .guide
    stroke: #333
    stroke-opacity: 0.4
    stroke-width: 3
</style>
