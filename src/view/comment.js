import AbstractView from "./abstract";

const createCommentItemTemplate = (comment) => {
  return (
    `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${comment.emoji}.png" width="55" height="55" alt="emoji-smile">
            </span>
            <div>
              <p class="film-details__comment-text">${comment.comment}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${comment.author}</span>
                <span class="film-details__comment-day">${comment.commentedAt}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`
  );
};
const createFilmCommentsTemplate = (comments) => {
  const commentFields = comments.map((comment) => createCommentItemTemplate(comment))
    .join(``);

  return `<ul class="film-details__comments-list">
            ${commentFields}
        </ul>`;
};


export default class Comment extends AbstractView {
  constructor(comments) {
    super();
    this._comments = comments;
  }

  getTemplate() {
    return createFilmCommentsTemplate(this._comments);
  }
}
