import {capitalize, createElement} from "../utils";

const getUserRank = (watchedFilms) => {
  if (watchedFilms <= 10) {
    return `novice`;
  } else if (watchedFilms < 10 && watchedFilms >= 20) {
    return `fan`;
  } else {
    return `movie buff`;
  }
};

const createProfileHeaderTemplate = (watchedFilms) => {
  const userRank = getUserRank(watchedFilms);
  return `<section class="header__profile profile">
    <p class="profile__rating">${capitalize(userRank)}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

export default class ProfileHeader {
  constructor(watchedFilms) {
    this._watchedFilms = watchedFilms;
    this._element = null;
  }

  getTemplate() {
    return createProfileHeaderTemplate(this._watchedFilms);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
