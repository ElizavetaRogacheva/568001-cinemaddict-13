import FilmListView from "../view/films-list.js";
import ShowMoreBtnView from "../view/show-more-btn.js";
import FilmsEmptyView from "../view/no-films.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import FilmPresenter from "./movie.js";
import {updateItem} from "../utils/common.js";

const FILM_CARD_STEP = 5;

export default class MovieList {
  constructor(movieListContainer) {
    this._movieListContainer = movieListContainer;

    this._renderedFilmsCount = FILM_CARD_STEP;
    this._filmPresenter = {};

    this._movieListComponent = new FilmListView();
    this._filmsEmptyComponent = new FilmsEmptyView();
    this._showMoreBtnComponent = new ShowMoreBtnView();
    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleShowMoreBtnClick = this._handleShowMoreBtnClick.bind(this);
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

  _handleModeChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleFilmChange(updatedFilms) {
    this._films = updateItem(this._films, updatedFilms);
    this._filmPresenter[updatedFilms.id].init(updatedFilms);
  }

  _renderFilm(film) {
    const siteFilmsSection = this._movieListContainer.querySelector(`.films-list`);
    const siteFilmsList = siteFilmsSection.querySelector(`.films-list__container`);

    const filmPresenter = new FilmPresenter(siteFilmsList, this._handleFilmChange, this._handleModeChange);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;

  }

  _renderFilms(from, to) {
    this._films
    .slice(from, to)
    .forEach((film) => this._renderFilm(film));
  }

  _clearFilmList() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    this._renderedFilmsCount = FILM_CARD_STEP;
    remove(this._showMoreBtnComponent);
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

  _handleShowMoreBtnClick() {
    this._renderFilms(this._renderedFilmsCount, this._renderedFilmsCount + FILM_CARD_STEP);
    this._renderedFilmsCount += FILM_CARD_STEP;
    if (this._renderedFilmsCount >= this._films.length) {
      remove(this._showMoreBtnComponent);
    }
  }

  _renderShowMoreButton() {
    const siteFilmsSection = this._movieListContainer.querySelector(`.films-list`);

    render(
        siteFilmsSection,
        this._showMoreBtnComponent,
        RenderPosition.BEFOREEND
    );

    this._showMoreBtnComponent.setClickHandler(this._handleShowMoreBtnClick);
  }

  _renderFilmsComponent() {
    if (this._films.length === 0) {
      this.__renderEmptyFilmsList();
      return;
    }

    this._renderFilmsList();

  }
}
