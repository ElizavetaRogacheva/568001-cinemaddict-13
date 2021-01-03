import UsernameView from "./view/username.js";
import MenuView from "./view/menu.js";
import FilmCountView from "./view/film-count.js";
import {generateFilm} from "./mock/film.js";
import {generateFilter} from "./mock/filter.js";
import {generateUserName} from "./mock/username.js";
import {render, RenderPosition} from "./utils/render.js";
import FilmsPresenter from "./presenter/movie-list.js";

const FILM_CARD_COUNT = 18;

const films = new Array(FILM_CARD_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);
const username = generateUserName(films);

const siteFooter = document.querySelector(`.footer`);
const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);
const siteFooterSection = siteFooter.querySelector(`.footer__statistics`);

render(siteHeaderElement, new UsernameView(username), RenderPosition.BEFOREEND);
render(siteMainElement, new MenuView(filters), RenderPosition.BEFOREEND);
render(siteFooterSection, new FilmCountView(), RenderPosition.BEFOREEND);

const filmsPresenter = new FilmsPresenter(siteMainElement);
filmsPresenter.init(films);
