import ProductCard from "./ProductCard";

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.element = this.createElement();

    this.productsCards = this.products.map(product => Object.assign((new ProductCard(product)), { spiciness: product.spiciness, nuts: product.nuts, vegeterian: product.vegeterian }));

    this.addCards(this.productsCards);
  }

  createElement = () => {
    const grid = document.createElement('div');
    grid.classList.add('products-grid')

    this.productsInner = document.createElement('div');
    this.productsInner.classList.add('products-grid__inner');

    grid.append(this.productsInner);
    return grid;
  }

  addCards = (cards) => {
    for (let card of cards) {
      this.productsInner.append(card.element);
    }
  }

  updateFilter = (newFilter) => {
    Object.assign(this.filters, newFilter);
    let { noNuts = false, vegeterianOnly = false, maxSpiciness = 4, category = '' } = this.filters;
    let filteredCards = this.productsCards.filter(e => e.spiciness <= maxSpiciness);

    if (noNuts) {
      filteredCards = filteredCards.filter(e => !e.nuts);
    }
    if (vegeterianOnly) {
      filteredCards = filteredCards.filter(e => e.vegeterian);
    }
    if (category) {
      filteredCards = filteredCards.filter(e => e.category == category);
    }

    this.productsInner.innerHTML = '';
    this.addCards(filteredCards);
  }
}