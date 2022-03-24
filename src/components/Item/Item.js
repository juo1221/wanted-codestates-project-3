const Item = class {
  #title;
  #state = false;
  #size = 'size-xs';
  constructor(title) {
    this.#title = title;
  }
  get title() {
    return this.#title;
  }
  toggle() {
    this.#state = !this.#state;
  }
  get state() {
    return this.#state;
  }
  resetState() {
    this.#state = false;
  }
  search(title) {
    return this.#title.includes(title) ? this : null;
  }
  find() {
    return this.#state ? this : null;
  }
  set size(size) {
    this.#size = size;
  }
  get size() {
    return this.#size;
  }
};
export default Item;
