import A11yDialog from 'a11y-dialog';

import Nav from './components/nav.js';
import Search from './components/search.js';
import replaceAnchorsWithButtons from './util/replaceAnchorsWithButtons.js';

const init = (Component, elemSelector, ...rest) => {
  const elem = document.querySelector(elemSelector);

  if (elem !== null) {
    const instance = new Component(elem, ...rest);
    instance.init();
  }
};

const work = () => {
  init(Nav, `.page-header__nav[data-expandable]`, `toggle-nav-button`, `site-list`);
  init(Search, `#search-field`, `search--notempty`, `search--hasfocus`);
  replaceAnchorsWithButtons(`a[data-a11y-dialog-show]`);

  const cartDialogContainer = document.querySelector(`#cart-dialog`);
  new A11yDialog(cartDialogContainer);
};

if (document.readyState === `loading`) {
  document.addEventListener(`DOMContentLoaded`, work);
} else {
  work();
}
