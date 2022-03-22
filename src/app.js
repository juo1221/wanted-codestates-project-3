import './app.scss';
import { err } from '@Utils/util';
import { el } from '@Utils/util';
import { qs } from '@Utils/util';
const Item = class {
  #title;
  #state = false;
  constructor(title) {
    this.#title = title;
  }
  get title() {
    return this.#title;
  }
  toggle() {
    this.#state = !this.#state;
  }
  get state() {
    return this.#state;
  }
  search(title) {
    return this.#title.includes(title) ? this : null;
  }
};
const ItemList = class {
  #itemList = new Set();
  setItem(item) {
    if (!(item instanceof Item)) err(`invalid item : ${item}`);
    this.#itemList.add(item);
  }
  getItems() {
    return [...this.#itemList];
  }
  getItemsLength() {
    return this.#itemList.size;
  }
  search(title) {
    if (!title) return;
    return [...this.#itemList].map((item) => item.search(title)).filter((state) => state);
  }
};
const Renderer = class {
  #itemList = new ItemList();
  async render(data) {
    if (!(data instanceof Data)) err(`invalid data : ${data}`);
    const { datas } = await data.getData();
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
};
const DomRenderer = class extends Renderer {
  #parent;
  #searchData = [];
  constructor(parent) {
    super();
    this.parent = parent;
    this.ul = qs(`${this.parent} .item-list`);
    this.itemCnt = qs(`${this.parent} .item-cnt`);
    this.searchBar = qs(`${this.parent} .searchBar`);
  }
  _render() {
    const { ul, itemCnt, searchBar } = this;
    const { itemList } = this;
    ul.innerHTML = '';
    const itemListData = itemList.getItems();
    const state = (this.#searchData.length ? this.#searchData : itemListData)
      .map((item) => {
        if (!item) return;
        const li = ul.appendChild(el('li', { appendChild: el('span', { innerHTML: item.title }), setAttribute: ['class', 'item'] }));
        li.onclick = () => {
          item.toggle();
          this._render();
        };
        return item.state;
      })
      .filter((item) => item).length;
    itemCnt.innerHTML = `${state} / ${itemList.getItemsLength()}`;

    searchBar.onkeyup = (e) => {
      const input = e.target.value.trim();
      this.#searchData = itemList.search(input) ? itemList.search(input) : itemListData;
      this._render();
    };
  }
};

const Data = class {
  async getData() {
    const data = await this._getData();
    return new ValidInfo(data);
  }
  async _getData() {
    err('must be overrided');
  }
};
const JsonData = class extends Data {
  #url;
  constructor(url) {
    if (typeof url !== 'string') err(`invalid typeof url : ${url}`);
    super();
    this.#url = url;
  }
  async _getData() {
    return (await fetch(this.#url)).json();
  }
};
const ValidInfo = class {
  #private;
  constructor(data) {
    if (!Array.isArray(data) || !data.length) err(`invalid typeof data : ${data}`);
    this.#private = data.map((obj) => {
      const { id, name, emoji } = obj;
      if (typeof id !== 'number' || !id) err(`invalid id : ${id}`);
      if (typeof name !== 'string' || !name) err(`invalid name : ${name}`);
      if (typeof emoji !== 'string' || !emoji) err(`invalid emoji : ${emoji}`);
      return obj;
    });
  }
  get datas() {
    return this.#private;
  }
};
const data = new JsonData('/api/options');
const renderer = new DomRenderer('#container');
renderer.render(data);
