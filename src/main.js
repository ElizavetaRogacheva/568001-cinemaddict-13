import UsernameView from "./view/username.js";
import MenuView from "./view/menu.js";
import FilmCountView from "./view/film-count.js";
import FilmListView from "./view/films-list.js";
import ShowMoreBtnView from "./view/show-more-btn.js";
import SortMenuView from "./view/sort.js";
import FilmCardView from "./view/film-card.js";
import ExtraFilmsView from "./view/extra-films.js";
import PopupView from "./view/popup.js";
import {generateFilm} from "./mock/film.js";
import {generateFilter} from "./mock/filter.js";
import {generateUserName} from "./mock/username.js";
import {render, RenderPosition} from "./utils.js";
import {EXTRA_FILMS_TITLES} from "./const.js";

const FILM_CARD_COUNT = 18;
const FILM_CARD_STEP = 5;
const TOP_FILM_CARD_COUNT = 2;

const films = new Array(FILM_CARD_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);
const username = generateUserName(films);
const siteFooter = document.querySelector(`.footer`);
const siteBody = document.querySelector('body');

const renderFilm = (filmCardWrapper, filmData) => {
  const filmComponent = new FilmCardView(filmData);
  const filmPopup = new PopupView(filmData);
  const openPopupElements = [
    filmComponent.getElement().querySelector('.film-card__poster'),
    filmComponent.getElement().querySelector('.film-card__comments'),
    filmComponent.getElement().querySelector('.film-card__title')
  ];

  const openPopup = () => {
    render(siteFooter, filmPopup.getElement(), RenderPosition.AFTERBEGIN);
    siteBody.classList.add('hide-overflow');
  };

  const closePopup = () => {
    filmPopup.getElement().remove();
    filmPopup.removeElement();
    siteBody.classList.remove('hide-overflow');
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      closePopup();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  openPopupElements.forEach((btn) => {
    btn.addEventListener('click', (evt) => {
      evt.preventDefault();
      openPopup();
      document.addEventListener(`keydown`, onEscKeyDown);
    });
  });

  filmPopup.getElement().querySelector('.film-details__close-btn').addEventListener('click', () => {
    closePopup();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(filmCardWrapper, filmComponent.getElement(), RenderPosition.BEFOREEND);
}

const addMiniCards = (list, count) => {
  for(let i = 0; i < count; i++) {
    renderFilm(list, films[i]);
  }
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);
const siteFooterSection = siteFooter.querySelector(`.footer__statistics`);

render(siteHeaderElement, new UsernameView(username).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new MenuView(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortMenuView().getElement(), RenderPosition.BEFOREEND);


render(siteMainElement, new FilmListView().getElement(), RenderPosition.BEFOREEND);

const siteFilmsSection = siteMainElement.querySelector(`.films-list`);
const siteFilmsList = siteFilmsSection.querySelector('.films-list__container');

for (let i = 0; i < Math.min(films.length, FILM_CARD_STEP); i++) {
  renderFilm(siteFilmsList, films[i]);
};

if (films.length > FILM_CARD_STEP) {
  let renderFilmsCount = FILM_CARD_STEP;
  render(siteFilmsSection, new ShowMoreBtnView().getElement(), RenderPosition.BEFOREEND);
  const showMoreButton = siteFilmsSection.querySelector(`.films-list__show-more`);

  showMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
      .slice(renderFilmsCount, renderFilmsCount + FILM_CARD_STEP)
      .forEach((film) => render(siteFilmsList, new FilmCardView(film).getElement(), RenderPosition.BEFOREEND));

    renderFilmsCount += FILM_CARD_STEP;

    if (renderFilmsCount >= films.length) {
      showMoreButton.remove();
    }
  });
}

EXTRA_FILMS_TITLES.forEach(title => render(siteMainElement, new ExtraFilmsView(title).getElement(), RenderPosition.BEFOREEND));

const [topRatedFilms, topCommentedFilms] = siteMainElement.querySelectorAll('.films-list--extra .films-list__container');

addMiniCards(topRatedFilms, TOP_FILM_CARD_COUNT);
addMiniCards(topCommentedFilms, TOP_FILM_CARD_COUNT);

render(siteFooterSection, new FilmCountView().getElement(), RenderPosition.BEFOREEND);
