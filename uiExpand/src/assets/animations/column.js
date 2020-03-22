import {TweenLite, Power3} from 'gsap/TweenMax';

let ease = Power3.easeOut;
let duration = 1;
let delay = .5;

export default {
  expand(cols, width) {
    TweenLite.set(cols[1], {'width': width * 2});
    TweenLite.from(cols, duration, {
      transformOrigin: 'left',
      scaleX: 0,
      delay,
      ease
    });
  },
  shrink(cols) {
    return new Promise(function (resolve, reject) {
      TweenLite.to(cols, duration, {
        transformOrigin: 'left', scaleX: 0, ease
      });
      TweenLite.delayedCall(duration - .6, () => {
        resolve();
      });
    });
  }
}