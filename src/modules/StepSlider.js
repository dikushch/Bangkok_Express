export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.stepInPercents = (100 / (this.steps - 1)).toFixed(1);
    this.leftPercents = this.stepInPercents * this.value;
    this.activeStep = null;

    this.element = this.createSlider();
    this.addClassActive(this.value);

    this.sliderThumb.addEventListener('pointerdown', (event) => {
      this.element.classList.add('slider_dragging');
      document.addEventListener('pointermove', this.onMove);
      document.addEventListener('pointerup', this.onPointerUp);
    });

    this.sliderThumb.ondragstart = function () {
      return false;
    }
  }

  createSlider = () => {
    const slider = document.createElement('div');
    slider.classList.add('slider');

    this.sliderThumb = document.createElement('div');
    this.sliderThumb.classList.add('slider__thumb');
    this.sliderThumb.style.left = `${this.leftPercents}%`;

    this.sliderValue = document.createElement('span');
    this.sliderValue.classList.add('slider__value');
    this.sliderValue.textContent = `${this.value}`;
    this.sliderThumb.append(this.sliderValue);

    this.sliderProgress = document.createElement('div');
    this.sliderProgress.classList.add('slider__progress');
    this.sliderProgress.style.width = `${this.leftPercents}%`;

    const sliderSteps = document.createElement('div');
    sliderSteps.classList.add('slider__steps');

    this.stepsNodes = [];
    for (let i = 0; i < this.steps; i++) {
      const step = document.createElement('span');
      this.stepsNodes.push(step);
    }
    sliderSteps.append(...this.stepsNodes);

    slider.append(this.sliderThumb, this.sliderProgress, sliderSteps);

    return slider;
  }

  onMove = (event) => {
    let stepInPercents = Math.round((event.clientX - this.element.getBoundingClientRect().left) / (this.element.clientWidth / 100));

    if (stepInPercents < 0) {
      stepInPercents = 0;
    }

    if (stepInPercents > 100) {
      stepInPercents = 100;
    }

    this.sliderThumb.style.left = stepInPercents + '%';
    this.sliderProgress.style.width = stepInPercents + '%';

    let step = Math.floor((stepInPercents + this.stepInPercents / 2) / this.stepInPercents);
    this.addClassActive(step);
  }

  onPointerUp = () => {
    this.element.classList.remove('slider_dragging');
    this.changeSlider();
    this.addEvent();
    document.removeEventListener('pointermove', this.onMove);
    document.removeEventListener('pointerup', this.onPointerUp);
  }

  addClassActive = (value) => {
    if (!this.activeStep) {
      this.activeStep = this.stepsNodes[value];
      this.activeStep.classList.add('active');
      return;
    }

    this.activeStep.classList.remove('active');
    this.activeStep = this.stepsNodes[value];
    this.activeStep.classList.add('active');
    this.value = value;
    this.sliderValue.textContent = this.value;
  }

  changeSlider = () => {
    this.leftPercents = this.stepInPercents * this.value;
    this.sliderThumb.style.left = this.leftPercents + '%';
    this.sliderProgress.style.width = this.leftPercents + '%';
  }

  addEvent = () => {
    let event = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    });

    this.element.dispatchEvent(event);
  }
}