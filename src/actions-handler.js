const keyStore = new Set(['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight']);

export class ActionsHandler {
  constructor() {
    this.keys = new Set();
    this.touchY = '';
    this.touchDebounce = 30;
    this.init();
  }

  init() {
    window.addEventListener('keydown', (evt) => {
      if (keyStore.has(evt.key)) this.keys.add(evt.key);
    });
    window.addEventListener('keyup', (evt) => {
      if (keyStore.has(evt.key)) this.keys.delete(evt.key);
    });
    window.addEventListener('touchstart', (evt) => {
      this.touchY = evt.changedTouches[0].pageY;
    });
    window.addEventListener('touchmove', (evt) => {
      const swipeDistance = evt.changedTouches[0].pageY - this.touchY;
      if (swipeDistance < -this.touchDebounce && !this.keys.has('SwipeUp')) {
        this.keys.add('SwipeUp');
      } else if (
        swipeDistance > -this.touchDebounce &&
        !this.keys.has('SwipeDown')
      ) {
        this.keys.add('SwipeDown');
      }
    });
    window.addEventListener('touchend', (evt) => {
      this.keys.delete('SwipeUp');
      this.keys.delete('SwipeDown');
    });
  }
}
