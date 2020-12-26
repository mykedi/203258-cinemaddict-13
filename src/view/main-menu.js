import {createElement} from "../utils.js";

const createMainMenuTemplate = () => {
  return `<nav class="main-navigation"></nav>`;
};

export default class SiteMenu {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMainMenuTemplate();
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
