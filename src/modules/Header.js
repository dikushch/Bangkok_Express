export default class Header {
  constructor() {
    this.element = this.createHeaderElement();
  }

  createHeaderElement = () => {
    const header = document.createElement('header');
    header.classList.add('header');

    const title = document.createElement('h2');
    title.classList.add('header__title');
    title.textContent = 'Bangkok Express';

    const subtitle = document.createElement('p');
    subtitle.classList.add('header__subtitle');
    subtitle.textContent = 'Great food・Free delivery・Fair price';

    const cartContainer = document.createElement('div');
    cartContainer.classList.add('cart');

    header.append(title, subtitle, cartContainer);
    return header;
  }
}