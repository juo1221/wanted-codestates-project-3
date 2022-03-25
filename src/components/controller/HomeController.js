import singleton from '@Components/Single';
import Controller from '@Components/controller/Controller';
import HomeModel from '@Components/model/HomeModel';
import DetailModel from '@Components/model/DetailModel';
import HomeView from '@Components/view/HomeView';
import { is } from '@Utils/util';
import app from '../../app';

const Home = class extends Controller {
  constructor(isSingleton = false) {
    super(isSingleton);
  }
  $list() {
    app.route('home');
  }
  $search() {}
  $select(id) {
    const model = new HomeModel(true).get(id);
    model.addController(this);
    model.toggle();
  }
  $reset() {
    console.log(1);
  }
  $moveLeftAll() {}
  $moveRightAll() {}
  $moveLeft() {}
  $moveRight() {}
  home() {
    app.route('home');
  }
  async base() {
    const model = new HomeModel(true);
    const view = new HomeView(this, true);
    model.addController(this);
    model.list?.length || (await model.loadData());
    return view.render(model);
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
