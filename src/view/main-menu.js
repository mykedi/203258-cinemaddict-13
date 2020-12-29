import AbstractView from "./abstract";

const createMainMenuTemplate = () => {
  return `<nav class="main-navigation"></nav>`;
};

export default class SiteMenu extends AbstractView {
  getTemplate() {
    return createMainMenuTemplate();
  }
}
