import './style.scss';
import Header from './modules/Header';
import slides from './assets/slides';
import Carousel from './modules/Carousel';

class Page {
  constructor(slides) {
    this.slides = slides
    this.pageElements = {
      header: new Header().element,
      carousel: new Carousel(this.slides).element,
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

const page = new Page(slides);