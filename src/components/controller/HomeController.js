import singleton from '@Components/Single';
import Controller from '@Components/controller/Controller';
import HomeModel from '@Components/model/HomeModel';
import DetailModel from '@Components/model/DetailModel';
import HomeView from '@Components/view/HomeView';
import SelectedHomeModel from '@Components/model/SelectedHomeModel';
import SelectedDetailModel from '@Components/model/SelectedDetailModel';
import { is } from '@Utils/util';
import app from '../../app';
import { setTimeout } from 'core-js';

const Home = class extends Controller {
  constructor(isSingleton = false) {
    super(isSingleton);
  }
  $list() {
    app.route('home');
  }
  $search(input) {
    const target = input.value.trim();
    const model = new HomeModel(true);
    const smodelList = new SelectedHomeModel(true).list;
    model.addController(this);
    model.search(target, smodelList);
  }
  $select(id) {
    const model = new HomeModel(true).get(id);
    model.addController(this);
    model.toggle();
  }
  $reset() {
    const model = new HomeModel(true);
    model.reset();
  }
  $moveLeftAll() {}
  $moveRightAll() {
    const model = new HomeModel(true);
    const smodel = new SelectedHomeModel(true);
    model.addController(this);
    smodel.add(...model.list);
    model.clear();
  }
  $moveLeft() {}
  $moveRight() {
    const model = new HomeModel(true);
    const smodel = new SelectedHomeModel(true);
    const target = model.find();
    smodel.add(...target);
    model.remove(...target);
  }
  home() {
    app.route('home');
  }
  async base() {
    const model = new HomeModel(true);
    const view = new HomeView(this, true);
    const smodel = new SelectedHomeModel(true);
    model.addController(this);
    smodel.addController(this);
    return view.render(model, smodel);
  }
  listen(model = err('')) {
    switch (true) {
      case is(model, HomeModel):
        this.home();
        break;
      case is(model, DetailModel):
        this.home();
        break;
      default:
        err(`invalid model : ${model}`);
    }
  }
};

export default Home;
