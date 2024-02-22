import AddProductBtn from "./AddProductBtn";

export default class Carousel {
  constructor(slides, leftBtnImg, rightBtnImg) {
    this.slides = slides;
    this.lastPosition = this.slides.length;
    this.currentPosition = 1;

    this.leftBtn = this.createBtnElement('left', leftBtnImg);
    this.leftBtn.style.display = 'none';
    this.rightBtn = this.createBtnElement('right', rightBtnImg);
    this.inner = this.createInnerElement(this.slides);
    this.element = this.createCarouselElement(this.leftBtn, this.rightBtn, this.inner);
    this.addListeners();
  }

  createCarouselElement = (leftBtn, rightBtn, inner) => {
    const carouselContainer = document.createElement('section');
    carouselContainer.classList.add('carousel');
    carouselContainer.append(leftBtn, rightBtn, inner);
    return carouselContainer;
  }

  createBtnElement = (direction, imgSrc) => {
    const btn = document.createElement('div');
    btn.classList.add('carousel__arrow');
    btn.classList.add(`carousel__arrow--${direction}`);

    const img = document.createElement('img');
    img.alt = 'arrow icon';
    img.src = imgSrc;

    btn.append(img);
    return btn;
  }

  createInnerElement = (slides) => {
    const inner = document.createElement('div');
    inner.classList.add('carousel__inner');

    const innerSlides = slides.map(e => {
      const slide = document.createElement('div');
      slide.classList.add('carousel__slide');

      const img = document.createElement('img');
      img.classList.add('carousel__img');
      img.alt = e.name;
      img.src = `assets/images/carousel/${e.image}`;
      img.dataset.id = e.id;

      const addBtn = new AddProductBtn('carousel', e.price, e.name, e.id).element;

      slide.append(img, addBtn);
      return slide;
    });

    inner.append(...innerSlides);
    return inner;
  }

  addListeners = () => {
    this.element.addEventListener('click', this.carouselBtnsHandler);
  }

  changeInnerPosition = (slide) => {
    this.inner.style.transform = `translateX(calc(-100% * ${slide - 1}))`;
  }

  carouselBtnsHandler = (e) => {
    if (e.target.closest('.carousel__arrow')) {
      const target = e.target.closest('.carousel__arrow');
      if (target.classList.contains('carousel__arrow--left')) {
        this.currentPosition--;
        this.changeInnerPosition(this.currentPosition);
      } else if (target.classList.contains('carousel__arrow--right')) {
        this.currentPosition++;
        this.changeInnerPosition(this.currentPosition);
      }

      this.currentPosition == 1 ? this.leftBtn.style.display = 'none' : this.leftBtn.style.display = '';
      this.currentPosition == this.lastPosition ? this.rightBtn.style.display = 'none' : this.rightBtn.style.display = '';
    }

    if (e.target.closest('.add-btn__element')) {
      const target = e.target.closest('.add-btn__element')
      console.log('1');
      this.dispatchProductAddEvent(target);
    }
  }

  dispatchProductAddEvent = (target) => {
    this.element.dispatchEvent(new CustomEvent('product-add', {
      detail: target.dataset.id,
      bubbles: true
    }));
  }
}