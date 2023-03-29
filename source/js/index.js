import Nav from './nav.js';
import Search from './search.js';

const init = (Component, elemSelector, ...rest) => {
  const elem = document.querySelector(elemSelector);

  if (elem !== null) {
    const instance = new Component(elem, ...rest);
    instance.init();
  }
};

const work = () => {
  init(Nav, `.page-header__nav[data-expandable]`, `toggle-nav-button`, `site-list`);
  init(Search, `#search-field`, `search--notempty`);
};

if (document.readyState === `loading`) {
  document.addEventListener(`DOMContentLoaded`, work);
} else {
  work();
}
