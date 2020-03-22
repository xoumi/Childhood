import {Power3, TimelineLite} from 'gsap/TweenMax';

let ease = Power3.easeInOut;
let duration = .5;
let delay = .8;

export default {
  animate(cover, el, size) {
    let tl = new TimelineLite();
    let {height, width} = size.getClientRects()[0];
    tl.set(cover, {width, height, scaleX: 0});
    tl.set(el, {opacity: 0});

    tl.to(cover, duration, {
      scaleX: 1, transformOrigin: 'left', ease
    }, delay)
    .set(el, {opacity: 1})
    .to(cover, duration, {
      scaleX: 0, transformOrigin: 'right', ease
    }, '-=.05');
  }
}