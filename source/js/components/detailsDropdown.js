import { isEsc } from '../util/checkKey.js';

class DetailsDropdown {
  constructor(detailsElem) {
    this.DETAILS_NOJS_CLASS = `details-dropdown--nojs`;
    this.FOCUSABLE_ELEMS_SELECTOR = `a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]`;
    this.details = detailsElem;
    this.summary = this.details.querySelector(`summary`);
    this.content = this.summary.nextElementSibling;
    this.closeButton = this.details.querySelector(`.details-dropdown__close`);
    // Not ideal because children can be added to the DOM after instantiation:
    this.firstTabStop = this.content.querySelectorAll(this.FOCUSABLE_ELEMS_SELECTOR)[0];
  }

  init() {
    this.details.classList.remove(this.DETAILS_NOJS_CLASS);
    this.details.addEventListener(`toggle`, this.onDetailsToggle.bind(this));
    if (this.closeButton !== null) {
      this.closeButton.addEventListener(`click`, this.onCloseButtonClick.bind(this));
    }
    this.details.addEventListener(`focusout`, this.onDetailsFocusout.bind(this));
    this.details.addEventListener(`keydown`, this.onDetailsKeydown.bind(this));
  }

  onDetailsToggle() {
    const onDetailsOpen = () => {
      /*
        Might be:
        const summaryIsCoveredByContent = this.closeButton?.offsetWidth;
      */
      const summaryIsCoveredByContent = this.closeButton !== null && this.closeButton.offsetWidth !== 0;

      if (summaryIsCoveredByContent) {
        this.firstTabStop.focus();
      }
    };

    if (this.details.open) {
      onDetailsOpen();
    }
  }

  onCloseButtonClick(evt) {
    evt.preventDefault();
    this.details.open = false;
    this.summary.focus();
  }

  onDetailsFocusout(evt) {
    const focus = evt.relatedTarget !== null;
    const containsFocus = this.content.contains(evt.relatedTarget);

    if (focus && !containsFocus) {
      this.details.open = false;
    }
  }

  onDetailsKeydown(evt) {
    if (isEsc(evt)) {
      this.details.open = false;
      this.summary.focus();
    }
  }
}

export default DetailsDropdown;
