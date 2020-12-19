import FilmCardView from "../view/film-card.js";
import PopupView from "../view/popup.js";
import {render, RenderPosition, remove, replace} from "../utils/render.js";

export default class Movie {
  constructor(filmsListContainer) {
    this._filmsList = filmsListContainer;

    this._filmComponent = null;
    this._filmPopup = null;

    this._handleFilmBtnsClick = this._handleFilmBtnsClick.bind(this);
    this._handlePopupCloseClick = this._handlePopupCloseClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmComponent = this._filmComponent;
    const prevFilmPopup = this._filmPopup;

    this._filmComponent = new FilmCardView(film);
    this._filmPopup = new PopupView(film);

    this._filmComponent.setClickHandler(this._handleFilmBtnsClick);
    this._filmPopup.setClickHandler(this._handlePopupCloseClick);

    if (prevFilmComponent === null || prevFilmPopup === null) {
      render(
          this._filmsList,
          this._filmComponent,
          RenderPosition.BEFOREEND
      );

      return;
    }

    if (this._filmsList.getElement().contains(prevFilmComponent.getElement())) {
      replace(this._filmComponent, prevFilmComponent);
    }

    if (document.querySelector(`body`).contains(prevFilmPopup.getElement())) {
      replace(this._filmPopup, prevFilmPopup);
    }

    remove(prevFilmComponent);
    remove(prevFilmPopup);

  }

  destroy() {
    remove(this._filmComponent);
    remove(this._filmPopup);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._closePopup();
    }
  }

  _closePopup() {
    const siteBody = document.querySelector(`body`);
    remove(this._filmPopup);
    siteBody.classList.remove(`hide-overflow`);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);

  }

  _openPopup() {
    const siteFooter = document.querySelector(`.footer`);
    const siteBody = document.querySelector(`body`);

    render(
        siteFooter,
        this._filmPopup,
        RenderPosition.AFTERBEGIN
    );

    siteBody.classList.add(`hide-overflow`);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _handleFilmBtnsClick() {
    this._openPopup();
  }

  _handlePopupCloseClick() {
    this._closePopup();
  }
}