import {createProfileHeaderTemplate} from './view/profile-header.js';
import {createMainMenuTemplate} from './view/main-menu.js';
import {createFiltersTemplate} from './view/filters.js';
import {createSortsTemplate} from './view/sort.js';
import {createFilmsListTemplate} from './view/films-list.js';
import {createFilmCardTemplate} from './view/film-card.js';
import {createShowMoreButtonTemplate} from './view/show-more-button.js';
import {createTopRatedTemplate} from './view/top-rated.js';
import {createMostCommentedTemplate} from './view/most-commented.js';
import {createExtraFilmCardTemplate} from './view/extra-film-card.js';
import {createFilmCountTemplate} from './view/film-count.js';
import {createFilmPopupTemplate} from './view/popup.js';
import {createFilmCommentsTemplate} from './view/comments.js';
import {createFilmNewCommentTemplate} from './view/new-comment.js';
import {generateFilm} from "./mock/film.js";
import {generateFilter} from "./mock/filters.js";

const FILM_COUNT = 20;
const FILM_COUNT_PER_STEP = 5;
const EXTRAS_FILMS_CARD = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};
const films = new Array(FILM_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);
const watchedFilms = films.filter((film) => film.isWatched).length;

// Header
const siteHeaderElement = document.querySelector(`.header`);
if (watchedFilms > 0) {
  render(siteHeaderElement, createProfileHeaderTemplate(watchedFilms), `beforeEnd`);
}

// Main
const siteMainElement = document.querySelector(`.main`);

render(siteMainElement, createMainMenuTemplate(), `beforeEnd`);
// Navigation
const siteNavigationElement = document.querySelector(`.main-navigation`);
render(siteNavigationElement, createFiltersTemplate(filters), `beforeEnd`);
render(siteMainElement, createSortsTemplate(filters), `beforeEnd`);
render(siteMainElement, createFilmsListTemplate(), `beforeEnd`);

// Content
const siteFilmsListElement = siteMainElement.querySelector(`.films`);
const siteFilmCardElement = siteFilmsListElement.querySelector(`.films-list__container`);

for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  render(siteFilmCardElement, createFilmCardTemplate(films[i]), `beforeEnd`);
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_COUNT_PER_STEP;
  render(siteFilmsListElement, createShowMoreButtonTemplate(), `beforeEnd`);

  const loadMoreButton = siteFilmsListElement.querySelector(`.films-list__show-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => render(siteFilmCardElement, createFilmCardTemplate(film), `beforeEnd`));

    renderedFilmCount += FILM_COUNT_PER_STEP;

    if (renderedFilmCount >= films.length) {
      loadMoreButton.remove();
    }
  });
}

// TODO: Extras blocks
render(siteFilmsListElement, createTopRatedTemplate(), `beforeEnd`);
render(siteFilmsListElement, createMostCommentedTemplate(), `beforeEnd`);

const siteExtraFilmsElement = siteFilmsListElement.querySelectorAll(`.films-list--extra`);

for (let j = 0; j < siteExtraFilmsElement.length; j++) {
  for (let k = 0; k < EXTRAS_FILMS_CARD; k++) {
    const siteExtraFilmsCardElement = siteExtraFilmsElement[j].querySelector(`.films-list__container`);
    render(siteExtraFilmsCardElement, createExtraFilmCardTemplate(), `beforeEnd`);
  }
}

// Footer
const siteFooterElement = document.querySelector(`.footer`);
const siteFilmCountElement = siteFooterElement.querySelector(`.footer__statistics`);

render(siteFilmCountElement, createFilmCountTemplate(films.length), `beforeEnd`);

const filmPoster = siteMainElement.querySelector(`.film-card__poster`);
filmPoster.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  // Popup
  render(siteMainElement, createFilmPopupTemplate(films[0]), `beforeEnd`);

  // Comments
  const sitePopupCommentsElement = document.querySelector(`.film-details__comments-wrap`);

  render(sitePopupCommentsElement, createFilmCommentsTemplate(films[0].comments), `beforeEnd`);
  render(sitePopupCommentsElement, createFilmNewCommentTemplate(), `beforeEnd`);

});
