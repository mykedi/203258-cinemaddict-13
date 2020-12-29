import ProfileHeader from './view/profile-header.js';
import SiteMenuView from './view/main-menu.js';
import FiltersView from './view/filters.js';
import StatsView from './view/statistic.js';
import SortView from './view/sort.js';
import FilmsView from './view/films.js';
import FilmsListView from './view/films-list.js';
import FilmCardView from './view/film-card.js';
import NoFilm from './view/no-film.js';
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
import {renderTemplate, render, renderPosition, remove, append} from "./utils/render.js";

const FILM_COUNT = 20;
const FILM_COUNT_PER_STEP = 5;
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
const filmsComponent = new FilmsView();

if (films.length === 0) {
  render(filmsComponent, new NoFilm(), renderPosition.BEFOREEND);
} else {
  render(siteMainElement, new SortView(), renderPosition.BEFOREEND);
}
render(siteMainElement, filmsComponent, renderPosition.BEFOREEND);

const filmsListComponent = new FilmsListView();
render(filmsComponent, filmsListComponent, renderPosition.BEFOREEND);

const siteFilmCardElement = filmsListComponent.getElement().querySelector(`.films-list__container`);

// Рендерим карточку фильма
const renderFilm = (filmListElement, film) => {
  const filmCardComponent = new FilmCardView(film);
  const popupComponent = new FilmPopup();
  const filmCommentsComponent = new FilmComments(film.comments);

  render(filmListElement, filmCardComponent, renderPosition.BEFOREEND);

  const renderPopup = (i) => {
    // render Popup
    append(siteMainElement, popupComponent);

    const filmDetailsComponent = popupComponent.getElement().querySelector(`.film-details__inner`);
    render(filmDetailsComponent, new FilmDetails(i), renderPosition.BEFOREEND);

    // render Comments
    render(filmDetailsComponent, filmCommentsComponent, renderPosition.BEFOREEND);

    const commentComponent = filmCommentsComponent.getElement().querySelector(`.film-details__comments-wrap`);

    render(commentComponent, new Comment(i.comments), renderPosition.BEFOREEND);
    render(commentComponent, new FilmNewComment(), renderPosition.BEFOREEND);
  };

  const removePopup = () => {
    document.body.classList.remove(`hide-overflow`);
    // siteMainElement.removeChild(popupComponent.getElement());
    remove(popupComponent);
  };

  filmCardComponent.setShowDetailsClickHandler(() => {
    document.addEventListener(`keydown`, onEscKeyDown);
    document.body.classList.add(`hide-overflow`);
    renderPopup(film);

    popupComponent.setCloseClickHandler(() => {
      removePopup();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });
  });

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      removePopup();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };
};

for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  renderFilm(siteFilmCardElement, films[i]);
}

// При нажатии на кнопку Показать больше
if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_COUNT_PER_STEP;
  const showMoreButtonComponent = new ShowMoreButtonView();

  render(filmsComponent, showMoreButtonComponent, renderPosition.BEFOREEND);

  showMoreButtonComponent.setClickHandler(() => {
    films
      .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => renderFilm(siteFilmCardElement, film));

    renderedFilmCount += FILM_COUNT_PER_STEP;

    if (renderedFilmCount >= films.length) {
      remove(showMoreButtonComponent);
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

render(siteFilmCountElement, new FilmCount(films.length), renderPosition.BEFOREEND);
