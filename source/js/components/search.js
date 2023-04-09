import { checkTab } from '../util/checkKey.js';

class Search {
  constructor(searchInputElem, notEmptyClass, hasFocusClass) {
    this.field = searchInputElem;
    this.form = this.field.form;
    this.button = this.form.querySelector(`button[type=submit]`);
    this.notEmptyClass = notEmptyClass;
    this.hasFocusClass = hasFocusClass;
  }

  init() {
    if (this.form !== null && this.button !== null) {
      this.button.setAttribute(`tabindex`, `-1`);

      this.field.addEventListener(`focus`, this.onSearchFieldEvent.bind(this));
      this.field.addEventListener(`blur`, this.onSearchFieldEvent.bind(this));
      this.field.addEventListener(`keydown`, this.onSearchFieldEvent.bind(this));
      this.form.addEventListener(`focusin`, this.onSearchFormFocus.bind(this));
      this.form.addEventListener(`focusout`, this.onSearchFormBlur.bind(this));
    }
  }

  onSearchFieldEvent(evt) {
    const eventType = evt.type;
    const value = evt.target.value.trim();

    this.form.classList.add(this.notEmptyClass);
    this.button.setAttribute(`tabindex`, `0`);

    if (value === ``) {
      switch (eventType) {
        case `blur`:
          this.button.setAttribute(`tabindex`, `-1`);
          this.form.classList.remove(this.notEmptyClass);
          break;

        case `keydown`:
          if (checkTab(evt)) {
            this.button.setAttribute(`tabindex`, `-1`);
          }
          break;
      }
    }
  }

  onSearchFormFocus() {
    this.form.classList.add(this.hasFocusClass);
  }

  onSearchFormBlur(evt) {
    const formContainsFocus = this.form.contains(evt.relatedTarget);

    if (!formContainsFocus) {
      this.form.classList.remove(this.hasFocusClass);
    }
  }
}

export default Search;
