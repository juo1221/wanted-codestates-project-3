export const err = (msg) => {
  throw new Error(msg);
};
const el = (tag, attr = {}) => {
  return Object.entries(attr).reduce((el, [key, val]) => {
    typeof el[key] == "function"
      ? Array.isArray(el[key])
        ? el[key](...val)
        : el[key](val)
      : (el[key] = val);
    return el;
  }, document.createElement(tag));
};
export const qs = (selector) => document.querySelector(selector);
