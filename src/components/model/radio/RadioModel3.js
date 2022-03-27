import Model from '@Components/model/Model';
import singleton from '@Components/Single';

const RadioModel3 = class extends Model {
  #state = false;
  constructor(isSingleton) {
    super();
    if (isSingleton) return singleton.getInstance(this);
  }
  get state() {
    return this.#state;
  }
  chageState(state) {
    this.#state = state;
  }
};

export default RadioModel3;
