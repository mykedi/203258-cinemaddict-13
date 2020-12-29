import AbstractView from "./abstract";

const createFilmPopupTemplate = (comments) => {
  return `<div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">
          Comments <span class="film-details__comments-count">${comments.length}</span>
        </h3>
      </section>
    </div>`;
};

export default class FilmComments extends AbstractView {
  constructor(comments) {
    super();
    this._comments = comments;
  }

  getTemplate() {
    return createFilmPopupTemplate(this._comments);
  }
}
