class Nav {
  constructor(navElem, buttonClass, menuClass) {
    this.navElem = navElem;
    this.buttonOpenClass = `${buttonClass}--open`;
    this.menuOpenClass = `${menuClass}--open`;
    this.buttonClosedClass = `${buttonClass}--closed`;
    this.menuClosedClass = `${menuClass}--closed`;
    this.button = this.navElem.querySelector(`.${buttonClass}`);
    this.menu = this.navElem.querySelector(`.${menuClass}`);
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
