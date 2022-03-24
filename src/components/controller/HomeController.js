import singleton from '@Components/Single';
import Controller from '@Components/controller/Controller';
import HomeModel from '@Components/model/HomeModel';
import HomeView from '@Components/view/HomeView';

const Home = class extends Controller {
  constructor(isSingleton = false) {
    super(isSingleton);
  }
  $list() {
    app.route('home');
  }
  $search() {}
  $select() {}
  $reset() {}
  $moveLeftAll() {}
  $moveRightAll() {}
  $moveLeft() {}
  $moveRight() {}
  base() {
    const model = new HomeModel(true);
    const view = new HomeView(this, true);
    model.addController(this);
    return view.render(model);
  }
  listen(model = err('')) {}
};

export default Home;
