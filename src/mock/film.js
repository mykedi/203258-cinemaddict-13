import dayjs from "dayjs";
const relativeTime = require(`dayjs/plugin/relativeTime`);
dayjs.extend(relativeTime);
import {FILM_INFO, COMMENTS} from "../const.js";
import {getRandomInteger, generateDate} from "../utils.js";

const generateInfo = (field) => {
  const randomIndex = getRandomInteger(0, field.length - 1);

  return field[randomIndex];
};

// Генерируем комментарии к фильму
const generateComments = () => {
  const commentsCount = getRandomInteger(0, 5);
  const comments = [];
  if (commentsCount === 0) {
    return [];
  }
  for (let i = 0; i < commentsCount; i++) {
    const {author, text, commentedAt, emoji} = COMMENTS;
    const date = dayjs(generateInfo(commentedAt)).fromNow();

    comments.push({
      author: generateInfo(author),
      comment: generateInfo(text),
      commentedAt: date,
      emoji: generateInfo(emoji),
    });
  }
  return comments;
};

// Генерация карточки фильма
export const generateFilm = () => {
  const {title, description, poster, genres, directors, actors, writers, country} = FILM_INFO;

  // сомнительный способ, но в голову больше ничего не пришлло
  const hours = getRandomInteger(0, 3);
  const minutes = getRandomInteger(0, 59);

  return {
    poster: generateInfo(poster),
    title: generateInfo(title),
    description: generateInfo(description),
    genre: generateInfo(genres),
    runtime: {hours, minutes: (minutes < 10) ? `0${minutes}` : minutes},
    rating: (Math.random() * 10).toFixed(1),
    releaseDate: generateDate(),
    isInWatchlist: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    director: generateInfo(directors),
    writer: generateInfo(writers),
    actor: generateInfo(actors),
    country: generateInfo(country),
    ageRating: getRandomInteger(0, 18),
    comments: generateComments(),
  };
};
