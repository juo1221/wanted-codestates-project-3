import singleton from '@Util/util';
import Controller from '@Components/controller/Controller';

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
    const view = new HomeBaseView(this, true);
    model.addController(this);
    return view.render(model);
  }
  listen(model = err('')) {
    switch (true) {
      case is(model, HomeModel):
        this.$list();
        break;
      case is(model, HomeDetailModel):
        this.$detail(model.id);
        break;
      default:
        err(`invalid model : ${model}`);
    }
  }
};

export default Home;
