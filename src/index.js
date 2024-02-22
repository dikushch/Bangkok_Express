import './style.scss';
import Header from './modules/Header';

class Page {
  constructor() {
    this.pageElements = {
      header: new Header().element,
    };
    this.element = this.createPageElement(Object.values(this.pageElements));
    this.render(this.element);
  }

  createPageElement = (pageNodes) => {
    const page = document.createElement('div');
    page.append(...pageNodes);
    return page;
  }

  render = (page) => {
    document.body.append(...page.childNodes);
  }
}

const page = new Page();