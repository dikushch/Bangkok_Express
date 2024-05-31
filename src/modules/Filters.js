import StepSlider from "./StepSlider";

export default class Filters {
  constructor() {
    this.element = this.createElement();
  }

  createElement = () => {
    const slider = new StepSlider({ steps: 5, value: 3 }).element;
    const sliderBox = document.createElement('div');
    sliderBox.classList.add('filters__slider');
    sliderBox.append(slider);

    const sliderLabel = document.createElement('label');
    sliderLabel.classList.add('filters__label');
    sliderLabel.textContent = 'Max spiciness';

    const sliderContainer = document.createElement('div');
    sliderContainer.classList.add('filters__group');
    sliderContainer.append(sliderLabel, sliderBox);

    const nutsCheckbox = this.createCheckbox('nuts-checkbox', 'No nuts', 'filterNuts');
    const vegCheckbox = this.createCheckbox('vegeterian-checkbox', 'Vegeterian only', 'filterVegeterian');

    const filters = document.createElement('div');
    filters.classList.add('filters');
    filters.append(sliderContainer, nutsCheckbox, vegCheckbox);

    return filters;
  }

  createCheckbox = (id, labelText, ref) => {
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.value = '1';
    input.id = id;
    input.classList.add('styled-checkbox');
    this[ref] = input;

    const label = document.createElement('label');
    label.setAttribute('for', id);
    const labelSpan = document.createElement('span');
    labelSpan.classList.add('filters__label');
    labelSpan.textContent = labelText;
    label.append(labelSpan);

    const box = document.createElement('div');
    box.classList.add('filters__checkbox');
    box.append(input, label);

    const container = document.createElement('div');
    container.classList.add('filters__group');
    container.append(box);

    return container;
  }
}