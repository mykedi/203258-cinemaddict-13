import {capitalize} from "../utils/film.js";
import AbstractView from "./abstract";

const createFilterItemTemplate = (filter, isActive) => {
  const {name, count} = filter;
  const separatedName = capitalize(name).replace(/([a-z0-9])([A-Z])/g, `$1 $2`);
  const countBlock = name !== `allMovies` ? `<span class="main-navigation__item-count">${count}</span>` : ``;
  return (
    `<a
      href="#${name}"
      class="main-navigation__item ${isActive ? `main-navigation__item--active` : ``}"
      >
        ${separatedName}
        ${countBlock}
      </a>`);
};

const createFiltersTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
    .join(``);

  return `<div class="main-navigation__items">
    ${filterItemsTemplate}
  </div>`;
};

export default class Filters extends AbstractView {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFiltersTemplate(this._filters);
  }
}
