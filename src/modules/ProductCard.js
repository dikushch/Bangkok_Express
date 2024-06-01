import AddProductBtn from "./AddProductBtn";

export default class ProductCard {
  constructor(product) {
    this.name = product.name;
    this.price = product.price;
    this.category = product.category;
    this.image = product.image;
    this.id = product.id;

    this.element = this.createElement(this.image, this.price, this.name, this.id);

    this.element.addEventListener('click', this.onClick);
  }

  createElement = (img, price, name, id) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const image = document.createElement('img');
    image.classList.add('card__img');
    image.src = `assets/images/products/${img}`

    const addBtn = new AddProductBtn('card', price, name, id).element;

    card.append(image, addBtn);

    return card;
  }

  onClick = (event) => {
    let btn = event.target.closest('.add-btn__element');

    if (btn) {
      let addEvent = new CustomEvent('product-add', {
        detail: this.id,
        bubbles: true
      });

      this.element.dispatchEvent(addEvent);
    }
  }
}