import FilmCardView from "../view/film-card.js";
import PopupView from "../view/popup.js";
import {render, RenderPosition, remove, replace} from "../utils/render.js";

export default class Movie {
  constructor(filmsListContainer, changeData) {
    this._filmsList = filmsListContainer;
    this._changeData = changeData;

    this._filmComponent = null;
    this._filmPopup = null;

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleWatchListClick = this._handleWatchListClick.bind(this);

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

    this._filmComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmComponent.setWatchListClickHandler(this._handleWatchListClick);

    if (prevFilmComponent === null || prevFilmPopup === null) {
      render(
          this._filmsList,
          this._filmComponent,
          RenderPosition.BEFOREEND
      );

      return;
    }

    if (this._filmsList.contains(prevFilmComponent.getElement())) {
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

  _handleFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              inFavorites: !this._film.inFavorites
            }
        )
    );
  }

  _handleWatchedClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              inHistory: !this._film.inFavorites
            }
        )
    );
  }

  _handleWatchListClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              inWatchlist: !this._film.inFavorites
            }
        )
    );
  }
}
