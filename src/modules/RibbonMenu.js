export default class RibbonMenu {
  constructor(categories, leftBtnImg, rightBtnImg) {
    this.categories = categories;

    this.btnLeft = this.createBtnElement('left', leftBtnImg);
    this.btnRight = this.createBtnElement('right', rightBtnImg);
    this.inner = this.createInnerElement(this.categories);
    this.element = this.createMenuElement(this.btnLeft, this.inner, this.btnRight);
  }

  createMenuElement = (btnLeft, inner, btnRight) => {
    const container = document.createElement('section');
    container.classList.add('ribbon');

    const title = document.createElement('h2');
    title.classList.add('ribbon__title');
    title.textContent = 'our menu';

    container.append(title, btnLeft, inner, btnRight);
    return container;
  }

  createBtnElement = (direction, imgSrc) => {
    const btn = document.createElement('div');
    btn.classList.add('ribbon__arrow');
    btn.classList.add(`ribbon__arrow--${direction}`);

    const img = document.createElement('img');
    img.alt = 'arrow icon';
    img.src = imgSrc;

    btn.append(img);
    return btn;
  }

  createInnerElement = (categories) => {
    const inner = document.createElement('nav');
    inner.classList.add('ribbon__inner');

    const innerItems = categories.map(e => {
      const link = document.createElement('a');
      link.classList.add('ribbon__item');
      link.dataset.id = e.id;
      link.textContent = e.name;
      return link;
    });

    inner.append(...innerItems);
    return inner;
  }
}