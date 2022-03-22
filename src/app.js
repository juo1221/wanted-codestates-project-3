import './app.scss';
import { err } from '@Utils/util';

const Renderer = class {
  #_info;
  async render(data) {
    if (!(data instanceof Data)) err(`invalid data : ${data}`);
    this.#_info = await data.getData();
    this._render();
  }
  _render() {
    err('must be overrided');
  }
  get info() {
    return this.#_info;
  }
};

const DomRenderer = class extends Renderer {
  #parent;
  constructor(parent) {
    super();
    this.#parent = parent;
  }
  _render() {
    const { datas } = this.info;
    console.log(datas);
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
const renderer = new DomRenderer('#page');
renderer.render(data);
