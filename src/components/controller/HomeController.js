import singleton from '@Components/Single';
import Controller from '@Components/controller/Controller';
import HomeModel from '@Components/model/HomeModel';
import DetailModel from '@Components/model/DetailModel';
import HomeView from '@Components/view/HomeView';
import SelectedHomeModel from '@Components/model/SelectedHomeModel';
import SelectedDetailModel from '@Components/model/SelectedDetailModel';
import TitleAvModel from '@Components/model/title/TitleAvModel';
import TitleSeModel from '@Components/model/title/TitleSeModel';
import CheckBoxModel from '@Components/model/checkBox/CheckBoxModel';
import CheckBoxModelS from '@Components/model/checkBox/CheckBoxModelS';
import CheckBoxModelC from '@Components/model/checkBox/CheckBoxModelC';
import CheckBoxModelM from '@Components/model/checkBox/CheckBoxModelM';
import SearchModel from '@Components/model/SearchModel';
import RadioModel from '@Components/model/radio/RadioModel';
import RadioModel2 from '@Components/model/radio/RadioModel2';
import RadioModel3 from '@Components/model/radio/RadioModel3';
import ItemSizeModel from '@Components/model/ItemSizeModel';
import ContainerModel from '@Components/model/ContainerModel';
import SettingModel from '@Components/model/SettingModel';

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
  $select(e, id) {
    const model = new HomeModel(true);
    const checkBoxModelM = new CheckBoxModelM(true);
    const target = model.get(id);
    target.addController(this);
    if (checkBoxModelM.state) {
      model.find().forEach((li) => li.id !== target.id && li.reset());
      target.toggle();
    } else {
      switch (true) {
        case e.metaKey || e.ctrlKey:
          target.toggle();
          break;
        case e.shiftKey:
          model.shiftToggle(target);
          break;
        default:
          model.find().forEach((li) => li.id !== target.id && li.reset());
          target.toggle();
      }
    }
  }
  $selectOpt(e, id) {
    const model = new SelectedHomeModel(true);
    const checkBoxModelM = new CheckBoxModelM(true);
    const target = model.get(id);
    target.addController(this);
    if (checkBoxModelM.state) {
      model.find().forEach((li) => li.id !== target.id && li.reset());
      target.toggle();
    } else {
      switch (true) {
        case e.metaKey || e.ctrlKey:
          target.toggle();
          break;
        case e.shiftKey:
          model.shiftToggle(target);
          break;
        default:
          model.find().forEach((li) => li.id !== target.id && li.reset());
          target.toggle();
      }
    }
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
    target.forEach((li) => li.reset());
    model.add(...target);
    smodel.remove(...target);
  }
  $moveRight() {
    const model = new HomeModel(true);
    const smodel = new SelectedHomeModel(true);
    const target = model.find();
    target.forEach((li) => li.reset());
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
  $lockMove() {
    const checkBoxModelM = new CheckBoxModelM(true);
    checkBoxModelM.addController(this);
    checkBoxModelM.toggle();
  }
  $lockShowCnt() {
    const checkBoxModelC = new CheckBoxModelC(true);
    checkBoxModelC.addController(this);
    checkBoxModelC.toggle();
  }
  $radioToggle(size) {
    const radioModel = new RadioModel(true);
    const radioModel2 = new RadioModel2(true);
    const radioModel3 = new RadioModel3(true);
    radioModel.chageState(true);
    radioModel2.chageState(false);
    radioModel3.chageState(false);
    const itemSizeModel = new ItemSizeModel(true);
    itemSizeModel.addController(this);
    itemSizeModel.changeSize(size);
  }
  $radioToggle2(size) {
    const radioModel = new RadioModel(true);
    const radioModel2 = new RadioModel2(true);
    const radioModel3 = new RadioModel3(true);
    radioModel.chageState(false);
    radioModel2.chageState(true);
    radioModel3.chageState(false);
    const itemSizeModel = new ItemSizeModel(true);
    itemSizeModel.addController(this);
    itemSizeModel.changeSize(size);
  }
  $radioToggle3(size) {
    const radioModel = new RadioModel(true);
    const radioModel2 = new RadioModel2(true);
    const radioModel3 = new RadioModel3(true);
    radioModel.chageState(false);
    radioModel2.chageState(false);
    radioModel3.chageState(true);
    const itemSizeModel = new ItemSizeModel(true);
    itemSizeModel.addController(this);
    itemSizeModel.changeSize(size);
  }
  $chageWidth(width) {
    const containerModel = new ContainerModel(true);
    containerModel.addController(this);
    containerModel.changeWidth(width);
  }
  $chageHeight(height) {
    const containerModel = new ContainerModel(true);
    containerModel.addController(this);
    containerModel.changeHeight(height);
  }
  $settingToggle() {
    const settingmodel = new SettingModel(true);
    settingmodel.addController(this);
    settingmodel.toggle();
  }
  home() {
    app.route('home');
  }
  base() {
    const model = new HomeModel(true);
    const view = new HomeView(this, true);
    const smodel = new SelectedHomeModel(true);
    const titleAvModel = new TitleAvModel(true);
    const titleSeModel = new TitleSeModel(true);
    const checkBoxModel1 = new CheckBoxModel(true);
    const checkBoxModelS = new CheckBoxModelS(true);
    const checkBoxModelC = new CheckBoxModelC(true);
    const checkBoxModel3 = new CheckBoxModelM(true);
    const searchModel = new SearchModel(true);
    const radioModel = new RadioModel(true);
    const radioModel2 = new RadioModel2(true);
    const radioModel3 = new RadioModel3(true);
    const itemSizeModel = new ItemSizeModel(true);
    const containerModel = new ContainerModel(true);
    const settingModel = new SettingModel(true);
    model.addController(this);
    smodel.addController(this);
    titleAvModel.addController(this);
    titleSeModel.addController(this);
    checkBoxModel1.addController(this);
    checkBoxModelS.addController(this);
    checkBoxModel3.addController(this);
    checkBoxModelC.addController(this);
    searchModel.addController(this);
    itemSizeModel.addController(this);
    containerModel.addController(this);
    settingModel.addController(this);
    const props = {
      model,
      smodel,
      titleAvModel,
      titleSeModel,
      checkBoxModel1,
      checkBoxModelS,
      checkBoxModel3,
      checkBoxModelC,
      radioModel,
      radioModel2,
      radioModel3,
      itemSizeModel,
      containerModel,
      settingModel,
    };
    return view.render(props);
  }
  listen(model = err('')) {
    switch (true) {
      case is(model, HomeModel):
        this.home();
        break;
      case is(model, DetailModel):
        this.home();
        break;
      case is(model, TitleAvModel):
        this.home();
        break;
      case is(model, TitleSeModel):
        this.home();
        break;
      case is(model, CheckBoxModel):
        this.home();
        break;
      case is(model, SearchModel):
        this.home();
        break;
      case is(model, ItemSizeModel):
        this.home();
        break;
      case is(model, ContainerModel):
        this.home();
        break;
      case is(model, SettingModel):
        this.home();
        break;
      default:
        err(`invalid model : ${model}`);
    }
  }
};

export default Home;
