import * as key from '../util/checkKey.js';

class Accordion {
  constructor(accordionElem) {
    this.accordion = accordionElem;
    // Allow for multiple accordion sections to be expanded at the same time
    this.allowMultiple = this.accordion.hasAttribute(`data-allow-multiple`);
    // Allow for each toggle to both open and close individually
    this.allowToggle = (this.allowMultiple) ? this.allowMultiple : this.accordion.hasAttribute(`data-allow-toggle`);
    this.headingSelector = `.accordion__title`;
    this.triggers = [];
  }

  init() {
    const id = this.accordion.id;
    const headings = this.accordion.querySelectorAll(this.headingSelector);

    headings.forEach((h, i) => {
      const panel = h.nextElementSibling;
      const panelId = `${id}-pane${i + 1}`;
      const buttonId = `${id}-btn${i + 1}`;
      const title = h.innerHTML;
      const buttonHTML = `<button class="accordion__trigger"
        type="button"
        aria-expanded="false"
        aria-controls="${panelId}"
        id="${buttonId}">
          ${title}
        </button>`;

      h.innerHTML = buttonHTML;
      const button = h.firstElementChild;
      button.panel = panel;
      this.triggers.push(button);

      panel.id = panelId;
      panel.hidden = true;
      panel.setAttribute(`role`, `region`);
      panel.setAttribute(`aria-labelledby`, buttonId);
    });

    this.accordion.classList.remove(`accordion--nojs`);

    if (!this.allowToggle) {
      const expanded = this.accordion.querySelector(`[aria-expanded="true"]`);
      if (expanded !== null) {
        expanded.setAttribute(`aria-disabled`, `true`);
      }
    }

    this.triggers.forEach((t) => {
      t.addEventListener(`click`, this.onTriggerButtonClick.bind(this));
      t.addEventListener(`keydown`, this.onTriggerButtonKeydown.bind(this));
    });
  }

  close(trigger) {
    trigger.setAttribute(`aria-expanded`, `false`);
    trigger.panel.hidden = true;

    if (!this.allowToggle) {
      trigger.removeAttribute(`aria-disabled`);
    }
  }

  open(trigger) {
    trigger.setAttribute(`aria-expanded`, `true`);
    trigger.panel.hidden = false;

    if (!this.allowToggle) {
      trigger.setAttribute(`aria-disabled`, `true`);
    }
  }

  onTriggerButtonClick(evt) {
    evt.preventDefault();

    const target = evt.currentTarget;
    const isExpanded = target.getAttribute(`aria-expanded`) === `true`;
    const active = this.triggers.find((t) => t.getAttribute(`aria-expanded`) === `true`);

    if (!this.allowMultiple && active && active !== target) {
      this.close(active);
    }

    if (!isExpanded) {
      this.open(target);
    } else if (isExpanded && this.allowToggle) {
      this.close(target);
    }
  }

  onTriggerButtonKeydown(evt) {
    const target = evt.currentTarget;

    if (key.isArrowUp(evt) || key.isArrowDown(evt)) {
      evt.preventDefault();
      const index = this.triggers.indexOf(target);
      const direction = key.isArrowDown(evt) ? 1 : -1;
      const length = this.triggers.length;
      const newIndex = (index + length + direction) % length;

      this.triggers[newIndex].focus();
    } else if (key.isEnd(evt) || key.isHome(evt)) {
      evt.preventDefault();
      const newIndex = key.isEnd(evt) ? this.triggers.length - 1 : 0;

      this.triggers[newIndex].focus();
    }
  }
}

export default Accordion;
