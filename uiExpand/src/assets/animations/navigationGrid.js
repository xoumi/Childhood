import {TweenLite, Power4} from 'gsap/TweenMax';

let ease = Power4.easeInOut;
let duration = 1;

export default {
  expand(ref, category) {
    let els = [
      ref[`${category}-block`][0],
      ref[`${category}-title`][0],
      ref[`${category}-bg-left`][0],
      ref[`${category}-bg-right`][0]
    ];
    let {left, top, width, height} = els[0].getBoundingClientRect();
    let wwidth = window.innerWidth;
    let blockScaleX = wwidth / width;
    let blockScaleY = window.innerHeight / height;
    let titleRect = els[1].getBoundingClientRect();

    TweenLite.set(els[0], {zIndex: 2});
    TweenLite.set(els[2], {width: wwidth * 1/5 / blockScaleX})
    TweenLite.set(els[3], {width: wwidth * 2/5 / blockScaleX})
    TweenLite.set(els[1], {zIndex: 4});

    //block expand
    TweenLite.to(els[0], duration, {
      x: -left, y: -top,
      scaleX: blockScaleX, scaleY: blockScaleY,
      transformOrigin: 'top left',
      ease,
    });
    //bg-expand
    TweenLite.to([els[2], els[3]], duration, {
      scaleX: 1,
      transformOrigin: 'left',
      ease, delay: .2
    })

    //text expand
    TweenLite.to(els[1], duration, {
      x: -titleRect.left + 30,
      y: -titleRect.top + 40,
      scale: 2, transformOrigin: 'top left',
      ease,
    });

  },

  shrink(ref, category) {
    let els = [
      ref[`${category}-block`][0],
      ref[`${category}-title`][0],
      ref[`${category}-bg-left`][0],
      ref[`${category}-bg-right`][0]
    ];
    TweenLite.to(els[0], duration, {
      x: 0, y: 0, scale: 1, ease, delay: duration - .8
    });
    TweenLite.to(els[1], duration, {
      x: 0, y: 0, scale: 1, ease, delay: duration - .8
    });
    TweenLite.to([els[2], els[3]], duration, {
      scaleX: 0, transformOrigin: 'left', ease
    });
    TweenLite.set([els[0], els[1]], {zIndex: 1, delay: duration});
  },

  set(ref, category) {
    let els = [
      ref[`${category}-block`][0],
      ref[`${category}-title`][0],
      ref[`${category}-bg-left`][0],
      ref[`${category}-bg-right`][0]
    ];
    let {left, top, width, height} = els[0].getBoundingClientRect();
    let wwidth = window.innerWidth;
    let scaleX = wwidth / width;
    let scaleY = window.innerHeight / height;
    let blockScaleX = wwidth / width;

    TweenLite.set([els[0], els[1]], {
      x: -left,
      y: -top,
      scaleX, scaleY,
      transformOrigin: 'top left'
    });
    TweenLite.set(els[2], {width: wwidth * 1/5 / blockScaleX, scaleX: 1})
    TweenLite.set(els[3], {width: wwidth * 2/5 / blockScaleX, scaleX: 1})
    TweenLite.set(els[1], {zIndex: 4});
    TweenLite.set(els[0], {zIndex: 2});

  }
}
