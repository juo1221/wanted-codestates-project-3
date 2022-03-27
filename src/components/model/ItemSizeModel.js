import Model from '@Components/model/Model';
import singleton from '@Components/Single';

const ItemSizeModel = class extends Model {
  #size = 'size-xs';
  constructor(isSingleton) {
    super();
    if (isSingleton) return singleton.getInstance(this);
  }
  get size() {
    return this.#size;
  }
  changeSize(size) {
    this.#size = size;
    this.notify();
  }
};
export default ItemSizeModel;
