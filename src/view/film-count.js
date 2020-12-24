import {createElement} from "../utils";

const createFilmCountTemplate = (count) => {
  return `<p>${count} movies inside</p>`;
};

export default class FilmCount {
  constructor(count) {
    this._count = count;
    this._element = null;
  }

  getTemplate() {
    return createFilmCountTemplate(this._count);
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
