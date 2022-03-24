import { err } from '@Utils/util';
import { append } from '@Utils/util';
import { el } from '@Utils/util';
import { sel } from '@Utils/util';

import Renderer from '@Components/render/Renderer';

const DomRenderer = class extends Renderer {
  #parent;
  #searchData = [];
  #selectedData = [];
  #selectedSearchData = [];
  #isLocked = true;
  constructor(parent) {
    super();
    this.parentAvaliable = parent[0];
    this.parentSection = sel(this.parentAvaliable);
    this.ul = sel(`${this.parentAvaliable} .item-list`);
    this.itemCnt = sel(`${this.parentAvaliable} .item-cnt`);
    this.searchBar = sel(`${this.parentAvaliable} .searchBar`);

    this.selectedParent = parent[1];
    this.selectedParentSection = sel(this.selectedParent);
    this.selectedUl = sel(`${this.selectedParent} .item-list`);
    this.selectedItemCnt = sel(`${this.selectedParent} .item-cnt`);
    this.selectedSearchBar = sel(`${this.selectedParent} .searchBar`);

    const titleAv = sel('container-avaliable .container-title');
    const titleInputAv = sel(`#avaliable`);
    titleInputAv.onchange = (e) => {
      const value = e.target.value;
      titleAv.innerHTML = value;
    };

    const titleSe = sel('#container-selected .container-title');
    const titleInputSe = sel(`#selected`);
    titleInputSe.onchange = (e) => {
      const value = e.target.value;
      titleSe.innerHTML = value;
    };

    const searchController = sel('#search-controller');
    searchController.onchange = (e) => {
      if (!e.target.checked) {
        this.searchBar.readOnly = true;
        this.selectedSearchBar.readOnly = true;
      } else {
        this.searchBar.readOnly = false;
        this.selectedSearchBar.readOnly = false;
      }
    };

    const moveController = sel('#move-controller');
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

    [sel('#size-s'), sel('#size-xs'), sel('#size-m')].forEach((input) => {
      input.onchange = (e) => {
        [itemList, selectedItemList].forEach((list) => list.getItems().forEach((el) => (el.size = input.id)));
        this._render();
      };
    });
    sel('#size-width').onchange = (e) => {
      [this.parentSection, this.selectedParentSection].forEach((section) => (section.style.width = `${e.target.value / 10}rem`));
    };
    sel('#size-height').onchange = (e) => {
      [this.parentSection, this.selectedParentSection].forEach((section) => (section.style.height = `${e.target.value / 10}rem`));
    };
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
        const li = ul.appendChild(append(el('li'), el('span', 'innerHTML', item.title, 'className', `item ${item.size}`)));
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

export default DomRenderer;
