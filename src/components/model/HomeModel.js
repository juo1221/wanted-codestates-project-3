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
      prop(this, { _list: datas.map(({ id, name, emoji }) => new DetailModel(id, name, emoji)).sort((a, b) => a.id - b.id) });
      res('done');
    });
  }
  add(...list) {
    for (const li of list) if (!is(li, DetailModel)) err(`invalid list : ${list}`);
    if (!this._list) this._list = [];
    this._list.push(...list);
    this._list.sort((a, b) => a.id - b.id);
  }
  remove(...list) {
    for (const li of list) if (!is(li, DetailModel)) err(`invalid list : ${list}`);
    this._list.sort((a, b) => a.id - b.id);
    list.sort((a, b) => b.id - a.id);
    list.forEach((li) => {
      if (
        !this._list.some((originLi, idx) => {
          if (originLi.id === li.id) {
            this._list.splice(idx, 1);
            return true;
          }
        })
      )
        err(`invalid list : ${list}`);
    });
    this.notify();
  }
  async search(input, smodelList) {
    await this.loadData();
    this._list.sort((a, b) => a.id - b.id);
    smodelList.sort((a, b) => b.id - a.id);
    smodelList.forEach((li) => {
      if (
        !this._list.some((originLi, idx) => {
          if (originLi.id === li.id) {
            this._list.splice(idx, 1);
            return true;
          }
        })
      )
        err(`invalid smodelList : ${smodelList}`);
    });
    prop(this, { _list: this._list });
    const filtered = input === '' ? this._list : this._list.filter((li) => li.search(input));
    prop(this, { _list: filtered.length ? filtered : [{ id: 9999, emoji: '💩', name: 'No Data!' }] });
    this.notify();

    /* 0.5초 뒤 경고 문자 삭제 */
    if (this._list[0].id === 9999) {
      console.log('no!');
      await (() =>
        new Promise((res, rej) => {
          setTimeout(() => {
            prop(this, { _list: [] });
            this.notify();
            res('done');
          }, 500);
        }))();
    }
  }
  reset() {
    prop(this, { _list: this._list.map((li) => (li.reset(), li)) });
    this.notify();
  }
  find() {
    if (!this._list) return;
    return this._list.filter((li) => li.find());
  }
  clear() {
    prop(this, { _list: [] });
    this.notify();
  }
  get(id) {
    let res;
    // console.log(this._list);
    if (
      !this._list.some((li) => {
        return li.id == id && (res = li);
      })
    )
      err(`invalid id : ${id}`);
    return res;
  }
  shiftToggle(target) {
    if (!is(target, DetailModel)) err(`invalid target: ${target}`);
    let firstTarget = this.find()[0] || this._list[0];
    let lastTarget = target;
    let filtered = [];
    let restOfFiltered = [];
    switch (true) {
      case firstTarget.id < lastTarget.id:
        filtered = this._list.filter((li) => {
          if (li.id >= firstTarget.id && li.id <= lastTarget.id) return li;
          else restOfFiltered.push(li);
        });
        break;
      case firstTarget.id > lastTarget.id:
        firstTarget = this.find()[this.find().length - 1];
        filtered = this._list.filter((li) => {
          if (li.id <= firstTarget.id && li.id >= lastTarget.id) return li;
          else restOfFiltered.push(li);
        });
        break;
      default:
        this.find().forEach((li) => li.reset());
        lastTarget.resetTrue();
    }
    restOfFiltered.forEach((li) => li.reset());
    filtered.forEach((li) => {
      li.reset();
      li.resetTrue();
    });
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
