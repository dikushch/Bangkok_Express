import './style.scss';
import Header from './modules/Header';
import slides from './assets/slides';
import Carousel from './modules/Carousel';
import RibbonMenu from './modules/RibbonMenu';
import categories from './assets/categories';
import StepSlider from './modules/StepSlider';
import Filters from './modules/Filters';
import ProductGrid from './modules/ProductGrid';
import CartIcon from './modules/CartIcon';
import Cart from './modules/Cart';

class Page {
  constructor(slides, categories) {
    this.slides = slides;
    this.categories = categories;
    this.filters = new Filters();
    this.cartIcon = new CartIcon();
    this.cart = new Cart(this.cartIcon);
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
      filters: this.filters.element,
      cartIcon: this.cartIcon.element,
    };
    this.element = this.createPageElement(Object.values(this.pageElements));
    this.render(this.element);
  }

  createPageElement = (pageNodes) => {
    const page = document.createElement('div');
    page.append(...pageNodes);
    return page;
  }

  addListeners = () => {
    document.body.addEventListener('product-add', event => {
      this.cart.addProduct(this.products.find(item => item.id == event.detail));
    });

    this.pageElements.filters.addEventListener('slider-change', event => {
      this.grid.updateFilter({ maxSpiciness: event.detail });
    });

    this.pageElements.ribbon.addEventListener('ribbon-select', event => {
      this.grid.updateFilter({ category: event.detail });
    });

    this.filters.filterNuts.onchange = () => { 
      this.grid.updateFilter({ noNuts: this.filters.filterNuts.checked }); 
    };

    this.filters.filterVegeterian.onchange = () => { 
      this.grid.updateFilter({ vegeterianOnly: this.filters.filterVegeterian.checked }); 
    };
  }

  render = async (page) => {
    let response = await fetch('assets/products.json');
    this.products = await response.json();
    this.grid = new ProductGrid(this.products);
    page.append(this.grid.element);

    document.body.append(...page.childNodes);
    this.addListeners();
  }
}

const page = new Page(slides, categories);