import A11yDialog from 'a11y-dialog';

import Nav from './components/nav.js';
import Search from './components/search.js';
import replaceAnchorsWithButtons from './util/replaceAnchorsWithButtons.js';
import DetailsDropdown from './components/detailsDropdown.js';
import Accordion from './components/accordion.js';

const init = (Component, elemSelector, ...rest) => {
  const elem = document.querySelector(elemSelector);

  if (elem !== null) {
    const instance = new Component(elem, ...rest);
    instance.init();
  }
};

const work = () => {
  init(Nav, `.page-header__nav[data-expandable]`);
  init(Search, `#search-field`);
  replaceAnchorsWithButtons(`a[data-a11y-dialog-show]`);

  const cartDialogContainer = document.querySelector(`#cart-dialog`);
  new A11yDialog(cartDialogContainer);

  init(DetailsDropdown, `.details-dropdown`);
  init(Accordion, `.accordion`);
};

if (document.readyState === `loading`) {
  document.addEventListener(`DOMContentLoaded`, work);
} else {
  work();
}
