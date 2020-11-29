import dayjs from "dayjs";
import {MAX_LENGTH} from "./const.js";

export const formatDate = (param, date) => {
  return dayjs(date).format(param);
};

export const clipText = (text) => {
  if(text.length > 140) {
    let newText = text.substr(0, MAX_LENGTH) + `...`;
    return newText;
  } else {
    return text;
  }
};

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};


export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};
