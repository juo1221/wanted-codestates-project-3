import Model from '@Components/model/Model';
import singleton from '@Components/Single';

const CheckBoxModel = class extends Model {
  #readonly = false;
  #state = true;
  constructor(isSingleton) {
    super();
    if (isSingleton) return singleton.getInstance(this);
  }
  get readonly() {
    return this.#readonly;
  }
  get state() {
    return this.#state;
  }
  toggle() {
    this.#readonly = !this.#readonly;
    this.#state = !this.#state;
    this.notify();
  }
};

export default CheckBoxModel;
