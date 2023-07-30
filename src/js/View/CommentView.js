class CommentView {
  _allCommentContainer = document.querySelector(".all-comments-container");

  //1. Render main comment.
  renderMainComment(data) {
    const markup = `
    <div class="each-comment">
      <div data-id="${data.id}" class="key${data.id} comment-wrapper">
        ${this.commentMarkup(data)}
      </div>
      <div class="replied-comment-container"></div>
    </div>
    `;

    this._allCommentContainer.insertAdjacentHTML("beforeend", markup);
  }

  //2. Render replied comment.
  renderRepliedComment(data) {
    const wrapper = document.querySelector(`.key${data.parentId}`);
    const container = wrapper.nextElementSibling;

    const markup = `
    <div data-id="${data.id}" class="key${data.id} comment-wrapper">
      ${this.commentMarkup(data)}
    </div>
  `;

    container.insertAdjacentHTML("beforeend", markup);
  }

  // 3. Render updated comment after editing
  renderUpdatedComment(data) {
    const parentEl = this._allCommentContainer.querySelector(`.key${data.id}`);

    parentEl.innerHTML = this.commentMarkup(data);
  }

  //Scroll to the new replied comment
  scrolTo(id) {
    const com = this._allCommentContainer.querySelector(`.key${id}`);

    com.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  ////////////////////////////////
  ////////////////////////////////

  commentMarkup(data) {
    return `
        <div class="comment">
          <div class="comment-user">
            <div class="avater">
              <img
                src="${data.user.image.png}"
                alt="${data.user.username}'s photo"
              />
            </div>
            <p class="username">${data.user.username}</p>
            ${data.me ? '<span class="you-txt">You</span>' : ""}
            <p class="created-at">${data.createdAt}</p>
          </div>

          <p class="comment-content">
          ${
            data.replyingTo
              ? `<span class="to-replied-username">@${data.replyingTo}</span>`
              : ""
          }
          ${data.content}
          </p>

          <div class="comment-voting">
            <button data-vote="up" class="btn-plus btn-voting" type="button">
              <img src="./images/icon-plus.svg" alt="Plus icon" />
            </button>

            <p class="score">${data.score}</p>
 
            <button data-vote="down" class="btn-minus btn-voting" type="button">
              <img src="./images/icon-minus.svg" alt="Minus icon" />
            </button>
          </div>

          <div class="comment-actions">
            ${
              data.me
                ? `
            <button class="action-btn delete-btn" type="button">
              <img src="./images/icon-delete.svg" alt="Delete icon" />
              <span>Delete</span>
            </button>

            <button class="action-btn edit-btn" type="button">
              <img src="./images/icon-edit.svg" alt="Edit icon" />
              <span>Edit</span>
            </button>
            `
                : `
            <button class="action-btn reply-btn" type="button">
            <img src="./images/icon-reply.svg" alt="Reply icon" />
            <span>Reply</span>
            </button>
            `
            }
          </div>
        </div>
    `;
  }
}

export default new CommentView();
