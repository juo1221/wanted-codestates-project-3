import './app.scss';
import JsonData from '@Components/data/JsonData';
import DomRenderer from '@Components/render/DomRenderer';

const renderer = new DomRenderer(['#container-avaliable', '#container-selected']);
renderer.data = new JsonData('/api/options');
renderer.render();
