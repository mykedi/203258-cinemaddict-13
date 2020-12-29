export const isActive = (param1, param2) => {
  return param1 && !param2 ? `film-card__controls-item--active` : ``;
};

export const capitalize = (param) => {
  return param.replace(/(^\w{1})|(\s{1}\w{1})/g, (match) => match.toUpperCase());
};
