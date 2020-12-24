import ProfileHeader from './view/profile-header.js';
import SiteMenuView from './view/main-menu.js';
import FiltersView from './view/filters.js';
import StatsView from './view/statistic.js';
import SortView from './view/sort.js';
import FilmsView from './view/films.js';
import FilmsListView from './view/films-list.js';
import FilmCardView from './view/film-card.js';
import ShowMoreButtonView from './view/show-more-button.js';
import {createTopRatedTemplate} from './view/top-rated.js';
import {createMostCommentedTemplate} from './view/most-commented.js';
import {createExtraFilmCardTemplate} from './view/extra-film-card.js';
import FilmCount from './view/film-count.js';
import FilmPopup from './view/popup.js';
import FilmComments from './view/film-comments.js';
import Comment from './view/comment.js';
import FilmDetails from './view/film-details.js';
import FilmNewComment from './view/new-comment.js';
import {generateFilm} from "./mock/film.js";
import {generateFilter} from "./mock/filters.js";
import {renderTemplate, render, renderPosition} from "./utils.js";

const FILM_COUNT = 20;
const FILM_COUNT_PER_STEP = 5;
const EXTRAS_FILMS_CARD = 2;

const films = new Array(FILM_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);
const watchedFilms = films.filter((film) => film.isWatched).length;

// Header
const siteHeaderElement = document.querySelector(`.header`);
if (watchedFilms > 0) {
  render(siteHeaderElement, new ProfileHeader(watchedFilms).getElement(), renderPosition.BEFOREEND);
}

// Main
const siteMainElement = document.querySelector(`.main`);

// Navigation
const siteMenuComponent = new SiteMenuView();

render(siteMainElement, siteMenuComponent.getElement(), renderPosition.BEFOREEND);
render(siteMenuComponent.getElement(), new FiltersView(filters).getElement(), renderPosition.BEFOREEND);
render(siteMenuComponent.getElement(), new StatsView().getElement(), renderPosition.BEFOREEND);
render(siteMainElement, new SortView().getElement(), renderPosition.BEFOREEND);

// Content
const filmsComponent = new FilmsView();
render(siteMainElement, filmsComponent.getElement(), renderPosition.BEFOREEND);

const filmsListComponent = new FilmsListView();
render(filmsComponent.getElement(), filmsListComponent.getElement(), renderPosition.BEFOREEND);

const siteFilmCardElement = filmsListComponent.getElement().querySelector(`.films-list__container`);

// Рендерим карточку фильма
const renderFilm = (filmListElement, film) => {
  const filmCardComponent = new FilmCardView(film);
  const popupComponent = new FilmPopup();
  const filmCommentsComponent = new FilmComments(film.comments);

  render(filmListElement, filmCardComponent.getElement(), renderPosition.BEFOREEND);

  const filmPoster = filmCardComponent.getElement().querySelector(`.film-card__poster`);
  const filmTitle = filmCardComponent.getElement().querySelector(`.film-card__title`);
  const filmComments = filmCardComponent.getElement().querySelector(`.film-card__comments`);

  [filmPoster, filmTitle, filmComments].forEach((item) => item.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    document.body.classList.add(`hide-overflow`);
    // Popup
    render(siteMainElement, popupComponent.getElement(), renderPosition.BEFOREEND);

    const filmDetailsComponent = popupComponent.getElement().querySelector(`.film-details__inner`);
    render(filmDetailsComponent, new FilmDetails(film).getElement(), renderPosition.BEFOREEND);

    // Comments
    render(filmDetailsComponent, filmCommentsComponent.getElement(), renderPosition.BEFOREEND);

    const commentComponent = filmCommentsComponent.getElement().querySelector(`.film-details__comments-wrap`);

    render(commentComponent, new Comment(film.comments).getElement(), renderPosition.BEFOREEND);
    render(commentComponent, new FilmNewComment().getElement(), renderPosition.BEFOREEND);

    const popupCloseButton = popupComponent.getElement().querySelector(`.film-details__close-btn`);

    popupCloseButton.addEventListener(`click`, (ev) => {
      ev.preventDefault();
      document.body.classList.remove(`hide-overflow`);
      popupComponent.getElement().remove();
      popupComponent.removeElement();
    });

  }));
};

for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  renderFilm(siteFilmCardElement, films[i]);
}

// При нажатии на кнопку Показать больше
if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_COUNT_PER_STEP;
  const showMoreButtonComponent = new ShowMoreButtonView();

  render(filmsComponent.getElement(), showMoreButtonComponent.getElement(), renderPosition.BEFOREEND);

  showMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => renderFilm(siteFilmCardElement, film));

    renderedFilmCount += FILM_COUNT_PER_STEP;

    if (renderedFilmCount >= films.length) {
      showMoreButtonComponent.getElement().remove();
      showMoreButtonComponent.removeElement();
    }
  });
}

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

render(siteFilmCountElement, new FilmCount(films.length).getElement(), renderPosition.BEFOREEND);
