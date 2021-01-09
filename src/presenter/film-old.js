import FilmCardView from "../view/film-card";
import FilmPopup from "../view/popup";
import FilmComments from "../view/film-comments";
import {append, remove, render, replace, renderPosition} from "../utils/render";
import FilmDetails from "../view/film-details";
import Comment from "../view/comment";
import FilmNewComment from "../view/new-comment";

const Mode = {
  DEFAULT: `DEFAULT`,
  POPUP: `POPUP`
};

export default class Film {
  constructor(filmsListContainer, changeData, changeMode) {
    this._boardContainer = document.body;
    this._filmsListContainer = filmsListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._filmCardComponent = null;
    this._popupComponent = null;
    this._filmDetailsComponent = null;
    this._filmCommentsComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleInWatchListClick = this._handleInWatchListClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);

    this._handleShowDetailsClick = this._handleShowDetailsClick.bind(this);
    this._handleClosePopupClick = this._handleClosePopupClick.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  init(film) {
    this._film = film;
    const prevFilmCardComponent = this._filmCardComponent;
    // const prevPopupComponent = this._popupComponent;
    const prevFilmDetailsComponent = this._filmDetailsComponent;
    // const prevFilmCommentsComponent = this._filmCommentsComponent;
    this._filmCardComponent = new FilmCardView(film);
    this._popupComponent = new FilmPopup();
    this._filmDetailsComponent = new FilmDetails(film);
    this._filmCommentsComponent = new FilmComments(film.comments);

    this._filmCardComponent.setShowDetailsClickHandler(this._handleShowDetailsClick);

    // Добавление фильма в списки (Избранное и пр)
    // на Главной
    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmCardComponent.setInWatchListClickHandler(this._handleInWatchListClick);
    this._filmCardComponent.setWatchedFilmClickHandler(this._handleWatchedClick);
    // в Попапе
    this._filmDetailsComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmDetailsComponent.setInWatchListClickHandler(this._handleInWatchListClick);
    this._filmDetailsComponent.setWatchedFilmClickHandler(this._handleWatchedClick);

    const filmsListContainerComponent = this._filmsListContainer.getElement().querySelector(`.films-list__container`);

    if (prevFilmCardComponent === null || prevFilmDetailsComponent === null) {
      render(filmsListContainerComponent, this._filmCardComponent, renderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT || this._mode === Mode.POPUP) {
      replace(this._filmCardComponent, prevFilmCardComponent);
    }

    if (this._mode === Mode.POPUP) {
      this._renderPopup();
      // replace(this._popupComponent, prevPopupComponent);
      replace(this._filmDetailsComponent, prevFilmDetailsComponent);
      // this._popupComponent.setCloseClickHandler(this._handleClosePopupClick);
      this._filmDetailsComponent.setCloseClickHandler(this._handleClosePopupClick);
      // replace(this._filmCommentsComponent, prevFilmCommentsComponent);
    }

    remove(prevFilmCardComponent);
    // remove(prevPopupComponent);
    remove(prevFilmDetailsComponent);
    // remove(prevFilmCommentsComponent);
  }

  destroy() {
    remove(this._filmCardComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._removePopup();
    }
  }

  _renderPopup() {
    append(this._boardContainer, this._popupComponent);

    const filmDetailsComponent = this._popupComponent.getElement().querySelector(`.film-details__inner`);

    render(filmDetailsComponent, this._filmDetailsComponent, renderPosition.BEFOREEND);

    this._renderComments(filmDetailsComponent);

    document.body.classList.add(`hide-overflow`);
    document.addEventListener(`keydown`, this._onEscKeyDown);

    // this._popupComponent.setCloseClickHandler(this._handleClosePopupClick);
    this._filmDetailsComponent.setCloseClickHandler(this._handleClosePopupClick);
    this._changeMode();
    this._mode = Mode.POPUP;
  }

  _renderComments(popupContainer) {
    render(popupContainer, this._filmCommentsComponent, renderPosition.BEFOREEND);

    const commentComponent = this._filmCommentsComponent.getElement().querySelector(`.film-details__comments-wrap`);

    render(commentComponent, new Comment(this._film.comments), renderPosition.BEFOREEND);
    render(commentComponent, new FilmNewComment(), renderPosition.BEFOREEND);
  }

  _removePopup() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    document.body.classList.remove(`hide-overflow`);
    remove(this._popupComponent);
    this._mode = Mode.DEFAULT;
  }

  _handleShowDetailsClick() {
    this._renderPopup(this._film);
  }

  _handleClosePopupClick() {
    this._removePopup();
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._removePopup();
    }
  }

  _handleFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isFavorite: !this._film.isFavorite,
              isInWatchlist: false
            }
        )
    );
  }

  _handleInWatchListClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isInWatchlist: !this._film.isInWatchlist,
              isWatched: false,
              isFavorite: false,
            }
        )
    );
  }

  _handleWatchedClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isWatched: !this._film.isWatched,
              isInWatchlist: false
            }
        )
    );
  }
}
