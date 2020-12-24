import {createElement} from "../utils.js";

const createFilmsListTemplate = () => {
  return `<section class="films">
          </section>`;
};

export default class Films {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsListTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
