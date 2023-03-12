import Nav from './nav.js';

const work = () => {
  const navElem = document.querySelector(`.page-header__nav`);

  if (navElem !== null) {
    const nav = new Nav(navElem, `toggle-nav-button`, `site-list`);
    nav.init();
  }
};

if (document.readyState === `loading`) {
  document.addEventListener(`DOMContentLoaded`, work);
} else {
  work();
}
