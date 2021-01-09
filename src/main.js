import ProfileHeader from './view/profile-header.js';
import SiteMenuView from './view/main-menu.js';
import FiltersView from './view/filters.js';
import StatsView from './view/statistic.js';
import FilmsView from './view/films.js';
import {createTopRatedTemplate} from './view/top-rated.js';
import {createMostCommentedTemplate} from './view/most-commented.js';
import {createExtraFilmCardTemplate} from './view/extra-film-card.js';
import FilmCount from './view/film-count.js';
import FilmsBoardPresenter from './presenter/film-list.js';
import {generateFilm} from "./mock/film.js";
import {generateFilter} from "./mock/filters.js";
import {renderTemplate, render, renderPosition} from "./utils/render.js";

const FILM_COUNT = 20;
const EXTRAS_FILMS_CARD = 2;

const films = new Array(FILM_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);
const watchedFilms = films.filter((film) => film.isWatched).length;

// Header
const siteHeaderElement = document.querySelector(`.header`);
if (watchedFilms > 0) {
  render(siteHeaderElement, new ProfileHeader(watchedFilms), renderPosition.BEFOREEND);
}

// Main
const siteMainElement = document.querySelector(`.main`);

// Navigation
const siteMenuComponent = new SiteMenuView();

render(siteMainElement, siteMenuComponent, renderPosition.BEFOREEND);
render(siteMenuComponent, new FiltersView(filters), renderPosition.BEFOREEND);
render(siteMenuComponent, new StatsView(), renderPosition.BEFOREEND);

// Content
const boardPresenter = new FilmsBoardPresenter(siteMainElement);
boardPresenter.init(films);
const filmsComponent = new FilmsView();

// TODO: Extras blocks
renderTemplate(filmsComponent.getElement(), createTopRatedTemplate(), `beforeEnd`);
renderTemplate(filmsComponent.getElement(), createMostCommentedTemplate(), `beforeEnd`);

const siteExtraFilmsElement = filmsComponent.getElement().querySelectorAll(`.films-list--extra`);

for (let j = 0; j < siteExtraFilmsElement.length; j++) {
  for (let k = 0; k < EXTRAS_FILMS_CARD; k++) {
    const siteExtraFilmsCardElement = siteExtraFilmsElement[j].querySelector(`.films-list__container`);
    renderTemplate(siteExtraFilmsCardElement, createExtraFilmCardTemplate(), `beforeEnd`);
  }
}

// Footer
const siteFooterElement = document.querySelector(`.footer`);
const siteFilmCountElement = siteFooterElement.querySelector(`.footer__statistics`);

render(siteFilmCountElement, new FilmCount(films.length), renderPosition.BEFOREEND);
