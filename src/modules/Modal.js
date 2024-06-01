export default class Modal {
  constructor() {
    this.element = this.createElement()
    // this.titleNode = this.element.querySelector('.modal__title');
    // this.bodyNode = this.element.querySelector('.modal__body');
    // this.closeBtn = this.element.querySelector('.modal__close');

    this.closeBtn.addEventListener('click', (event) => {
      if (event.target.closest('.modal__close')) {
        this.close();
      }
    });

    document.addEventListener('keydown', this.closeWithKey);
  }

  createElement = () => {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const modalOverlay = document.createElement('div');
    modalOverlay.classList.add('modal__overlay');
    modal.append(modalOverlay);

    const modalInner = document.createElement('div');
    modalInner.classList.add('modal__inner');
    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal__header');
    this.bodyNode = document.createElement('div');
    this.bodyNode.classList.add('modal__body');
    modalInner.append(modalHeader, this.bodyNode);
    modal.append(modalInner);

    this.closeBtn = document.createElement('button');
    this.closeBtn.classList.add('modal__close');
    this.closeBtn.type = 'button';
    const btnImg = document.createElement('img');
    btnImg.setAttribute('src', 'assets/images/icons/cross-icon.svg');
    this.closeBtn.append(btnImg);
    modalHeader.append(this.closeBtn);

    this.titleNode = document.createElement('h3');
    this.titleNode.classList.add('modal__title');
    modalHeader.append(this.titleNode);

    return modal;
  }

  open = () => {
    let body = document.querySelector('body');
    body.append(this.element);
    body.classList.add('is-modal-open');
  }

  setTitle = (title) => {
    this.titleNode.textContent = title;
  }

  setBody = (node) => {
    this.bodyNode.innerHTML = '';
    this.bodyNode.append(node);
  }

  close = () => {
    document.querySelector('body').classList.remove('is-modal-open');
    this.element.remove();
    document.removeEventListener('keydown', this.closeWithKey);
  }

  closeWithKey = (event) => {
    if (event.code === 'Escape') {
      this.close();
    }
  }
}