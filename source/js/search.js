import { checkTab } from './util/checkKey.js';

class Search {
  constructor(searchInputElem, notEmptyClass) {
    this.field = searchInputElem;
    this.form = this.field.form;
    this.button = this.form.querySelector(`button[type=submit]`);
    this.notEmptyClass = notEmptyClass;
  }

  init() {
    if (this.form !== null && this.button !== null) {
      this.field.addEventListener(`focus`, this.onSearchFieldEvent.bind(this));
      this.field.addEventListener(`blur`, this.onSearchFieldEvent.bind(this));
      this.field.addEventListener(`keydown`, this.onSearchFieldEvent.bind(this));
    }
  }

  onSearchFieldEvent(evt) {
    const eventType = evt.type;
    const value = evt.target.value.trim();

    this.form.classList.add(this.notEmptyClass);
    this.button.setAttribute(`tabindex`, `0`);

    if (value !== ``) {
      this.form.classList.add(this.notEmptyClass);
    } else {
      if (eventType === `blur`) {
        this.button.setAttribute(`tabindex`, `-1`);
        this.form.classList.remove(this.notEmptyClass);
      }

      if (eventType === `keydown`) {
        if (checkTab(evt)) {
          this.button.setAttribute(`tabindex`, `-1`);
        }
      }
    }
  }
}

export default Search;
