import Model from '@Components/model/Model';

const DetailModel = class extends Model {
  #id;
  #name;
  #emoji;
  #size = 'size-xs';
  #state = false;
  constructor(_id = err(''), _name = err(''), _emoji = err('')) {
    super();
    this.#id = _id;
    this.#name = _name;
    this.#emoji = _emoji;
  }
  get id() {
    return this.#id;
  }
  get name() {
    return this.#name;
  }
  get emoji() {
    return this.#emoji;
  }
  get size() {
    return this.#size;
  }
  get state() {
    return this.#state;
  }
  find() {
    return this.#state === true ? this : null;
  }
  reset() {
    this.#state = false;
  }
  search(input) {
    return this.#name.includes(input) ? this : null;
  }
  chageSize(size) {
    this.#size = size;
    this.notify();
  }
  resetTrue() {
    this.#state = true;
    this.notify();
  }
  toggle() {
    this.#state = !this.#state;
    this.notify();
  }
};

export default DetailModel;
