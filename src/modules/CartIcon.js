export default class CartIcon {
  constructor() {
    this.render();
    this.topCoord = null;
    this.addEventListeners();
  }

  render() {
    this.element = this.createElement();
  }

  createElement = () => {
    const cart = document.createElement('div');
    cart.classList.add('cart-icon');

    const inner = document.createElement('div');
    inner.classList.add('cart-icon__inner');

    this.count = document.createElement('span');
    this.count.classList.add('cart-icon__count');

    this.price = document.createElement('span');
    this.price.classList.add('cart-icon__price');

    inner.append(this.count, this.price);
    cart.append(inner);
    return cart;
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.element.classList.add('visible');

      this.count.textContent = `${cart.getTotalCount()}`;
      this.price.textContent = `€${cart.getTotalPrice().toFixed(2)}`;

      this.updatePosition();

      this.element.classList.add('shake');
      this.element.addEventListener('transitionend', () => {
        this.element.classList.remove('shake');
      }, { once: true });

    } else {
      this.element.classList.remove('visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    if (!this.element.offsetWidth && !this.element.offsetHeight) return;

    if (document.clientWidth <= 767) {
      Object.assign(this.element.style, {
        position: '',
        top: '',
        left: '',
        zIndex: ''
      });
      return;
    }

    if (!this.topCoord) {
      this.topCoord = this.calculateTopCoord();
    }

    if (window.pageYOffset > this.topCoord) {
      let leftIndent = Math.min(document.querySelector('.header').getBoundingClientRect().right + 20, document.clientWidth - this.element.offsetWidth - 10) + 'px';

      Object.assign(this.element.style, {
        position: 'fixed',
        top: '50px',
        zIndex: 1e3,
        left: leftIndent
      });
    } else {
      Object.assign(this.element.style, {
        position: '',
        top: '',
        left: '',
        zIndex: ''
      });
    }
  }

  calculateTopCoord = () => {
    return this.element.getBoundingClientRect().top + window.pageYOffset;
  }
}