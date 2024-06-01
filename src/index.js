import './style.scss';
import Header from './modules/Header';
import slides from './assets/slides';
import Carousel from './modules/Carousel';
import RibbonMenu from './modules/RibbonMenu';
import categories from './assets/categories';
import StepSlider from './modules/StepSlider';
import Filters from './modules/Filters';
import ProductGrid from './modules/ProductGrid';

class Page {
  constructor(slides, categories) {
    this.slides = slides;
    this.categories = categories;
    this.pageElements = {
      header: new Header().element,
      carousel: new Carousel(
        this.slides,
        'assets/images/icons/angle-left-icon.svg',
        'assets/images/icons/angle-icon.svg'
      ).element,
      ribbon: new RibbonMenu(
        this.categories,
        'assets/images/icons/angle-left-icon.svg',
        'assets/images/icons/angle-icon.svg'
      ).element,
      filters: new Filters().element,
    };
    this.element = this.createPageElement(Object.values(this.pageElements));
    this.render(this.element);
  }

  createPageElement = (pageNodes) => {
    const page = document.createElement('div');
    page.append(...pageNodes);
    return page;
  }

  render = async (page) => {
    let response = await fetch('assets/products.json');
    this.products = await response.json();
    this.pageElements.grid = new ProductGrid(this.products).element;
    page.append(this.pageElements.grid);

    document.body.append(...page.childNodes);
  }
}

const page = new Page(slides, categories);