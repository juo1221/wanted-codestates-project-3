import singleton from '@Components/Single';
import DetailModel from '@Components/model/DetailModel';
import JsonData from '@Components/data/JsonData';
import Data from '@Components/data/Data';
import Model from '@Components/model/Model';

const HomeModel = class extends Model {
  #data = new JsonData('/api/options');
  #list = [];
  constructor(isSingleton) {
    super(isSingleton);
    if (this.#list) return;
    if (!this.#data || !(this.#data instanceof Data)) err(`invalid data : ${this.#data}`);
    (async () => {
      const { datas } = await this.#data.getData();
      datas.forEach(({ id, name, emoji }) => this.#list.push(new DetailModel(id, name, emoji)));
    })();
  }
  add(...list) {
    this.#list.push(...list);
  }
  remove(id) {
    let result;
    if (!this.#list.some((li, idx) => li.id === id && this.#list.splice(idx, 1))) err('');
    this.notify();
  }
  get list() {
    return [...this.#list];
  }
  get(id) {
    let res;
    if (!this.#list.some((li) => li.id === id && (res = li))) err('');
    return res;
  }
};

export default HomeModel;
