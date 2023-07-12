class CommentView {
  _allCommentContainer = document.querySelector(".all-comments-container");
  _newCommentInputEl = document.querySelector(".new-comment");
  _body = document.querySelector("body");

  ////////////////////
  //Updating funtionality
  addHandlerUpdate(handler) {
    this._allCommentContainer.addEventListener("click", function (e) {
      const btn = e.target.closest(".update-btn");
      if (!btn) return;

      const parentEl = e.target.closest(".comment-wrapper");

      const id = parentEl.dataset.id;
      const updatedComment = parentEl.querySelector(".comment-content").value;
      handler(id, updatedComment);
    });
  }

  renderUpdatedComment(data) {
    const parentEl = document.querySelector(`.key${data.id}`);

    const markup = this.selfCommentInnerMarkup(data);
    parentEl.innerHTML = markup;
  }

  /////////////////////
  // Render new commnet
  renderNewSelfComment(data) {
    const markup = this.generateSelfCommentMarkup(data);
    this._allCommentContainer.insertAdjacentHTML("beforeend", markup);
  }

  generateSelfCommentMarkup(data) {
    return `
    <div class="each-comment">
      <div data-id="${data.id}" class="key${data.id} comment-wrapper">
        ${this.selfCommentInnerMarkup(data)}
      </div>
    </div>
    `;
  }

  selfCommentInnerMarkup(data) {
    return `
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
    `;
  }
}

export default new CommentView();
