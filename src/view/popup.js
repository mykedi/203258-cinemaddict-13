import dayjs from "dayjs";
import {capitalize} from "../utils";

const createInfoItemTemplate = (field) => {
  const capitalizedTitle = capitalize(field[0]).replace(/([a-z0-9])([A-Z])/g, `$1 $2`);
  const pluralizeTitle = Array.isArray(field[1]) ? capitalizedTitle + `s` : capitalizedTitle;
  const values = Array.isArray(field[1]) ? field[1]
    .join(`, `) : field[1];

  return (
    ` <tr class="film-details__row">
              <td class="film-details__term">${pluralizeTitle}</td>
              <td class="film-details__cell">${values}</td>
            </tr>`
  );
};

export const createFilmPopupTemplate = (film) => {
  const {
    poster,
    title,
    description,
    rating,
    genre,
    releaseDate,
    runtime,
    comments,
    director,
    actor,
    writer,
    ageRating,
    country
  } = film;
  const releaseYear = dayjs(releaseDate).format(`YYYY`);
  const runtimeInHours = runtime.hours === 0 ? `` : `${runtime.hours}h`;
  const runtimeInMinutes = `${runtime.minutes}m`;
  const fullRuntime = runtimeInHours + ` ` + runtimeInMinutes;
  const fields = {director, writer, actor, releaseYear, runtime: fullRuntime, country, genre};
  const details = Object.entries(fields).map((item) => createInfoItemTemplate(item))
    .join(``);

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

          <p class="film-details__age">${ageRating}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title.name}</h3>
              <p class="film-details__title-original">Original: ${title.original}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            ${details}
          </table>

          <p class="film-details__film-description">${description}</p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
      </section>
    </div>
  </form>
</section>`;
};
