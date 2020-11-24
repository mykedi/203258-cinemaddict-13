import {createProfileHeaderTemplate} from './view/profile-header.js';
import {createMainMenuTemplate} from './view/main-menu.js';
import {createFiltersTemplate} from './view/filters.js';
import {createFilmsListTemplate} from './view/films-list.js';
import {createFilmCardTemplate} from './view/film-card.js';
import {createShowMoreButtonTemplate} from './view/show-more-button.js';
import {createTopRatedTemplate} from './view/top-rated.js';
import {createMostCommentedTemplate} from './view/most-commented.js';
import {createExtraFilmCardTemplate} from './view/extra-film-card.js';
import {createFilmCountTemplate} from './view/film-count.js';

const FILM_COUNT = 5;
const EXTRAS_FILMS_CARD = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// Header
const siteHeaderElement = document.querySelector(`.header`);

render(siteHeaderElement, createProfileHeaderTemplate(), `beforeEnd`);

// Main
const siteMainElement = document.querySelector(`.main`);

render(siteMainElement, createMainMenuTemplate(), `beforeEnd`);
render(siteMainElement, createFiltersTemplate(), `beforeEnd`);
render(siteMainElement, createFilmsListTemplate(), `beforeEnd`);


// Content
const siteFilmsListElement = siteMainElement.querySelector(`.films`);
const siteFilmCardElement = siteFilmsListElement.querySelector(`.films-list__container`);
const siteShowMoreButtonElement = siteMainElement.querySelector(`.films-list`);


for (let i = 0; i < FILM_COUNT; i++) {
  render(siteFilmCardElement, createFilmCardTemplate(), `beforeEnd`);
}

render(siteShowMoreButtonElement, createShowMoreButtonTemplate(), `beforeEnd`);

// Extras blocks
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

render(siteFilmCountElement, createFilmCountTemplate(), `beforeEnd`);

