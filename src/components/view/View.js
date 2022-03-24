import singleton from '@Components/Single';

const View = class {
  #controller;
  constructor(_controller = err(''), isSingleton = false) {
    this.#controller = _controller;
    if (isSingleton) return singleton.getInstance(this);
  }
  render(model = null) {
    err('override');
  }
  get controller() {
    return this.#controller;
  }
};
