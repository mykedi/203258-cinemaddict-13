import dayjs from "dayjs";

// Функция из интернета по генерации случайного числа из диапазона
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const generateDate = () => {
  const dateFrom = dayjs(`1970-01-25`).valueOf();
  const dateTo = dayjs().valueOf();
  const randomDate = getRandomInteger(dateFrom, dateTo);

  return dayjs(randomDate);
};

