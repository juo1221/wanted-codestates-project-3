import Item from '@Components/item/Item';

const ItemList = class {
  #itemList = new Set();
  setItem(item) {
    if (!(item instanceof Item)) err(`invalid item : ${item}`);
    this.#itemList.add(item);
  }
  getItems() {
    return [...this.#itemList];
  }
  search(title) {
    if (!title) return;
    return [...this.#itemList].map((item) => item.search(title)).filter((state) => state);
  }
  find() {
    return [...this.#itemList].filter((item) => item.find());
  }
  removeItem(item) {
    if (!(item instanceof Item)) err(`invalid item : ${item}`);
    this.#itemList.delete(item);
  }
  clear() {
    this.#itemList.clear();
  }
};
export default ItemList;
