import {createUserNameTemplate} from "./view/username.js";
import {createMenuTemplate} from "./view/menu.js";
import {createSortTemplate} from "./view/sort.js";
import {createListTemplate} from "./view/films-list.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createListTopTemplate} from "./view/extra-films.js";
import {createFilmCountTemplate} from "./view/film-count.js";
import {createShowMoreBtnTemplate} from "./view/show-more-btn.js";
import {createPopupTemplate} from "./view/popup.js";

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const FILM_CARD_COUNT = 5;
const TOP_FILM_CARD_COUNT = 2;

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

for(let i = 0; i < FILM_CARD_COUNT; i++) {
  render(siteFilmsList, createFilmCardTemplate(), `beforeend`);
}

render(siteFilmsSection, createShowMoreBtnTemplate(), `beforeend`);
render(siteMainElement, createListTopTemplate(), `beforeend`);

const siteTopFilms = siteMainElement.querySelectorAll('.films-list--extra .films-list__container');

for(let extraFilmSection of siteTopFilms) {
  for(let i = 0; i < TOP_FILM_CARD_COUNT; i++) {
    render(extraFilmSection, createFilmCardTemplate(), `beforeend`);
  }
}

render(siteFooterSection, createFilmCountTemplate(), `beforeend`);
render(siteFooter, createPopupTemplate(), `afterend`);
