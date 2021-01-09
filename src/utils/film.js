import dayjs from "dayjs";

export const isActive = (param, activeClass) => {
  return param ? activeClass : ``;
};

export const capitalize = (param) => {
  return param.replace(/(^\w{1})|(\s{1}\w{1})/g, (match) => match.toUpperCase());
};

export const sortFilmDownByRating = (filmA, filmB) => {
  return dayjs(filmB.rating).diff(dayjs(filmA.rating));
};

export const sortFilmDownByDate = (filmA, filmB) => {
  const filmAYear = filmA.releaseDate.format(`YYYY`);
  const filmBYear = filmB.releaseDate.format(`YYYY`);

  return dayjs(filmBYear).diff(dayjs(filmAYear));
};
