import Model from '@Components/model/Model';
import singleton from '@Components/Single';

const TitleSeModel = class extends Model {
  #title = 'selected options';
  constructor(isSingleton) {
    super();
    if (isSingleton) return singleton.getInstance(this);
  }
  get title() {
    return this.#title;
  }
  changeTo(newT) {
    this.#title = newT;
    this.notify();
  }
};

export default TitleSeModel;
