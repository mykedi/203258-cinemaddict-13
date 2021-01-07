import AbstractView from "./abstract";

const createFilmPopupTemplate = () => {
  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
  </form>
</section>`;
};

export default class FilmPopup extends AbstractView {
  constructor() {
    super();

    this._closePopup = this._closePopup.bind(this);
  }

  getTemplate() {
    return createFilmPopupTemplate();
  }

  _closePopup(evt) {
    evt.preventDefault();
    this._callback.closeClick();
  }

  setCloseClickHandler(callback) {
    this._callback.closeClick = callback;
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, this._closePopup);
  }
}
