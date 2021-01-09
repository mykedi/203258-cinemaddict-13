import FilmsView from "../view/films";
import SortView from "../view/sort";
import FilmsListView from "../view/films-list";
import ShowMoreButtonView from "../view/show-more-button";
import NoFilm from "../view/no-film";
// import FilmPresenter from './film.js';
import FilmPresenter from './film.js';
import {render, renderPosition, remove} from "../utils/render.js";
import {updateItem} from "../utils/common.js";
import {sortFilmDownByRating, sortFilmDownByDate} from "../utils/film.js";
import {SortType} from "../const.js";

const FILM_COUNT_PER_STEP = 5;

export default class FilmList {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    this._filmPresenter = {};
    this._currentSortType = SortType.DEFAULT;

    this._filmsComponent = new FilmsView();
    this._filmsSortComponent = new SortView();
    this._filmsListComponent = new FilmsListView();
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._noFilmsComponent = new NoFilm();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(boardFilms) {
    this._boardFilms = boardFilms.slice();
    this._sourcedBoardFilms = boardFilms.slice();

    this._renderSort();
    render(this._boardContainer, this._filmsComponent, renderPosition.BEFOREEND);
    render(this._filmsComponent, this._filmsListComponent, renderPosition.BEFOREEND);
    this._renderBoard();
  }

  _handleFilmChange(updatedFilm) {
    this._boardFilms = updateItem(this._boardFilms, updatedFilm);
    this._filmPresenter[updatedFilm.id].init(updatedFilm);
  }

  _handleModeChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.DATE_DOWN:
        this._boardFilms.sort(sortFilmDownByDate);
        break;
      case SortType.RATING_UP:
        this._boardFilms.sort(sortFilmDownByRating);
        break;
      default:
        this._boardFilms = this._sourcedBoardFilms.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortFilms(sortType);
    this._clearFilmList();
    this._renderFilmsList();
  }

  _renderSort() {
    render(this._boardContainer, this._filmsSortComponent, renderPosition.BEFOREEND);
    this._filmsSortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilm(film) {
    const filmPresenter = new FilmPresenter(this._filmsListComponent, this._handleFilmChange, this._handleModeChange);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderFilms(from, to) {
    this._boardFilms
      .slice(from, to)
      .forEach((boardFilms) => this._renderFilm(boardFilms));
  }

  _renderFilmsList() {
    this._renderFilms(0, Math.min(this._boardFilms.length, FILM_COUNT_PER_STEP));

    if (this._boardFilms.length > FILM_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderNoFilms() {
    render(this._filmsComponent, this._noFilmsComponent, renderPosition.BEFOREEND);
  }

  _handleShowMoreButtonClick() {
    this._boardFilms
      .slice(this._renderedFilmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((boardFilm) => this._renderFilm(boardFilm));

    this._renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this._renderedFilmCount >= this._boardFilms.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    render(this._filmsComponent, this._showMoreButtonComponent, renderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _clearFilmList() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this._showMoreButtonComponent);
  }

  _renderBoard() {
    if (this._boardFilms.length === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderFilmsList();
  }
}
