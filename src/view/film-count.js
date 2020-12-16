import AbstractView from "./abstract.js";

const createFilmCountTemplate = () => {
  return `<p>130 291 movies inside</p>`;
};

export default class FilmCount extends AbstractView {
  getTemplate() {
    return createFilmCountTemplate();
  }
}
