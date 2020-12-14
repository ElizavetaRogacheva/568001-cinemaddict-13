import UsernameView from "./view/username.js";
import MenuView from "./view/menu.js";
import FilmCountView from "./view/film-count.js";
import FilmListView from "./view/films-list.js";
import ShowMoreBtnView from "./view/show-more-btn.js";
import SortMenuView from "./view/sort.js";
import FilmCardView from "./view/film-card.js";
import ExtraFilmsView from "./view/extra-films.js";
import PopupView from "./view/popup.js";
import FilmsEmptyView from "./view/no-films.js";
import {generateFilm} from "./mock/film.js";
import {generateFilter} from "./mock/filter.js";
import {generateUserName} from "./mock/username.js";
import {render, RenderPosition, remove} from "./utils/render.js";
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

  const openPopup = () => {
    render(
      siteFooter,
      filmPopup,
      RenderPosition.AFTERBEGIN
    );
    siteBody.classList.add('hide-overflow');
  };

  const closePopup = () => {
    remove(filmPopup);
    siteBody.classList.remove('hide-overflow');
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      closePopup();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  filmPopup.setClickHandler(() => {
    closePopup();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(filmCardWrapper, filmComponent, RenderPosition.BEFOREEND);
  filmComponent.setClickHandler(() => {
    openPopup();
    document.addEventListener(`keydown`, onEscKeyDown);
  });
}

const addMiniCards = (list, count) => {
  for(let i = 0; i < count; i++) {
    renderFilm(list, films[i]);
  }
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);
const siteFooterSection = siteFooter.querySelector(`.footer__statistics`);

render(siteHeaderElement, new UsernameView(username), RenderPosition.BEFOREEND);
render(siteMainElement, new MenuView(filters), RenderPosition.BEFOREEND);
render(siteMainElement, new SortMenuView(), RenderPosition.BEFOREEND);

if(films.length > 0) {
  render(
    siteMainElement,
    new FilmListView(),
    RenderPosition.BEFOREEND
  );
  const siteFilmsSection = siteMainElement.querySelector(`.films-list`);
  const siteFilmsList = siteFilmsSection.querySelector('.films-list__container');

  for (let i = 0; i < Math.min(films.length, FILM_CARD_STEP); i++) {
    renderFilm(siteFilmsList, films[i]);
  };

  if (films.length > FILM_CARD_STEP) {
    let renderFilmsCount = FILM_CARD_STEP;
    const showMoreButton = new ShowMoreBtnView()
    render(
      siteFilmsSection,
      showMoreButton,
      RenderPosition.BEFOREEND
    );

    showMoreButton.setClickHandler(() => {
      films
        .slice(renderFilmsCount, renderFilmsCount + FILM_CARD_STEP)
        .forEach((film) =>
          render(
            siteFilmsList,
            new FilmCardView(film),
            RenderPosition.BEFOREEND)
        );

      renderFilmsCount += FILM_CARD_STEP;

      if (renderFilmsCount >= films.length) {
        remove(showMoreButton);
      }
    });
  };

  EXTRA_FILMS_TITLES.forEach(title =>
    render(
      siteMainElement,
      new ExtraFilmsView(title),
      RenderPosition.BEFOREEND
    )
  );

  const [topRatedFilms, topCommentedFilms] = siteMainElement.querySelectorAll('.films-list--extra .films-list__container');

  addMiniCards(topRatedFilms, TOP_FILM_CARD_COUNT);
  addMiniCards(topCommentedFilms, TOP_FILM_CARD_COUNT);
} else {
  render(siteMainElement, new FilmsEmptyView(), RenderPosition.BEFOREEND);
}

render(siteFooterSection, new FilmCountView(), RenderPosition.BEFOREEND);
