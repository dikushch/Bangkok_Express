import Modal from "./Modal";

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product || product === null) return;

    for (let item of this.cartItems) {
      if (item.product == product) {
        item.count++;
        this.onProductUpdate(item);
        return;
      }
    }

    this.cartItems.push({ product, count: 1 });
    this.onProductUpdate(this.cartItems.at(-1));
  }

  updateProductCount(productId, amount) {
    this.cartItems.forEach((item, index) => {
      if (item.product.id == productId) {
        item.count += amount;
        if (item.count == 0) {
          this.cartItems.splice(index, 1);
        }
        this.onProductUpdate(item);
      }
    });
  }

  isEmpty() {
    return this.cartItems.length == 0;
  }

  getTotalCount() {
    let totalCount = 0;

    for (let item of this.cartItems) {
      totalCount += item.count
    }

    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = 0;

    for (let item of this.cartItems) {
      totalPrice += (item.product.price * item.count)
    }

    return totalPrice;
  }

  renderProduct = (product, count) => {
    const cartProduct = document.createElement('div');
    cartProduct.classList.add('cart-product');
    cartProduct.dataset.productId = product.id;

    const productImgBox = document.createElement('div');
    productImgBox.classList.add('cart-product__img');
    const productImg = document.createElement('img');
    productImg.setAttribute('src', `assets/images/products/${product.image}`)
    productImgBox.append(productImg);
    cartProduct.append(productImgBox);

    const productInfo = document.createElement('div');
    productInfo.classList.add('cart-product__info');

    const productTitle = document.createElement('div');
    productTitle.classList.add('cart-product__title');
    productTitle.textContent = product.name;

    const productWrap = document.createElement('div');
    productWrap.classList.add('cart-product__price-wrap');

    const counter = document.createElement('div');
    counter.classList.add('cart-counter');

    const btnMinus = document.createElement('button');
    btnMinus.type = 'button';
    btnMinus.classList.add('cart-counter__button', 'cart-counter__button_minus');
    const btnMinusImg = document.createElement('img');
    btnMinusImg.setAttribute('src', 'assets/images/icons/square-minus-icon.svg');
    btnMinus.append(btnMinusImg);

    const btnPlus = document.createElement('button');
    btnPlus.type = 'button';
    btnPlus.classList.add('cart-counter__button', 'cart-counter__button_plus');
    const btnPlusImg = document.createElement('img');
    btnPlusImg.setAttribute('src', 'assets/images/icons//square-plus-icon.svg');
    btnPlus.append(btnPlusImg);

    const productCount = document.createElement('span');
    productCount.classList.add('cart-counter__count');
    productCount.textContent = count;

    counter.append(btnMinus, productCount, btnPlus);

    const price = document.createElement('div');
    price.classList.add('cart-product__price');
    price.textContent = `${product.price.toFixed(2)}`;

    productWrap.append(counter, price);
    productInfo.append(productTitle, productWrap);
    cartProduct.append(productInfo);
    return cartProduct;
  }

  renderOrderForm() {
    const form = document.createElement('form');
    form.classList.add('cart-form');

    const formTitle = document.createElement('h5');
    formTitle.classList.add('cart-form__title');
    formTitle.textContent = 'Delivery';
    form.append(formTitle);

    const formGroupTop = document.createElement('div');
    formGroupTop.classList.add('cart-form__group', 'cart-form__group_row');
    const inputName = document.createElement('input');
    inputName.type = 'text';
    inputName.setAttribute('placeholder', 'Name');
    inputName.setAttribute('value', 'Santa Claus');
    inputName.classList.add('cart-form__input');
    const inputEmail = document.createElement('input');
    inputEmail.type = 'email';
    inputEmail.setAttribute('placeholder', 'Email');
    inputEmail.setAttribute('value', 'john@gmail.com');
    inputEmail.classList.add('cart-form__input');
    const inputTel = document.createElement('input');
    inputTel.type = 'tel';
    inputTel.setAttribute('placeholder', 'Phone');
    inputTel.setAttribute('value', '+1234567');
    inputTel.classList.add('cart-form__input');
    formGroupTop.append(inputName, inputEmail, inputTel);
    form.append(formGroupTop);

    const formGroupBot = document.createElement('div');
    formGroupBot.classList.add('cart-form__group');
    const inputAddress = document.createElement('input');
    inputAddress.type = 'text';
    inputAddress.setAttribute('placeholder', 'Address');
    inputAddress.setAttribute('value', 'North, Lapland, Snow Home');
    inputAddress.classList.add('cart-form__input');
    formGroupBot.append(inputAddress);
    form.append(formGroupBot);

    const cartBtns = document.createElement('div');
    cartBtns.classList.add('cart-buttons');
    const cartBtnsGroup = document.createElement('div');
    cartBtnsGroup.classList.add('cart-buttons__buttons', 'btn-group');
    cartBtns.append(cartBtnsGroup);
    form.append(cartBtns);

    const cartBtnsInfo = document.createElement('div');
    cartBtnsInfo.classList.add('cart-buttons__info');
    cartBtnsGroup.append(cartBtnsInfo);
    const cartBtnsText = document.createElement('span');
    cartBtnsText.classList.add('cart-buttons__info-text');
    cartBtnsText.textContent = 'total';
    const cartBtnsPrice = document.createElement('span');
    cartBtnsPrice.classList.add('cart-buttons__info-price');
    cartBtnsPrice.textContent = `€${this.getTotalPrice().toFixed(2)}`;
    cartBtnsInfo.append(cartBtnsText, cartBtnsPrice);

    const cartOrderBtn = document.createElement('button');
    cartOrderBtn.type = 'submit';
    cartOrderBtn.textContent = 'order';
    cartOrderBtn.classList.add('cart-buttons__button', 'btn-group__button', 'button');
    cartBtnsGroup.append(cartOrderBtn);

    return form;
  }

  addModalBodyListener = (modalBody) => {
    modalBody.addEventListener('click', (event) => {
      if (event.target.closest('.cart-counter__button')) {
        let productId = event.target.closest('.cart-product').dataset.productId;

        if (event.target.closest('.cart-counter__button_minus')) {
          this.updateProductCount(productId, -1);
        } else if (event.target.closest('.cart-counter__button_plus')) {
          this.updateProductCount(productId, 1);
        }
      }
    });

    modalBody.querySelector('.cart-form').addEventListener('submit', e => {
      this.onSubmit(e);
    });
  }

  createModalBody = () => {
    let modalBody = document.createElement('div');

    for (let p of this.cartItems) {
      modalBody.append(this.renderProduct(p.product, p.count));
    }

    modalBody.append(this.renderOrderForm());

    this.addModalBodyListener(modalBody);

    return modalBody;
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle('Your order');
    this.modal.setBody(this.createModalBody());
    this.modal.open();
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    if (document.querySelector('body').classList.contains('is-modal-open')) {
      if (this.isEmpty()) {
        this.modal.close();
        return;
      }

      let infoPrice = this.modal.element.querySelector(`.cart-buttons__info-price`);
      infoPrice.textContent = `€${this.getTotalPrice().toFixed(2)}`;

      if (cartItem.count == 0) {
        this.modal.element.querySelector(`[data-product-id="${cartItem.product.id}"]`).remove();
        return;
      }

      let productCount = this.modal.element.querySelector(`[data-product-id="${cartItem.product.id}"] .cart-counter__count`);
      let productPrice = this.modal.element.querySelector(`[data-product-id="${cartItem.product.id}"] .cart-product__price`);

      productCount.textContent = cartItem.count;
      productPrice.textContent = `€${(cartItem.count * cartItem.product.price).toFixed(2)}`;
    }
  }

  async onSubmit(event) {
    event.preventDefault();
    this.modal.element.querySelector('button').classList.add('is-loading');
    let form = this.modal.element.querySelector('.cart-form');

    let response = await fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(form)
    });

    if (response.ok) {
      this.modal.setTitle('Success!');
      this.cartItems.length = 0;
      this.cartIcon.update(this);
      this.modal.setBody(this.createModalBodyOnSubmit());
    }
  };

  createModalBodyOnSubmit = () => {
    const modal = document.createElement('div');
    modal.classList.add('modal__body-inner');

    const text = document.createElement('p');
    text.textContent = `Order successful! Your order is being cooked :)\nWe’ll notify you about delivery time shortly.\n`;
    const img = document.createElement('img');
    img.setAttribute('src', 'assets/images/delivery.gif');
    text.append(img);
    modal.append(text);

    return modal;
  }

  addEventListeners() {
    this.cartIcon.element.onclick = () => this.renderModal();
  }
}