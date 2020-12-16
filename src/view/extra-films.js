import AbstractView from "./abstract.js";

const createListTopTemplate = (title) => {
  return `<section class="films-list films-list--extra">
    <h2 class="films-list__title">${title}</h2>
    <div class="films-list__container">
    </div>
  </section>`;
};

export default class ExtraFilms extends AbstractView {
  constructor(title) {
    super();
    this._film = title;
  }

  getTemplate() {
    return createListTopTemplate(this._film);
  }
}

