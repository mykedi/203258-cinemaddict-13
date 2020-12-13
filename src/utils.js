import dayjs from "dayjs";

// Функция из интернета по генерации случайного числа из диапазона
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const isActive = (param1, param2) => {
  return param1 && !param2 ? `film-card__controls-item--active` : ``;
};

export const generateDate = () => {
  const dateFrom = dayjs(`1970-01-25`).valueOf();
  const dateTo = dayjs().valueOf();
  const randomDate = getRandomInteger(dateFrom, dateTo);

  return dayjs(randomDate);
};

export const capitalize = (param) => {
  return param.replace(/(^\w{1})|(\s{1}\w{1})/g, (match) => match.toUpperCase());
};
