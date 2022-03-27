import './app.scss';
import HomeController from '@Components/controller/HomeController';
import HomeModel from '@Components/model/HomeModel';
import SelectedHomeModel from '@Components/model/SelectedHomeModel';
import JsonData from '@Components/data/JsonData';
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
  route(path, ...arg) {
    if (!super.has(path)) err(`no path in App : ${path}`);
    const controller = super.get(path)();
    append(el(sel(this.#parent), 'innerHTML', ''), controller['base'](...arg));
  }
};

const app = new App('#main');

(async () => {
  const homeModel = new HomeModel(true);
  const selectedHomeModel = new SelectedHomeModel(true);
  homeModel.data = new JsonData('./data/mockup.json');
  selectedHomeModel.data = new JsonData('./data/mockup.json');

  await homeModel.loadData();
  app.add('home', (_) => new HomeController(true));
  app.route('home');
})();

export default app;
