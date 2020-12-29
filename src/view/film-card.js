import {formatDate, clipText} from "./../utils/film.js";
import AbstractView from "./abstract.js";
import {FILM_CARD_ELEMS} from "../const.js";


const createFilmCardTemplate = (film) => {

  const {title, rating, date, duration, genre, poster, description, comments} = film;
  const commentsCount = comments.length;
  const year = formatDate(`YYYY`, date);
  const shortDesc = clipText(description);

  const checkActiveState = (state) => {
    return state === true ? `film-card__controls-item--active` : ``;
  };

  const activeWatchedClass = checkActiveState(film.inHistory);
  const activeWatchListClass = checkActiveState(film.inWatchlist);
  const activeFavoriteClass = checkActiveState(film.inFavorites);

  return `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${year}</span>
      <span class="film-card__duration">${duration}</span>
      <span class="film-card__genre">${genre}</span>
    </p>
    <img src="${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${shortDesc}</p>
    <a class="film-card__comments">${commentsCount} comments</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item button ${activeWatchListClass} film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
      <button class="film-card__controls-item button ${activeWatchedClass} film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
      <button class="film-card__controls-item button ${activeFavoriteClass} film-card__controls-item--favorite" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class FilmCard extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._clickHandler = this._clickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._wathedClickHandler = this._wathedClickHandler.bind(this);
    this._wachListClickHandler = this._wachListClickHandler.bind(this);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    FILM_CARD_ELEMS.forEach((element) => {
      this.getElement().querySelector(element).addEventListener(`click`, this._clickHandler);
    });
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _wathedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  _wachListClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchListClick();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._wathedClickHandler);
  }

  setWatchListClickHandler(callback) {
    this._callback.watchListClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._wachListClickHandler);
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }
}
