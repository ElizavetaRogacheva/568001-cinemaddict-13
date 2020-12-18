import FilmListView from "../view/films-list.js";
import FilmCardView from "../view/film-card.js";
import ShowMoreBtnView from "../view/show-more-btn.js";
import FilmsEmptyView from "../view/no-films.js";
import PopupView from "../view/popup.js";
import {render, RenderPosition, remove} from "../utils/render.js";

const FILM_CARD_STEP = 5;

export default class MovieList {
  constructor(movieListContainer) {
    this._movieListContainer = movieListContainer;

    this._movieListComponent = new FilmListView();
    this._filmsEmptyComponent = new FilmsEmptyView();
  }

  init(films) {
    this._films = films.slice();

    render(
        this._movieListContainer,
        this._movieListComponent,
        RenderPosition.BEFOREEND
    );

    this._renderFilmsComponent();
  }

  _renderFilm(film) {
    const filmComponent = new FilmCardView(film);
    const filmPopup = new PopupView(film);

    const siteFilmsSection = this._movieListContainer.querySelector(`.films-list`);
    const siteFilmsList = siteFilmsSection.querySelector(`.films-list__container`);
    const siteFooter = document.querySelector(`.footer`);
    const siteBody = document.querySelector(`body`);

    const openPopup = () => {
      render(
          siteFooter,
          filmPopup,
          RenderPosition.AFTERBEGIN
      );
      siteBody.classList.add(`hide-overflow`);
    };

    const closePopup = () => {
      remove(filmPopup);
      siteBody.classList.remove(`hide-overflow`);
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

    render(
        siteFilmsList,
        filmComponent,
        RenderPosition.BEFOREEND
    );

    filmComponent.setClickHandler(() => {
      openPopup();
      document.addEventListener(`keydown`, onEscKeyDown);
    });
  }

  _renderFilms(from, to) {
    this._films
    .slice(from, to)
    .forEach((film) => this._renderFilm(film));
  }

  _renderFilmsList() {
    this._renderFilms(0, Math.min(this._films.length, FILM_CARD_STEP));

    if (this._films.length > FILM_CARD_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderEmptyFilmsList() {
    const siteFilmsSection = this._movieListContainer.querySelector(`.films-list`);
    const siteFilmsList = siteFilmsSection.querySelector(`.films-list__container`);

    render(
        siteFilmsList,
        this._filmsEmptyComponent,
        RenderPosition.BEFOREEND
    );
  }

  _renderShowMoreButton() {
    const siteFilmsSection = this._movieListContainer.querySelector(`.films-list`);

    let renderFilmsCount = FILM_CARD_STEP;
    const showMoreBtnComponent = new ShowMoreBtnView();

    render(
        siteFilmsSection,
        showMoreBtnComponent,
        RenderPosition.BEFOREEND
    );

    showMoreBtnComponent.setClickHandler(() => {
      this._films
        .slice(renderFilmsCount, renderFilmsCount + FILM_CARD_STEP)
        .forEach((film) => this._renderFilm(film));

      renderFilmsCount += FILM_CARD_STEP;

      if (renderFilmsCount >= this._films.length) {
        remove(showMoreBtnComponent);
      }
    });
  }

  _renderFilmsComponent() {
    if (this._films.length === 0) {
      this.__renderEmptyFilmsList();
      return;
    }

    this._renderFilmsList();

  }
}
