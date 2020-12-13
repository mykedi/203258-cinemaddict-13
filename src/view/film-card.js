import {isActive} from "../utils.js";

const cutDescription = (text) => {
  const limit = 140;
  text = text.trim();
  if (text.length <= limit) {
    return text;
  }
  text = text.slice(0, limit);
  return text.trim() + `...`;
};

export const createFilmCardTemplate = (film) => {
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
