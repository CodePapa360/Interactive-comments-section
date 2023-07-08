import View from "./View.js";

class MainComment extends View {
  // _commentParentElement;

  renderComment(data) {
    const markup = this.createSelfCommentMarkup(data);
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
    // this._commentParentElement = document.querySelector(".each-comment");
  }

  addHandlerEdit(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".edit-btn");
      if (!btn) return;

      handler();
    });
  }

  createSelfCommentMarkup(data) {
    const markup = `
    <div class="each-comment">
      <div class="main-comment comment">
        <div class="comment-user">
          <div class="avater">
            <img
              src="${data.user.image.png}"
              alt="${data.user.username}'s photo"
            />
          </div>
          <p class="username">${data.user.username}</p>
          <span class="you-txt">You</span>
          <p class="created-at">${data.createdAt}</p>
        </div>

        <p class="comment-content">
        ${data.content}
        </p>

        <div class="comment-votting">
          <button class="btn-plus btn-votting" type="button">
            <img src="./images/icon-plus.svg" alt="Plus icon" />
          </button>

          <p class="score">${data.score}</p>

          <button class="btn-minus btn-votting" type="button">
            <img src="./images/icon-minus.svg" alt="Minus icon" />
          </button>
        </div>

        <div class="comment-actions">
          <button class="action-btn delete-btn" type="button">
            <img src="./images/icon-delete.svg" alt="Delete icon" />
            <span>Delete</span>
          </button>

          <button class="action-btn edit-btn" type="button">
            <img src="./images/icon-edit.svg" alt="Edit icon" />
            <span>Edit</span>
          </button>
        </div>
      </div>
    </div>
    `;

    return markup;
  }
}

export default new MainComment();
