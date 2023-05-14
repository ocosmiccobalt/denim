class Nav {
  constructor(navElem) {
    this.BUTTON_CLASS = `toggle-nav-button`;
    this.MENU_CLASS = `site-list`;
    this.nav = navElem;
    this.button = this.nav.querySelector(`.${this.BUTTON_CLASS}`);
    this.menu = this.nav.querySelector(`.${this.MENU_CLASS}`);
    this.buttonOpenClass = `${this.BUTTON_CLASS}--open`;
    this.menuOpenClass = `${this.MENU_CLASS}--open`;
    this.buttonClosedClass = `${this.BUTTON_CLASS}--closed`;
    this.menuClosedClass = `${this.MENU_CLASS}--closed`;
  }

  init() {
    if (this.button !== null && this.menu !== null) {
      this.button.classList.remove(this.buttonOpenClass);
      this.button.classList.add(this.buttonClosedClass);

      this.menu.classList.remove(this.menuOpenClass);
      this.menu.classList.add(this.menuClosedClass);

      this.button.setAttribute(`aria-expanded`, false);
      this.button.addEventListener(`click`, this.onButtonClick.bind(this));
    }
  }

  onButtonClick(evt) {
    const target = evt.currentTarget;
    const expanded = target.getAttribute(`aria-expanded`) === `true`;

    target.setAttribute(`aria-expanded`, !expanded);
    target.classList.toggle(this.buttonClosedClass);
    target.classList.toggle(this.buttonOpenClass);
    this.menu.classList.toggle(this.menuClosedClass);
    this.menu.classList.toggle(this.menuOpenClass);
  }
}

export default Nav;
