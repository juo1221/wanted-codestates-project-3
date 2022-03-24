import singleton from '@Components/Single';

const Model = class extends Set {
  constructor(isSingleton) {
    super();
    if (isSingleton) return singleton.getInstance(this);
  }
  addController(ctrl) {
    if (!is(ctrl, Controller)) err(`invaild controller : ${ctrl}`);
    super.add(ctrl);
  }
  removeController() {
    if (!is(ctrl, Controller)) err(`invaild controller : ${ctrl}`);
    super.delete(ctrl);
  }
  notify() {
    super.forEach((ctrl) => ctrl.listen(this));
  }
};

export default Model;
