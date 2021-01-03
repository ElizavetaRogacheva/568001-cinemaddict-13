import dayjs from "dayjs";
import {MAX_LENGTH} from "../const.js";

export const formatDate = (param, date) => {
  return dayjs(date).format(param);
};

export const clipText = (text) => {
  return text.length > 140 ? text.substr(0, MAX_LENGTH) + `...` : text;
};

export const sortFilmData = (filmA, filmB) => {
  return dayjs(filmB.date).diff(dayjs(filmA.date));
};

export const sortFilmRating = (filmA, filmB) => {
  return filmB.rating - filmA.rating;
};

