import {TweenMax, Power2} from "gsap/TweenMax";

export default {
  row(i, refs) {
    const start = refs.bookmark[0].getBoundingClientRect().y;
    let { height, y } = refs.bookmark[i].getBoundingClientRect();
    TweenMax.to(refs.activeRow, .15, {
      y: (y - start),
      height,
      ease: Power2.easeInOut
    });
  },
  column(endCol, refs) {
    let el = refs.root;
    let col = parseInt(window.getComputedStyle(el).gridColumnStart.substr(1, 1));
    if (endCol != col) {
      let x = (endCol - col) * window.innerWidth / 5;
      TweenMax.to(el, .5, {
        x, ease: Power2.easeInOut,
        onComplete: () =>
          TweenMax.set(el, {
            gridArea: `c${endCol}`,
            transform: 'translateX(0px)'
          })
      });
    }
  }
}