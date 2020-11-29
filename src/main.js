import {createUserNameTemplate} from "./view/username.js";
import MenuView from "./view/menu.js";
import {createSortTemplate} from "./view/sort.js";
import {createListTemplate} from "./view/films-list.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createListTopTemplate} from "./view/extra-films.js";
import {createFilmCountTemplate} from "./view/film-count.js";
import {createShowMoreBtnTemplate} from "./view/show-more-btn.js";
import {generateFilm} from "./mock/film.js";
import {generateFilter} from "./mock/filter.js";
import {generateUserName} from "./mock/username.js";
import {renderTemplate, renderElement, RenderPosition} from "./utils.js";

const FILM_CARD_COUNT = 18;
const FILM_CARD_STEP = 5;
const TOP_FILM_CARD_COUNT = 2;

const films = new Array(FILM_CARD_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);
const username = generateUserName(films);


const addMiniCards = (list, count) => {
  for(let i = 0; i < count; i++) {
    renderTemplate(list, createFilmCardTemplate(films[i]), `beforeend`);
  }
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);
const siteFooter = document.querySelector(`.footer`);
const siteFooterSection = siteFooter.querySelector(`.footer__statistics`);

renderTemplate(siteHeaderElement, createUserNameTemplate(username), `beforeend`);
renderElement(siteMainElement, new MenuView().getElement(), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, createSortTemplate(), `beforeend`);
renderTemplate(siteMainElement, createListTemplate(), `beforeend`);

const siteFilmsSection = siteMainElement.querySelector(`.films-list`);
const siteFilmsList = siteFilmsSection.querySelector('.films-list__container');

for (let i = 0; i < Math.min(films.length, FILM_CARD_STEP); i++) {
  renderTemplate(siteFilmsList, createFilmCardTemplate(films[i]), `beforeend`);
};

if (films.length > FILM_CARD_STEP) {
  let renderFilmsCount = FILM_CARD_STEP;
  renderTemplate(siteFilmsSection, createShowMoreBtnTemplate(), `beforeend`);
  const showMoreButton = siteFilmsSection.querySelector(`.films-list__show-more`);

  showMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
      .slice(renderFilmsCount, renderFilmsCount + FILM_CARD_STEP)
      .forEach((film) => renderTemplate(siteFilmsList, createFilmCardTemplate(film), `beforeend`));

    renderFilmsCount += FILM_CARD_STEP;

    if (renderFilmsCount >= films.length) {
      showMoreButton.remove();
    }
  });
}

renderTemplate(siteMainElement, createListTopTemplate(), `beforeend`);

const [topRatedFilms, topCommentedFilms] = siteMainElement.querySelectorAll('.films-list--extra .films-list__container');

addMiniCards(topRatedFilms, TOP_FILM_CARD_COUNT);
addMiniCards(topCommentedFilms, TOP_FILM_CARD_COUNT);

renderTemplate(siteFooterSection, createFilmCountTemplate(), `beforeend`);
