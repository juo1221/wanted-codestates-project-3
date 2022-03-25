import './app.scss';
import HomeController from '@Components/controller/HomeController';
import { append } from '@Utils/util';
import { el } from '@Utils/util';
import { err } from '@Utils/util';
import { sel } from '@Utils/util';

const App = class extends Map {
  #parent;
  constructor(_parent = err(`no parent`)) {
    super();
    this.#parent = _parent;
  }
  set() {
    err();
  }
  has() {
    err();
  }
  delete() {
    err();
  }
  add(k = err(`no path`), controllerF = err(`no controller`)) {
    if (!super.has(k)) super.set(k, controllerF);
  }
  async route(path, ...arg) {
    if (!super.has(path)) err(`no path in App : ${path}`);
    const controller = super.get(path)();
    append(el(sel(this.#parent), 'innerHTML', ''), await controller['base'](...arg));
  }
};
const app = new App('#main');
app.add('home', (_) => new HomeController(true));
app.route('home');

export default app;
