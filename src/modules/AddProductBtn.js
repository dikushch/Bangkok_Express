export default class AddProductBtn {
  constructor(parrentClass, price, name, id) {
    this.element = this.createBtnElement(parrentClass, price, name, id);
  }

  createBtnElement = (parrentClass, prodPrice, prodName, prodId) => {
    const btnContainer = document.createElement('div');
    btnContainer.classList.add(`${parrentClass}__add-btn`);
    btnContainer.classList.add('add-btn');

    const price = document.createElement('p');
    price.classList.add('add-btn__price');
    price.textContent = `$${prodPrice.toFixed(2)}`;

    const name = document.createElement('p');
    name.classList.add('add-btn__name');
    name.textContent = prodName;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.classList.add('add-btn__element');
    btn.dataset.id = prodId;

    const btnImg = document.createElement('img');
    btnImg.alt = 'add product icon';
    btnImg.src = 'assets/images/icons/plus-icon.svg';
    btn.append(btnImg);

    btnContainer.append(price, name, btn);
    return btnContainer;
  }
}