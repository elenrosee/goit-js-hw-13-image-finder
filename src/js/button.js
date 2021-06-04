export default class Button {
  constructor(selector) {
    this.btnEl = document.querySelector(selector);
  }
  enable() {
    this.btnEl.disabled = false;
    this.btnEl.classList.remove('visually-hidden');
  }

  disable() {
    this.btnEl.disabled = true;
    this.btnEl.classList.add('visually-hidden');
  }
}
