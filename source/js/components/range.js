class Range {
  constructor(rangeElem) {
    this.RANGE_NOJS_CLASS = `range--nojs`;
    this.range = rangeElem;
    this.inputs = this.range.querySelectorAll(`input[type="range"]`);
    this.form = this.inputs[0].form;
  }

  init() {
    this.range.classList.remove(this.RANGE_NOJS_CLASS);

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

  setRangeValue(input) {
    this.range.style.setProperty(`--${input.id}`, input.value);
    this.setOutputValue(input);
  }

  onRangeFormReset() {
    const timer = setTimeout(() => {
      this.inputs.forEach((input) => {
        this.setRangeValue(input);
      });
      clearTimeout(timer);
    }, 0);
  }

  onRangeInput(evt) {
    const target = evt.target;

    if (target.type === `range`) {
      this.setRangeValue(target);
    }
  }
}

export default Range;
