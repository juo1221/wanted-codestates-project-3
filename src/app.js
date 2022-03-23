import './app.scss';
import { err } from '@Utils/util';
import { el } from '@Utils/util';
import { qs } from '@Utils/util';
const Item = class {
  #title;
  #state = false;
  #size = 'size-xs';
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
  resetState() {
    this.#state = false;
  }
  search(title) {
    return this.#title.includes(title) ? this : null;
  }
  find() {
    return this.#state ? this : null;
  }
  set size(size) {
    this.#size = size;
  }
  get size() {
    return this.#size;
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
const DomRenderer = class extends Renderer {
  #parent;
  #searchData = [];
  #selectedData = [];
  #selectedSearchData = [];
  #isLocked = true;
  constructor(parent) {
    super();
    this.parentAvaliable = parent[0];
    this.ul = qs(`${this.parentAvaliable} .item-list`);
    this.itemCnt = qs(`${this.parentAvaliable} .item-cnt`);
    this.searchBar = qs(`${this.parentAvaliable} .searchBar`);

    this.selectedParent = parent[1];
    this.selectedUl = qs(`${this.selectedParent} .item-list`);
    this.selectedItemCnt = qs(`${this.selectedParent} .item-cnt`);
    this.selectedSearchBar = qs(`${this.selectedParent} .searchBar`);

    const titleAv = qs('container-avaliable .container-title');
    const titleInputAv = qs(`#avaliable`);
    titleInputAv.onchange = (e) => {
      const value = e.target.value;
      titleAv.innerHTML = value;
    };

    const titleSe = qs('#container-selected .container-title');
    const titleInputSe = qs(`#selected`);
    titleInputSe.onchange = (e) => {
      const value = e.target.value;
      titleSe.innerHTML = value;
    };

    const searchController = qs('#search-controller');
    searchController.onchange = (e) => {
      if (!e.target.checked) {
        this.searchBar.readOnly = true;
        this.selectedSearchBar.readOnly = true;
      } else {
        this.searchBar.readOnly = false;
        this.selectedSearchBar.readOnly = false;
      }
    };

    const moveController = qs('#move-controller');
    moveController.onchange = (e) => {
      if (e.target.checked) {
        this.#isLocked = true;
      } else {
        this.#isLocked = false;
      }
    };

    const { itemList, selectedItemList } = this;

    const [resetBtn, mutliLeftBtn, multiRightBtn, leftBtn, rightBtn] = Array.from(document.querySelectorAll('.move-buttons .btn'));
    resetBtn.onclick = () => {
      itemList.clear();
      selectedItemList.clear();
      this.render();
    };
    mutliLeftBtn.onclick = () => {
      selectedItemList.getItems().forEach((item) => {
        item.resetState();
        itemList.setItem(item);
      });
      selectedItemList.clear();
      this._render();
    };
    multiRightBtn.onclick = () => {
      itemList.getItems().forEach((item) => {
        item.resetState();
        selectedItemList.setItem(item);
      });
      itemList.clear();
      this._render();
    };
    leftBtn.onclick = () => {
      selectedItemList.find().forEach((item) => {
        item.resetState();
        selectedItemList.removeItem(item);
        itemList.setItem(item);
      });
      this._render();
    };
    rightBtn.onclick = () => {
      itemList.find().forEach((item) => {
        item.resetState();
        itemList.removeItem(item);
        selectedItemList.setItem(item);
      });
      this._render();
    };

    [qs('#size-s'), qs('#size-xs'), qs('#size-m')].forEach((input) => {
      input.onchange = (e) => {
        [itemList, selectedItemList].forEach((list) => list.getItems().forEach((el) => (el.size = input.id)));
        this._render();
      };
    });
  }
  _render() {
    const { ul, itemCnt, searchBar, selectedUl, selectedItemCnt, selectedSearchBar } = this;
    const { itemList, selectedItemList } = this;
    ul.innerHTML = '';
    selectedUl.innerHTML = '';
    const itemListData = itemList.getItems();
    const SelectedItemListData = selectedItemList.getItems();
    this.f(this.#searchData, itemListData, ul, itemCnt, searchBar, itemList);
    this.f(this.#selectedSearchData, SelectedItemListData, selectedUl, selectedItemCnt, selectedSearchBar, selectedItemList);
  }
  f(searchData, listData, ul, itemCnt, searchBar, list) {
    const state = (searchData.length ? searchData : listData)
      .map((item) => {
        if (!item) return;
        console.log(item);
        const li = ul.appendChild(
          el('li', {
            appendChild: el('span', { innerHTML: item.title }),
            setAttribute: ['class', `item ${item.size}`],
          }),
        );
        if (this.#isLocked) {
          li.onclick = (e) => {
            const findedList = list.find();
            if (!findedList.some((itm) => itm === item)) list.find().forEach((item) => item.resetState());
            item.toggle();
            this._render();
          };
        } else {
          li.onclick = (e) => {
            if (e.metaKey || e.ctrlKey) {
              item.toggle();
            } else {
              const findedList = list.find();
              if (!findedList.some((itm) => itm === item)) list.find().forEach((item) => item.resetState());
              item.toggle();
            }
            this._render();
          };
        }

        return item.state;
      })
      .filter((item) => item);
    itemCnt.innerHTML = `${state.length} / ${(searchData.length ? searchData : listData).length}`;

    searchBar.onkeyup = (e) => {
      const input = e.target.value.trim();
      if (searchBar === this.selectedSearchBar) {
        this.#selectedSearchData = list.search(input) ? list.search(input) : listData;
      } else {
        this.#searchData = list.search(input) ? list.search(input) : listData;
      }
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
const renderer = new DomRenderer(['#container-avaliable', '#container-selected']);
renderer.data = data;
renderer.render();
