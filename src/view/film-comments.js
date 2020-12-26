import {createElement} from "../utils";

const createFilmPopupTemplate = (comments) => {
  return `<div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">
          Comments <span class="film-details__comments-count">${comments.length}</span>
        </h3>
      </section>
    </div>`;
};

export default class FilmComments {
  constructor(comments) {
    this._comments = comments;
    this._element = null;
  }

  getTemplate() {
    return createFilmPopupTemplate(this._comments);
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
