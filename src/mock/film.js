import dayjs from "dayjs";
import {EMOJI} from "../const.js";

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateDate = () => {
  const maxDaysGap = 365;
  const daysGap = getRandomInteger(-maxDaysGap, 0);

  return dayjs().add(daysGap, `day`).toDate();
};

const descriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const filmTitles = [
  `The Dance of Life`,
  `Sagebrush Trail`,
  `The Man with the Golden Arm`,
  `Santa Claus Conquers the Martians`,
  `Popeye the Sailor Meets Sindbad the`,
  `The Man with the Golden Arm`,
  `The Great Flamarion`,
  `Santa Claus Conquers the Martians`,
  `Made for Each Other`
];

const filmPosters = [
  `./images/posters/made-for-each-other.png`,
  `./images/posters/popeye-meets-sinbad.png`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/the-great-flamarion.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`,
];

const durations = [
  `1h 55m`,
  `54m`,
  `1h 59m`,
  `1h 21m`,
  `16m`,
  `1h 59m`,
  `1h 18m`,
  `1h 21m`,
  `1h 32m`
];

const genres = [
  `Musical`,
  `Western`,
  `Drama`,
  `Comedy`,
  `Cartoon`,
  `Mystery`
];

const ratings = [
  `8.3`,
  `3.2`,
  `9.0`,
  `2.3`,
  `6.3`,
  `9.0`,
  `8.9`,
  `2.3`,
  `5.8`
];

const generateData = (data) => {
  const randomIndex = getRandomInteger(0, data.length - 1);
  return data[randomIndex];
};


const generateDescriptions = (data) => {
  const randomIndex = getRandomInteger(0, data.length - 1);
  let descText = ``;
  for (let i = 0; i < randomIndex; i++) {
    descText += data[getRandomInteger(0, data.length - 1)];
    if (i !== randomIndex - 1) {
      descText += ` `;
    }
  }
  return descText;
};

const generateGenresList = (data) => {
  const randomIndex = getRandomInteger(1, data.length - 1);
  let genresList = [];
  for (let i = 0; i < randomIndex; i++) {
    genresList.push(data[getRandomInteger(0, data.length - 1)]);
  }
  return genresList;
};


const commentText = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`
];

const autors = [
  `Tim Macoveev`,
  `John Doe`
];

const generateComment = () => {
  return {
    text: generateData(commentText),
    emoji: generateData(EMOJI),
    autor: generateData(autors),
    date: generateDate()
  };
};

const comments = new Array(getRandomInteger(0, 10)).fill().map(generateComment);

export const generateFilm = () => {
  return {
    title: generateData(filmTitles),
    rating: generateData(ratings),
    date: generateDate(),
    duration: generateData(durations),
    genre: generateGenresList(genres),
    poster: generateData(filmPosters),
    description: generateDescriptions(descriptions),
    comments,
    isViewed: Boolean(getRandomInteger(0, 1)),
    isFavourite: Boolean(getRandomInteger(0, 1)),
    isAlreadyView: Boolean(getRandomInteger(0, 1)),
    actors: `Erich von Stroheim, Mary Beth Hughes, Dan Duryea`,
    country: `USA`,
    director: `Anthony Mann`,
    writers: `Anne Wigton, Heinz Herald, Richard Weil`,
    limitation: `18+`
  };
};

