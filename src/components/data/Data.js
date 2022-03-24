import ValidInfo from '@Components/data/ValidInfo';

const Data = class {
  async getData() {
    const data = await this._getData();
    return new ValidInfo(data);
  }
  async _getData() {
    err('must be overrided');
  }
};

export default Data;
