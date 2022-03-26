import Model from '@Components/model/Model';
import singleton from '@Components/Single';

const SearchModel = class extends Model {
  constructor(isSingleton) {
    super(isSingleton);
  }
  get readonly() {
    return this._readonly;
  }
  get state() {
    return this._state;
  }
  toggle() {
    this._readonly = !this._readonly;
    this._state = !this._state;
    this.notify();
  }
};

export default SearchModel;
