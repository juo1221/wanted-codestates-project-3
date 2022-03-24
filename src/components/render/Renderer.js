import ItemList from '@Components/item/ItemList';
import Item from '@Components/item/Item';
import Data from '@Components/data/Data';

const Renderer = class {
  #itemList = new ItemList();
  #selectedItemList = new ItemList();
  #data;
  async render() {
    if (!this.#data || !(this.#data instanceof Data)) err(`invalid data : ${this.#data}`);
    const { datas } = await this.#data.getData();
    datas.forEach((data) => {
      const { name, emoji } = data;
      this.#itemList.setItem(new Item(`${emoji} ${name}`));
    });
    this._render();
  }
  _render() {
    err('must be overrided');
  }
  get itemList() {
    return this.#itemList;
  }
  get selectedItemList() {
    return this.#selectedItemList;
  }
  set data(data) {
    this.#data = data;
  }
};

export default Renderer;
