import AddProductBtn from "./AddProductBtn";

export default class Carousel {
  constructor(slides, leftBtnImg, rightBtnImg) {
    this.slides = slides;

    this.leftBtn = this.createBtnElement('left', leftBtnImg);
    this.rightBtn = this.createBtnElement('right', rightBtnImg);
    this.inner = this.createInnerElement(this.slides);
    this.element = this.createCarouselElement(this.leftBtn, this.rightBtn, this.inner);
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
    btn.classList.add(`carousel__arrow-${direction}`);

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
}