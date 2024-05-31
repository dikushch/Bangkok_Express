export default class RibbonMenu {
  constructor(categories, leftBtnImg, rightBtnImg) {
    this.categories = categories;

    this.btnLeft = this.createBtnElement('left', leftBtnImg);
    this.btnRight = this.createBtnElement('right', rightBtnImg);
    this.btnRight.classList.add('visible');
    this.inner = this.createInnerElement(this.categories);
    this.element = this.createMenuElement(this.btnLeft, this.inner, this.btnRight);

    this.element.addEventListener('click', (event) => {
      this.initCarousel(event);
      this.selectCategory(event);
    });
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

  initCarousel = (event) => {
    if (event.target.closest('.ribbon__arrow--right')) {
      this.inner.scrollBy(350, 0);
    } else if (event.target.closest('.ribbon__arrow--left')) {
      this.inner.scrollBy(-350, 0);
    }

    this.hideButton();
  }

  hideButton = () => {
    this.inner.scrollLeft == 0 ? this.btnLeft.classList.remove('visible') : this.btnLeft.classList.add('visible');

    let scrollRight = this.inner.scrollWidth - this.inner.scrollLeft - this.inner.clientWidth;

    scrollRight < 1 ? this.btnRight.classList.remove('visible') : this.btnRight.classList.add('visible');
  }

  selectCategory = (event) => {
    let link = event.target.closest('.ribbon__item');

    if (link) {
      event.preventDefault();
      if (link != this.activeItem && this.activeItem) {
        this.activeItem.classList.remove('active');
        this.activeItem = link;
        link.classList.add('active');
      } else {
        this.activeItem = link;
        link.classList.add('active');
      }

      let addEvent = new CustomEvent('ribbon-select', {
        detail: link.dataset.id,
        bubbles: true
      });
      this.element.dispatchEvent(addEvent);
    }
  }
}