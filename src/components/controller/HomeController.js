import singleton from '@Components/Single';
import Controller from '@Components/controller/Controller';
import HomeModel from '@Components/model/HomeModel';
import DetailModel from '@Components/model/DetailModel';
import HomeView from '@Components/view/HomeView';
import SelectedHomeModel from '@Components/model/SelectedHomeModel';
import SelectedDetailModel from '@Components/model/SelectedDetailModel';
import TitleAvModel from '@Components/model/TitleAvModel';
import TitleSeModel from '@Components/model/TitleSeModel';
import CheckBoxModel from '@Components/model/CheckBoxModel';
import CheckBoxModelS from '@Components/model/CheckBoxModelS';
import SearchModel from '@Components/model/SearchModel';

import { is } from '@Utils/util';
import { setTimeout } from 'core-js';
import app from '../../app';

const Home = class extends Controller {
  constructor(isSingleton = false) {
    super(isSingleton);
  }
  $list() {
    app.route('home');
  }
  $search(input) {
    const target = input.value.trim();
    const model = new HomeModel(true);
    const smodelList = new SelectedHomeModel(true).list;
    model.addController(this);
    model.search(target, smodelList);
  }
  $searchOpt(input) {
    const target = input.value.trim();
    const modelList = new HomeModel(true).list;
    const model = new SelectedHomeModel(true);
    model.addController(this);
    model.search(target, modelList);
  }
  $select(id) {
    const model = new HomeModel(true).get(id);
    model.addController(this);
    model.toggle();
  }
  $selectOpt(id) {
    const model = new SelectedHomeModel(true).get(id);
    model.addController(this);
    model.toggle();
  }
  async $reset() {
    const model = new HomeModel(true);
    const smodel = new SelectedHomeModel(true);
    await model.loadData();
    smodel.clear();
  }
  $moveLeftAll() {
    const model = new HomeModel(true);
    const smodel = new SelectedHomeModel(true);
    smodel.addController(this);
    model.add(...smodel.list);
    smodel.clear();
  }
  $moveRightAll() {
    const model = new HomeModel(true);
    const smodel = new SelectedHomeModel(true);
    model.addController(this);
    smodel.add(...model.list);
    model.clear();
  }
  $moveLeft() {
    const model = new HomeModel(true);
    const smodel = new SelectedHomeModel(true);
    const target = smodel.find();
    model.add(...target);
    smodel.remove(...target);
  }
  $moveRight() {
    const model = new HomeModel(true);
    const smodel = new SelectedHomeModel(true);
    const target = model.find();
    smodel.add(...target);
    model.remove(...target);
  }
  $chageTitleAv(input) {
    const titleAvModel = new TitleAvModel(true);
    titleAvModel.addController(this);
    titleAvModel.changeTo(input);
  }
  $chageTitleSe(input) {
    const titleSeModel = new TitleSeModel(true);
    titleSeModel.addController(this);
    titleSeModel.changeTo(input);
  }
  $lock() {
    const checkBoxModel1 = new CheckBoxModel(true);
    checkBoxModel1.addController(this);
    checkBoxModel1.toggle();
  }
  $lockSearch() {
    const checkBoxModelS = new CheckBoxModelS(true);
    checkBoxModelS.addController(this);
    checkBoxModelS.toggle();
  }
  home() {
    app.route('home');
  }
  async base() {
    const model = new HomeModel(true);
    const view = new HomeView(this, true);
    const smodel = new SelectedHomeModel(true);
    const titleAvModel = new TitleAvModel(true);
    const titleSeModel = new TitleSeModel(true);
    const checkBoxModel1 = new CheckBoxModel(true);
    const checkBoxModelS = new CheckBoxModelS(true);
    const checkBoxModel3 = new CheckBoxModel(false);
    const searchModel = new SearchModel(true);
    model.addController(this);
    smodel.addController(this);
    titleAvModel.addController(this);
    titleSeModel.addController(this);
    checkBoxModel1.addController(this);
    checkBoxModelS.addController(this);
    checkBoxModel3.addController(this);
    searchModel.addController(this);
    const props = { model, smodel, titleAvModel, titleSeModel, checkBoxModel1, checkBoxModelS, checkBoxModel3 };
    return view.render(props);
  }
  listen(model = err('')) {
    switch (true) {
      case is(model, HomeModel):
      case is(model, DetailModel):
        this.home();
        break;
      case is(model, TitleAvModel):
      case is(model, TitleSeModel):
        this.home();
        break;
      case is(model, CheckBoxModel):
      case is(model, SearchModel):
        this.home();
        break;
      default:
        err(`invalid model : ${model}`);
    }
  }
};

export default Home;
