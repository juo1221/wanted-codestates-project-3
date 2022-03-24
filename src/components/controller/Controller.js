import { override } from '@Utils/util';
import singleton from '@Components/Single';

const Controller = class {
  constructor(isSingleton) {
    if (isSingleton) return singleton.getInstance(this);
  }
  listen(model) {
    override();
  }
};
export default Controller;
