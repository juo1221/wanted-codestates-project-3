import Model from '@Components/model/Model';

const DetailModel = class extends Model {
  #id;
  #name;
  #emoji;
  #size = 'size-xs';
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
  chageSize(size) {
    this.#size = size;
    this.notify();
  }
};

export default DetailModel;
