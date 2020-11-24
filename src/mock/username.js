import {USER_NAME} from "../const.js";

export const generateUserName = (films) => {
  const [novice, fan, movieBuff] = USER_NAME;
  const historyLength = films.filter((film) => film.inHistory).length;
  if (historyLength <= 10 && historyLength > 0) {
    return novice;
  } else if (historyLength <= 20 && historyLength > 10) {
    return fan;
  } else if (historyLength > 20) {
    return movieBuff;
  }
  return ``;
};
