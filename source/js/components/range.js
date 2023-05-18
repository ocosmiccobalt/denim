class Range {
  constructor(rangeElem) {
    this.range = rangeElem;
    this.inputs = this.range.querySelectorAll(`input[type="range"]`);
    this.form = this.inputs[0].form;
  }

  init() {
    this.range.classList.remove(`range--nojs`);

    this.inputs.forEach((input) => {
      input.output = this.range.querySelector(`output[for="${input.id}"]`);
      input.output.hidden = false;
      this.setOutputValue(input);
    });

    this.range.addEventListener(`input`, this.onRangeInput.bind(this));
    if (this.form !== undefined) {
      this.form.addEventListener(`reset`, this.onRangeFormReset.bind(this));
    }
  }

  setOutputValue(input) {
    input.output.value = `$ ${input.value}`;
  }

  setCssPropertyValue(input) {
    this.range.style.setProperty(`--${input.id}`, input.value);
  }

  onRangeFormReset() {
    const timer = setTimeout(() => {
      this.inputs.forEach((input) => {
        this.setCssPropertyValue(input);
        this.setOutputValue(input);
      });
      clearTimeout(timer);
    }, 0);
  }

  onRangeInput(evt) {
    const target = evt.target;

    if (target.tagName === `INPUT` && target.type === `range`) {
      this.setCssPropertyValue(target);
      this.setOutputValue(target);
    }
  }
}

export default Range;
