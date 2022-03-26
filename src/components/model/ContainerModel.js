import Model from '@Components/model/Model';
import singleton from '@Components/Single';
import { err } from '@Utils/util';

const ContainerModel = class extends Model {
  #width = '300';
  #height = '400';

  constructor(isSingleton) {
    super();
    if (isSingleton) return singleton.getInstance(this);
  }
  get width() {
    return this.#width;
  }
  get height() {
    return this.#height;
  }
  changeWidth(width) {
    if (typeof width !== 'number' && typeof width !== 'string') err(`invalid typeof width : ${width}`);
    this.#width = width;
    this.notify();
  }
  changeHeight(height) {
    if (typeof height !== 'number' && typeof height !== 'string') err(`invalid typeof height : ${height}`);
    this.#height = height;
    this.notify();
  }
};

export default ContainerModel;
