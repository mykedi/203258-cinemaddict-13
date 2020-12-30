import {isActive} from "../utils/film.js";
import AbstractView from "./abstract";

const cutDescription = (text) => {
  const limit = 140;
  text = text.trim();
  if (text.length <= limit) {
    return text;
  }
  text = text.slice(0, limit);
  return text.trim() + `...`;
};

const createFilmCardTemplate = (film) => {
  const {poster, title, description, rating, genre, releaseDate, isInWatchlist, isFavorite, isWatched, runtime, comments} = film;
  const releaseYear = releaseDate.format(`YYYY`);
  const runtimeInHours = runtime.hours === 0 ? `` : `${runtime.hours}h`;
  const runtimeInMinutes = `${runtime.minutes}m`;

  return `<article class="film-card">
          <h3 class="film-card__title">${title.name}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${releaseYear}</span>
            <span class="film-card__duration">${runtimeInHours} ${runtimeInMinutes}</span>
            <span class="film-card__genre">${Array.isArray(genre) ? genre[0] : genre}</span>
          </p>
          <img src="./images/posters/${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${cutDescription(description)}</p>
          <a class="film-card__comments">${comments.length} comments</a>
          <div class="film-card__controls">
            <button class="film-card__controls-item ${isActive(isInWatchlist, isWatched)} button film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
            <button class="film-card__controls-item ${isActive(isWatched, isInWatchlist)} button film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
            <button class="film-card__controls-item ${isActive(isFavorite, isInWatchlist)} button film-card__controls-item--favorite" type="button">Mark as favorite</button>
          </div>
        </article>`;
};

export default class FilmCard extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._showDetailsClickHandler = this._showDetailsClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  _showDetailsClickHandler(evt) {
    evt.preventDefault();
    this._callback.detailsClick();
  }

  setShowDetailsClickHandler(callback) {
    this._callback.detailsClick = callback;
    [this.getElement().querySelector(`.film-card__poster`),
      this.getElement().querySelector(`.film-card__title`),
      this.getElement().querySelector(`.film-card__comments`)]
      .forEach((item) => item.addEventListener(`click`, this._showDetailsClickHandler));
  }
}
