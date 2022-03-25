import { err } from '@Utils/util';
const Single = class extends WeakMap {
  static single = null;
  get() {
    err();
  }
  has() {
    err();
  }
  set() {
    err();
  }
  delete() {
    err();
  }
  getInstance(ins) {
    if (!super.has(ins.constructor)) super.set(ins.constructor, ins);
    return super.get(ins.constructor);
  }
};
const singleton = new Single();
export default singleton;
