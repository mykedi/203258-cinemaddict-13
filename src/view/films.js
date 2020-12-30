import AbstractView from "./abstract";

const createFilmsListTemplate = () => {
  return `<section class="films">
          </section>`;
};

export default class Films extends AbstractView {
  getTemplate() {
    return createFilmsListTemplate();
  }
}
