import dayjs from "dayjs";
import {MAX_LENGTH} from "../const.js";

export const formatDate = (param, date) => {
  return dayjs(date).format(param);
};

export const clipText = (text) => {
  if (text.length > 140) {
    let newText = text.substr(0, MAX_LENGTH) + `...`;
    return newText;
  } else {
    return text;
  }
};
