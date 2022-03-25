import Model from '@Components/model/Model';
import singleton from '@Components/Single';

const TitleAvModel = class extends Model {
  #title = 'avaliable options';
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

export default TitleAvModel;
