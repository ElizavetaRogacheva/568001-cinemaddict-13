import {createUserNameTemplate} from "./view/username.js";
import {createMenuTemplate} from "./view/menu.js";
import {createSortTemplate} from "./view/sort.js";
import {createListTemplate} from "./view/films-list.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createListTopTemplate} from "./view/extra-films.js";
import {createFilmCountTemplate} from "./view/film-count.js";
import {createShowMoreBtnTemplate} from "./view/show-more-btn.js";
import {createPopupTemplate} from "./view/popup.js";
import {generateFilm} from "./mock/film.js";
import {generateFilter} from "./mock/filter.js";
import {generateUserName} from "./mock/username.js";

const FILM_CARD_COUNT = 18;
const FILM_CARD_STEP = 5;
const TOP_FILM_CARD_COUNT = 2;

const films = new Array(FILM_CARD_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);
const username = generateUserName(films);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const addMiniCards = (list, count) => {
  for(let i = 0; i < count; i++) {
    render(list, createFilmCardTemplate(films[i]), `beforeend`);
  }
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);
const siteFooter = document.querySelector(`.footer`);
const siteFooterSection = siteFooter.querySelector(`.footer__statistics`);

render(siteHeaderElement, createUserNameTemplate(username), `beforeend`);
render(siteMainElement, createMenuTemplate(filters), `beforeend`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createListTemplate(), `beforeend`);

const siteFilmsSection = siteMainElement.querySelector(`.films-list`);
const siteFilmsList = siteFilmsSection.querySelector('.films-list__container');

for (let i = 0; i < Math.min(films.length, FILM_CARD_STEP); i++) {
  render(siteFilmsList, createFilmCardTemplate(films[i]), `beforeend`);
};

if (films.length > FILM_CARD_STEP) {
  let renderFilmsCount = FILM_CARD_STEP;
  render(siteFilmsSection, createShowMoreBtnTemplate(), `beforeend`);
  const showMoreButton = siteFilmsSection.querySelector(`.films-list__show-more`);

  showMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
      .slice(renderFilmsCount, renderFilmsCount + FILM_CARD_STEP)
      .forEach((film) => render(siteFilmsList, createFilmCardTemplate(film), `beforeend`));

    renderFilmsCount += FILM_CARD_STEP;

    if (renderFilmsCount >= films.length) {
      showMoreButton.remove();
    }
  });
}

render(siteMainElement, createListTopTemplate(), `beforeend`);

const [topRatedFilms, topCommentedFilms] = siteMainElement.querySelectorAll('.films-list--extra .films-list__container');

addMiniCards(topRatedFilms, TOP_FILM_CARD_COUNT);
addMiniCards(topCommentedFilms, TOP_FILM_CARD_COUNT);

render(siteFooterSection, createFilmCountTemplate(), `beforeend`);
render(siteFooter, createPopupTemplate(films[0]), `afterend`);
