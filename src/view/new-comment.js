import {COMMENTS} from "../const.js";
import {createElement} from "../utils";

const createNewCommentItemTemplate = (emoji) => {
  return (
    `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}">
            <label class="film-details__emoji-label" for="emoji-${emoji}">
              <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
            </label>`
  );
};
const createFilmNewCommentTemplate = () => {
  const allEmoji = COMMENTS.emoji;
  const newCommentTemplate = allEmoji.map((emoji) => createNewCommentItemTemplate(emoji))
    .join(``);

  return `<div class="film-details__new-comment">
          <div class="film-details__add-emoji-label">
            <img src="images/emoji/${allEmoji[0]}.png" width="55" height="55" alt="emoji-smile">
          </div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            ${newCommentTemplate}
          </div>
        </div>`;
};

export default class FilmNewComment {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmNewCommentTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
