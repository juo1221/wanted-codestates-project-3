import singleton from '@Components/Single';
import HomeModel from '@Components/model/HomeModel';
import View from '@Components/view/View';
import { append } from '@Utils/util';
import { prop } from '@Utils/util';
import { is } from '@Utils/util';
import { el } from '@Utils/util';

const HomeView = class extends View {
  constructor(controller, isSingleton) {
    super(controller, isSingleton);
  }
  render(model = err(`no model : ${model} `)) {
    if (!is(model, HomeModel)) err(`invalid model : ${model}`);
    const { controller: ctrl } = this;
    return append(
      el('div'),
      append(
        el('section', 'id', 'container-avaliable'),
        el('input', 'className', 'searchBar', 'type', 'text', 'placeholder', 'search', 'autocomplete', 'off', 'addEventListener', [
          'keyup',
          (e) => ctrl.$search(e.target.value.trim()),
        ]),
        el('h1', 'className', 'container-title', 'innerHTML', 'avaliable options'),
        append(
          el('ul', 'className', 'item-container'),
          ...model.list.map((model) =>
            append(
              el('li', 'className', `item ${model.size}`, 'addEventListener', ['click', () => ctrl.$select()]),
              el('span', 'innerHTML', `${model.emoji} ${model.name}`),
            ),
          ),
        ),
        el('span', 'className', 'item-cnt', 'innerHTML', '0 / 0'),
      ),
      append(
        el('div', 'className', 'move-buttons'),
        el('button', 'className', 'btn btn-reset', 'innerHTML', 'reset', 'addEventListener', ['click', () => ctrl.$reset()]),
        el('button', 'className', 'btn btn-multi-left', 'innerHTML', '<<', 'addEventListener', ['click', () => ctrl.$moveLeftAll()]),
        el('button', 'className', 'btn btn-multi-right', 'innerHTML', '>>', 'addEventListener', ['click', () => ctrl.$moveRightAll()]),
        el('button', 'className', 'btn btn-single-left', 'innerHTML', '<', 'addEventListener', ['click', () => ctrl.$moveLeft()]),
        el('button', 'className', 'btn btn-single-right', 'innerHTML', '>', 'addEventListener', ['click', () => ctrl.$moveRight()]),
      ),
      append(
        el('section', 'id', 'container-selected'),
        el('input', 'className', 'searchBar', 'type', 'text', 'placeholder', 'search', 'autocomplete', 'off', 'addEventListener', [
          'keyup',
          (e) => ctrl.$search(e.target.value.trim()),
        ]),
        el('h1', 'className', 'container-title', 'innerHTML', 'selected options'),
        append(
          el('ul', 'className', 'item-container'),
          ...model.list.map((model) =>
            append(
              el('li', 'className', `item ${model.size}`, 'addEventListener', ['click', () => ctrl.$select()]),
              el('span', 'innerHTML', `${model.emoji} ${model.name}`),
            ),
          ),
        ),
        el('span', 'className', 'item-cnt', 'innerHTML', '0 / 0'),
      ),
      append(
        el('section', 'className', 'setting'),
        el('button', 'className', 'btn btn-settin', 'innerHTML', '세팅'),
        append(
          el('div', 'className', 'setting-title'),
          el('p', 'innerHTML', '타이틀'),
          el('input', 'type', 'checkbox', 'name', 'checked', 'true'),
          append(
            el('div'),
            el('input', 'type', 'text', 'id', 'avaliable', 'placeholder', 'available options'),
            el('input', 'type', 'text', 'id', 'selected', 'placeholder', 'selected options'),
          ),
        ),
        append(
          el('div', 'className', 'setting-search'),
          el('p', 'innerHTML', '검색'),
          el('input', 'type', 'checkbox', 'id', 'search-controller', 'checked', 'true'),
        ),
        append(
          el('div', 'className', 'setting-move'),
          el('p', 'innerHTML', '하나씩만 옮기기'),
          el('input', 'type', 'checkbox', 'id', 'move-controller', 'checked', 'true'),
        ),
        append(
          el('div', 'className', 'setting-item-size'),
          el('p', 'innerHTML', '아이템 크기'),
          append(
            el('div'),
            append(el('div'), append(el('p', 'innerHTML', 'XS'), el('input', 'type', 'radio', 'id', 'size-xs', 'checked', 'true', 'name', 'size'))),
            append(el('div'), append(el('p', 'innerHTML', 'S'), el('input', 'type', 'radio', 'id', 'size-s', 'name', 'size'))),
            append(el('div'), append(el('p', 'innerHTML', 'M'), el('input', 'type', 'radio', 'id', 'size-m', 'name', 'size'))),
          ),
        ),
        append(
          el('div', 'className', 'setting-window-size'),
          append(el('div'), el('p', 'innerHTML', '가로'), append(el('div'), el('input', 'type', 'text', 'id', 'size-width', 'value', '300'))),
          append(el('div'), el('p', 'innerHTML', '세로'), append(el('div'), el('input', 'type', 'text', 'id', 'size-height', 'value', '400'))),
        ),
      ),
    );
  }
};

export default HomeView;
