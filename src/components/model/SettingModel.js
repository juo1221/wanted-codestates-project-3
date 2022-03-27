import Model from '@Components/model/Model';
import singleton from '@Components/Single';

const SettingModel = class extends Model {
  _state = false;
  constructor(isSingleton) {
    super();
    if (isSingleton) return singleton.getInstance(this);
  }
  get state() {
    return this._state;
  }
  toggle() {
    this._state = !this._state;
    console.log(this._state);
    this.notify();
  }
};

export default SettingModel;
