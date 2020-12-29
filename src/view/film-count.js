import AbstractView from "./abstract";

const createFilmCountTemplate = (count) => {
  return `<p>${count} movies inside</p>`;
};

export default class FilmCount extends AbstractView {
  constructor(count) {
    super();
    this._count = count;
  }

  getTemplate() {
    return createFilmCountTemplate(this._count);
  }
}
