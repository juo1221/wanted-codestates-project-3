const DetailModel = class extends Model {
  #id;
  #name;
  #emoji;
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
};

export default DetailModel;
