import {createUserNameTemplate} from "./view/username.js";
import {createMenuTemplate} from "./view/menu.js";
import {createSortTemplate} from "./view/sort.js";
import {createListTemplate} from "./view/films-list.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createListTopTemplate} from "./view/extra-films.js";
import {createFilmCountTemplate} from "./view/film-count.js";
import {createShowMoreBtnTemplate} from "./view/show-more-btn.js";
import {generateFilm} from "./mock/film.js";

const FILM_CARD_COUNT = 5;
const TOP_FILM_CARD_COUNT = 2;

const films = new Array(FILM_CARD_COUNT).fill().map(generateFilm);

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

render(siteHeaderElement, createUserNameTemplate(), `beforeend`);
render(siteMainElement, createMenuTemplate(), `beforeend`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createListTemplate(), `beforeend`);

const siteFilmsSection = siteMainElement.querySelector(`.films-list`);
const siteFilmsList = siteFilmsSection.querySelector('.films-list__container');

addMiniCards(siteFilmsList, FILM_CARD_COUNT);

render(siteFilmsSection, createShowMoreBtnTemplate(), `beforeend`);
render(siteMainElement, createListTopTemplate(), `beforeend`);

const [topRatedFilms, topCommentedFilms] = siteMainElement.querySelectorAll('.films-list--extra .films-list__container');

addMiniCards(topRatedFilms, TOP_FILM_CARD_COUNT);
addMiniCards(topCommentedFilms, TOP_FILM_CARD_COUNT);

render(siteFooterSection, createFilmCountTemplate(), `beforeend`);
