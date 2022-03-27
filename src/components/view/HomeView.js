import singleton from '@Components/Single';
import HomeModel from '@Components/model/HomeModel';
import './HomeView.scss';
import View from '@Components/view/View';
import { append } from '@Utils/util';
import { prop } from '@Utils/util';
import { is } from '@Utils/util';
import { el } from '@Utils/util';
import { sel } from '@Utils/util';
import { err } from '@Utils/util';

const HomeView = class extends View {
  constructor(controller, isSingleton) {
    super(controller, isSingleton);
    const settingBtn = sel('.btn-setting');
    settingBtn.onclick = () => controller.$settingToggle();
  }
  render(props) {
    const {
      model: hmodel,
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
    } = props;
    if (!is(hmodel, HomeModel)) err(`invalid model : ${hmodel}`);
    if (!is(smodel, HomeModel)) err(`invalid model : ${smodel}`);
    const { controller: ctrl } = this;
    return append(
      el('div', 'className', 'wrapper'),
      append(
        el(
          'section',
          'className',
          'container container-avaliable',
          '@width',
          containerModel.width / 10 + 'rem',
          '@height',
          containerModel.height / 10 + 'rem',
        ),
        el(
          'input',
          'className',
          'searchBar',
          'type',
          'text',
          'placeholder',
          'search',
          'autocomplete',
          'off',
          'readOnly',
          checkBoxModelS.readonly,
          'addEventListener',
          ['change', (e) => ctrl.$search(e.target)],
        ),
        el('div', 'className', 'container-title', 'innerHTML', titleAvModel.title),
        append(
          el('ul', 'className', 'item-container'),
          ...hmodel.list.map((li) =>
            append(
              el('li', 'className', `item ${itemSizeModel.size} ${li.state ? 'item-checked' : ''}`, 'addEventListener', [
                'click',
                (e) => ctrl.$select(e, li.id),
              ]),
              el('span', 'innerHTML', `${li.emoji} ${li.name}`),
            ),
          ),
        ),
        append(
          el('div', 'className', `item-cnt`),
          el('span', 'className', ` ${checkBoxModelC.state ? 'visible' : 'invisible'}`, 'innerHTML', `${hmodel.totalClickedCnt} / ${hmodel.length}`),
        ),
      ),
      append(
        el('div', 'id', 'move-buttons'),
        el('button', 'className', 'btn btn-reset', 'innerHTML', 'reset', 'addEventListener', ['click', () => ctrl.$reset()]),
        el('button', 'className', 'btn btn-multi-left', 'innerHTML', '<<', 'addEventListener', ['click', () => ctrl.$moveLeftAll()]),
        el('button', 'className', 'btn btn-multi-right', 'innerHTML', '>>', 'addEventListener', ['click', () => ctrl.$moveRightAll()]),
        el('button', 'className', 'btn btn-single-left', 'innerHTML', '<', 'addEventListener', ['click', () => ctrl.$moveLeft()]),
        el('button', 'className', 'btn btn-single-right', 'innerHTML', '>', 'addEventListener', ['click', () => ctrl.$moveRight()]),
      ),
      append(
        el(
          'section',
          'className',
          'container container-selected',
          '@width',
          containerModel.width / 10 + 'rem',
          '@height',
          containerModel.height / 10 + 'rem',
        ),
        el(
          'input',
          'className',
          'searchBar',
          'type',
          'text',
          'placeholder',
          'search',
          'autocomplete',
          'off',
          'readOnly',
          checkBoxModelS.readonly,
          'addEventListener',
          ['change', (e) => ctrl.$searchOpt(e.target)],
        ),
        el('div', 'className', 'container-title', 'innerHTML', titleSeModel.title),
        append(
          el('ul', 'className', 'item-container'),
          ...smodel.list.map((li) => {
            return append(
              el('li', 'className', `item ${itemSizeModel.size} ${li.state ? 'item-checked' : ''}`, 'addEventListener', [
                'click',
                (e) => ctrl.$selectOpt(e, li.id),
              ]),
              el('span', 'innerHTML', `${li.emoji} ${li.name}`),
            );
          }),
        ),
        append(
          el('div', 'className', `item-cnt`),
          el('span', 'className', ` ${checkBoxModelC.state ? 'visible' : 'invisible'}`, 'innerHTML', `${smodel.totalClickedCnt} / ${smodel.length}`),
        ),
      ),
      append(
        el('section', 'id', 'setting', 'className', settingModel.state ? 'activated' : ''),
        el('div'),
        append(
          el('div', 'className', 'title'),
          el('p', 'innerHTML', '타이틀'),
          el('input', 'type', 'checkbox', 'checked', checkBoxModel1.state, 'addEventListener', ['change', () => ctrl.$lock()]),
        ),
        append(
          el('div', 'className', 'inputs'),
          el(
            'input',
            'type',
            'text',
            'id',
            'available',
            'placeholder',
            'available options',
            'readOnly',
            checkBoxModel1.readonly,
            'addEventListener',
            ['change', (e) => ctrl.$chageTitleAv(e.target.value.trim())],
          ),
          el('input', 'type', 'text', 'id', 'selected', 'placeholder', 'selected options', 'readOnly', checkBoxModel1.readonly, 'addEventListener', [
            'change',
            (e) => ctrl.$chageTitleSe(e.target.value.trim()),
          ]),
        ),
        append(
          el('div', 'className', 'setting-search'),
          el('p', 'innerHTML', '검색'),
          el('input', 'type', 'checkbox', 'id', 'search-controller', 'checked', checkBoxModelS.state, 'addEventListener', [
            'change',
            (e) => ctrl.$lockSearch(),
          ]),
        ),
        append(
          el('div', 'className', 'setting-move'),
          el('p', 'innerHTML', '하나씩만 옮기기'),
          el('input', 'type', 'checkbox', 'id', 'move-controller', 'checked', checkBoxModel3.state, 'addEventListener', [
            'change',
            () => ctrl.$lockMove(),
          ]),
        ),
        append(
          el('div', 'className', 'setting-showcnt'),
          el('p', 'innerHTML', '선택된 아이템 개수 표시'),
          el('input', 'type', 'checkbox', 'id', 'cnt-controller', 'checked', checkBoxModelC.state, 'addEventListener', [
            'change',
            () => ctrl.$lockShowCnt(),
          ]),
        ),
        append(
          el('div', 'className', 'setting-item-size'),
          el('p', 'innerHTML', '아이템 크기'),
          append(
            el('div', 'className', 'radios'),
            append(
              el('div', 'className', 'radio'),
              el('p', 'innerHTML', 'XS'),
              el('input', 'type', 'radio', 'id', 'size-xs', 'checked', radioModel.state, 'addEventListener', [
                'change',
                (e) => ctrl.$radioToggle(e.target.id),
              ]),
            ),
            append(
              el('div', 'className', 'radio'),
              el('p', 'innerHTML', 'S'),
              el('input', 'type', 'radio', 'id', 'size-s', 'checked', radioModel2.state, 'addEventListener', [
                'change',
                (e) => ctrl.$radioToggle2(e.target.id),
              ]),
            ),
            append(
              el('div', 'className', 'radio'),
              el('p', 'innerHTML', 'M'),
              el('input', 'type', 'radio', 'id', 'size-m', 'checked', radioModel3.state, 'addEventListener', [
                'change',
                (e) => ctrl.$radioToggle3(e.target.id),
              ]),
            ),
          ),
        ),
        append(
          el('div', 'className', 'setting-window-size'),
          append(
            el('div', 'className', 'window-width'),
            el('p', 'innerHTML', '가로'),
            append(
              el('div'),
              el('input', 'type', 'text', 'id', 'size-width', 'value', containerModel.width, 'addEventListener', [
                'change',
                (e) => ctrl.$chageWidth(e.target.value.trim()),
              ]),
            ),
          ),
          append(
            el('div', 'className', 'window-height'),
            el('p', 'innerHTML', '세로'),
            append(
              el('div'),
              el('input', 'type', 'text', 'id', 'size-height', 'value', containerModel.height, 'addEventListener', [
                'change',
                (e) => ctrl.$chageHeight(e.target.value.trim()),
              ]),
            ),
          ),
        ),
      ),
    );
  }
};

export default HomeView;
