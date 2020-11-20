import {createHeaderTemplate} from './view/header.js';
import {createMenuTemplate} from './view/menu.js';
import {createFiltersTemplate} from './view/filters.js';
import {createListTemplate} from './view/list.js';
import {createFilmCardTemplate} from './view/film-card.js';
import {createShowMoreButtonTemplate} from './view/show-more-button.js';
import {createExtrasTemplate} from './view/extras.js';
import {createExtraFilmsCardTemplate} from './view/extra-films-card.js';
import {createFilmCountTemplate} from './view/film-count.js';

const FILM_COUNT = 5;
const EXTRAS_COUNT = 2;
const EXTRAS_FILMS_CARD = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// Header
const siteHeaderElement = document.querySelector(`.header`);

render(siteHeaderElement, createHeaderTemplate(), `beforeEnd`);

// Main
const siteMainElement = document.querySelector(`.main`);

render(siteMainElement, createMenuTemplate(), `beforeEnd`);
render(siteMainElement, createFiltersTemplate(), `beforeEnd`);
render(siteMainElement, createListTemplate(), `beforeEnd`);


// Content
const siteFilmCardElement = siteMainElement.querySelector(`.films-list__container`);
const siteShowMoreButtonElement = siteMainElement.querySelector(`.films-list`);


for (let i = 0; i < FILM_COUNT; i++) {
  render(siteFilmCardElement, createFilmCardTemplate(), `beforeEnd`);
}

render(siteShowMoreButtonElement, createShowMoreButtonTemplate(), `beforeEnd`);

// Extras blocks
const siteFilmListElement = siteMainElement.querySelector(`.films`);

for (let i = 0; i < EXTRAS_COUNT; i++) {
  render(siteFilmListElement, createExtrasTemplate(), `beforeEnd`);
}

const siteExtraFilmsElement = siteFilmListElement.querySelectorAll(`.films-list--extra`);

for (let j = 0; j < siteExtraFilmsElement.length; j++) {
  for (let k = 0; k < EXTRAS_FILMS_CARD; k++) {
    const siteExtraFilmsCardElement = siteExtraFilmsElement[j].querySelector(`.films-list__container`);
    render(siteExtraFilmsCardElement, createExtraFilmsCardTemplate(), `beforeEnd`);
  }
}

// Footer
const siteFooterElement = document.querySelector(`.footer`);
const siteFilmCountElement = siteFooterElement.querySelector(`.footer__statistics`);

render(siteFilmCountElement, createFilmCountTemplate(), `beforeEnd`);

