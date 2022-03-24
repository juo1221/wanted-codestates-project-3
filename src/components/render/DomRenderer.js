import { err } from '@Utils/util';
import { el } from '@Utils/util';
import { qs } from '@Utils/util';

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
    this.parentSection = qs(this.parentAvaliable);
    this.ul = qs(`${this.parentAvaliable} .item-list`);
    this.itemCnt = qs(`${this.parentAvaliable} .item-cnt`);
    this.searchBar = qs(`${this.parentAvaliable} .searchBar`);

    this.selectedParent = parent[1];
    this.selectedParentSection = qs(this.selectedParent);
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
    qs('#size-width').onchange = (e) => {
      [this.parentSection, this.selectedParentSection].forEach((section) => (section.style.width = `${e.target.value / 10}rem`));
    };
    qs('#size-height').onchange = (e) => {
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

export default DomRenderer;
