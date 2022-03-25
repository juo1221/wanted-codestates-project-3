import singleton from '@Components/Single';
import DetailModel from '@Components/model/DetailModel';
import JsonData from '@Components/data/JsonData';
import Data from '@Components/data/Data';
import Model from '@Components/model/Model';
import { err } from '@Utils/util';
import { prop } from '@Utils/util';

const HomeModel = class extends Model {
  constructor(isSingleton) {
    super(isSingleton);
  }
  loadData() {
    return new Promise(async (res, rej) => {
      if (!this._data || !(this._data instanceof Data)) err(`invalid data : ${this._data}`);
      const { datas } = await this._data.getData();
      prop(this, { _list: datas.map(({ id, name, emoji }) => new DetailModel(id, name, emoji)) });
      res('done');
    });
  }
  add(...list) {
    this._list.push(...list);
  }
  remove(id) {
    let result;
    if (!this._list.some((li, idx) => li.id === id && this._list.splice(idx, 1))) err('');
    this.notify();
  }
  search(input) {
    prop(this, { _searchList: this.list.filter((li) => li.search(input)) });
    this.notify();
  }
  get list() {
    return this._list && [...this._list];
  }
  get(id) {
    let res;
    if (
      !this._list.some((li) => {
        return li.id == id && (res = li);
      })
    )
      err(`invalid id : ${id}`);
    return res;
  }
  get length() {
    return this._list.length;
  }
  set data(data) {
    this._data = data;
  }
  get totalClickedCnt() {
    return this.list.reduce((prev, curr) => ((prev += curr.state ? 1 : 0), prev), 0);
  }
  get searchList() {
    return this._searchList;
  }
};

export default HomeModel;
