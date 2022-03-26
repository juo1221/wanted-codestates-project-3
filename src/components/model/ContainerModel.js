import Model from '@Components/model/Model';
import singleton from '@Components/Single';
import { err } from '@Utils/util';

const ContainerModel = class extends Model {
  #width = '300';
  #height = '400';
  _reg = /([0-9]*)/;
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
  changeHeight(heigth) {
    if (typeof heigth !== 'number' && typeof heigth !== 'string') err(`invalid typeof heigth : ${heigth}`);
    this.#width = width;
    this.notify();
  }
};

export default ContainerModel;
