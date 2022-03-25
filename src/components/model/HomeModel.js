import singleton from '@Components/Single';
import DetailModel from '@Components/model/DetailModel';
import JsonData from '@Components/data/JsonData';
import Data from '@Components/data/Data';
import Model from '@Components/model/Model';
import { err } from '@Utils/util';
import { prop } from '@Utils/util';
import { is } from '@Utils/util';

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
    for (const li of list) if (!is(li, DetailModel)) err(`invalid list : ${list}`);
    if (!this._list) this._list = [];
    (this._list.push(...list), this._list).forEach((li) => li.reset());
  }
  remove(...list) {
    for (const li of list) if (!is(li, DetailModel)) err(`invalid list : ${list}`);
    if (!list.every((targetLi) => this._list.some((originLi, idx) => originLi.id === targetLi.id && this._list.splice(idx, 1))))
      err(`invalid list : ${list}`);
    this.notify();
  }
  async search(input, smodelList) {
    await this.loadData();
    if (!smodelList.every((targetLi) => this._list.some((originLi, idx) => originLi.id === targetLi.id && this._list.splice(idx, 1))))
      err(`invalid list : ${smodelList}`);
    prop(this, { _list: this._list });
    const filtered = input === '' ? this._list : this._list.filter((li) => li.search(input));
    prop(this, { _list: filtered.length ? filtered : [{ emoji: '정보', name: '없음' }] });
    this.notify();
  }
  reset() {
    prop(this, { _list: this._list.map((li) => (li.reset(), li)) });
    this.notify();
  }
  find() {
    return this._list.filter((li) => li.find());
  }
  clear() {
    prop(this, { _list: [] });
    this.notify();
  }
  get(id) {
    let res;
    console.log(this._list);
    if (
      !this._list.some((li) => {
        return li.id == id && (res = li);
      })
    )
      err(`invalid id : ${id}`);
    return res;
  }
  get list() {
    return this._list ? [...this._list] : [];
  }
  get length() {
    return this._list ? this._list.length : 0;
  }
  set data(data) {
    this._data = data;
  }
  get totalClickedCnt() {
    return this.list.reduce((prev, curr) => ((prev += curr.state ? 1 : 0), prev), 0);
  }
};

export default HomeModel;
