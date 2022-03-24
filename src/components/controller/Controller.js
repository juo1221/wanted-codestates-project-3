import override from '@Util/util';
import singleton from '@Util/util';

const Controller = class {
  constructor(isSingleton) {
    if (isSingleton) return singleton.getInstance(this);
  }
  listen(model) {
    override();
  }
};
export default Controller;
