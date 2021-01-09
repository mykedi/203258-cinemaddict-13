import dayjs from "dayjs";
import {capitalize} from "../utils/film.js";
import AbstractView from "./abstract";

const createInfoItemTemplate = (field) => {
  const capitalizedTitle = capitalize(field[0]).replace(/([a-z0-9])([A-Z])/g, `$1 $2`);
  const pluralizeTitle = Array.isArray(field[1]) ? capitalizedTitle + `s` : capitalizedTitle;
  const values = Array.isArray(field[1]) ? field[1]
    .join(`, `) : field[1];

  return (
    ` <tr class="film-details__row">
              <td class="film-details__term">${pluralizeTitle}</td>
              <td class="film-details__cell">${values}</td>
            </tr>`
  );
};

const createFilterItemTemplate = (filter) => {
  return (
    `<input
      type="checkbox"
      id="${filter.name}"
      class="film-details__control-input visually-hidden"
      name="${filter.name}"
      ${filter.checked ? `checked` : ``}
    />
    <label
      for="${filter.name}"
      class="film-details__control-label film-details__control-label--${filter.name}"
    >
      ${filter.label}
    </label>`
  );
};

const createFilmPopupTemplate = (film) => {
  const {
    poster,
    title,
    description,
    rating,
    genre,
    releaseDate,
    runtime,
    director,
    actor,
    writer,
    ageRating,
    country,
    isInWatchlist,
    isFavorite,
    isWatched
  } = film;
  const releaseYear = dayjs(releaseDate).format(`YYYY`);
  const runtimeInHours = runtime.hours === 0 ? `` : `${runtime.hours}h`;
  const runtimeInMinutes = `${runtime.minutes}m`;
  const fullRuntime = runtimeInHours + ` ` + runtimeInMinutes;
  const fields = {director, writer, actor, releaseYear, runtime: fullRuntime, country, genre};
  const details = Object.entries(fields).map((item) => createInfoItemTemplate(item))
    .join(``);

  const filters = {watchlist: isInWatchlist, watched: isWatched, favorite: isFavorite};
  const labels = {
    watchlist: `Add to watchlist`,
    favorite: `Add to favorites`,
    watched: `Already watched`,
  };
  const filtersTemplate = Object.entries(filters).map(([filterName, isChecked]) =>
    createFilterItemTemplate({name: filterName, checked: isChecked, label: labels[filterName]})).join(``);

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
<div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

          <p class="film-details__age">${ageRating}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title.name}</h3>
              <p class="film-details__title-original">Original: ${title.original}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            ${details}
          </table>

          <p class="film-details__film-description">${description}</p>
        </div>
      </div>

      <section class="film-details__controls">
        ${filtersTemplate}
      </section>
    </div>
</form>
</section>`;
};

export default class FilmDetails extends AbstractView {
  constructor(film) {
    super();
    this._film = film;

    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._inWatchListClickHandler = this._inWatchListClickHandler.bind(this);
    this._watchedFilmClickHandler = this._watchedFilmClickHandler.bind(this);
    this._closePopup = this._closePopup.bind(this);
  }

  getTemplate() {
    return createFilmPopupTemplate(this._film);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoritePopupClick();
  }

  _inWatchListClickHandler(evt) {
    evt.preventDefault();
    this._callback.inWatchListPopupClick();
  }

  _watchedFilmClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedFilmPopupClick();
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

  setFavoriteClickHandler(callback) {
    this._callback.favoritePopupClick = callback;
    this.getElement().querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, this._favoriteClickHandler);
  }

  setInWatchListClickHandler(callback) {
    this._callback.inWatchListPopupClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, this._inWatchListClickHandler);
  }

  setWatchedFilmClickHandler(callback) {
    this._callback.watchedFilmPopupClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, this._watchedFilmClickHandler);
  }
}
