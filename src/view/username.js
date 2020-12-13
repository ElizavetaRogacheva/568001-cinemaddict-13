import AbstractView from "./abstract.js";

const createUserNameTemplate = (name) => {
  return `<section class="header__profile profile">
    <p class="profile__rating">${name}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};


export default class Username extends AbstractView {
  constructor(name) {
    super();
    this._film = name;
  }

  getTemplate() {
    return createUserNameTemplate(this._film);
  }
}

