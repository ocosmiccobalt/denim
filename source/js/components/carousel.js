class Carousel {
  constructor(carouselElem) {
    this.CAROUSEL_NOJS_CLASS = `carousel--nojs`;
    this.carousel = carouselElem;
    this.buttonPrev = this.carousel.querySelector(`.carousel__button--prev`);
    this.buttonNext = this.carousel.querySelector(`.carousel__button--next`);
    this.thumbnails = [
      ...this.carousel.querySelectorAll(`.carousel__thumbnail`)
    ];
    this.list = this.carousel.querySelector(`.carousel__list`);
    this.items = [
      ...this.carousel.querySelectorAll(`.carousel__item`)
    ];
    this.index = 0;
  }

  init() {
    this.carousel.classList.remove(this.CAROUSEL_NOJS_CLASS);
    this.carousel.setAttribute(`aria-roledescription`, `carousel`);

    this.items.forEach((item, i) => {
      const slide = item.firstElementChild;
      slide.setAttribute(`aria-roledescription`, `slide`);
      this.thumbnails[i].setAttribute(`aria-label`, slide.getAttribute(`aria-label`));
    });

    this.setSlidesState(this.index);
    this.setThumbnailsState(this.index);
    this.setButtonsState(this.index);

    this.buttonPrev.addEventListener(`click`, this.onButtonPrevClick.bind(this));
    this.buttonNext.addEventListener(`click`, this.onButtonNextClick.bind(this));
    this.thumbnails.forEach((thumb) => {
      thumb.addEventListener(`click`, this.onThumbnailClick.bind(this));
    });
  }

  setSlidesState(index) {
    const x = `${-100 * index}%`;
    this.list.style.transform = `translateX(${x})`;

    this.items.forEach((item, i) => {
      const isCurrent = i === index;
      const slide = item.firstElementChild;
      slide.hidden = !isCurrent;
    });
  }

  setThumbnailsState(index) {
    this.thumbnails.forEach((thumb, i) => {
      const isCurrent = i === index;
      thumb.setAttribute(`aria-disabled`, isCurrent);
      thumb.setAttribute(`aria-current`, isCurrent);
    });
  }

  setButtonsState(index) {
    const atFirstSlide = index < 1;
    const atLastSlide = index >= this.items.length - 1;
    this.buttonPrev.setAttribute(`aria-disabled`, atFirstSlide);
    this.buttonNext.setAttribute(`aria-disabled`, atLastSlide);
  }

  onSlideChoice(index) {
    this.setSlidesState(index);
    this.setThumbnailsState(index);
    this.setButtonsState(index);
    this.index = index;
  }

  onButtonPrevClick(evt) {
    if (this.index === 0) {
      evt.preventDefault();
    } else {
      this.onSlideChoice(this.index - 1);
    }
  }

  onButtonNextClick(evt) {
    if (this.index === this.items.length - 1) {
      evt.preventDefault();
    } else {
      this.onSlideChoice(this.index + 1);
    }
  }

  onThumbnailClick(evt) {
    const target = evt.currentTarget;
    const thumbIndex = this.thumbnails.indexOf(target);

    if (thumbIndex === this.index) {
      evt.preventDefault();
    } else {
      this.onSlideChoice(thumbIndex);
    }
  }
}

export default Carousel;
