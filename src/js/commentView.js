class CommentView {
  _allCommentContainer = document.querySelector(".all-comments-container");
  _newCommentInputEl = document.querySelector(".new-comment");

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

    const markup = this.generateSelfCommentMarkup(data);
    parentEl.innerHTML = markup;
  }

  ////////////////////
  //Editting funtionality
  addHandlerEdit(handler) {
    this._allCommentContainer.addEventListener("click", function (e) {
      const btn = e.target.closest(".edit-btn");
      if (!btn) return;

      const id = e.target.closest(".comment-wrapper").dataset.id;
      handler(id);
    });
  }

  renderEditingField(data) {
    const wrapper = document.querySelector(`.key${data.id}`);

    wrapper.innerHTML = this.generateEditFieldMarkup(data);
  }

  generateEditFieldMarkup(data) {
    return `
    <div class="update-comment">
      <div class="comment">
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

        <textarea
          class="comment-content"
          rows="3"
          placeholder="Update your comment..."
        >${data.content}</textarea>

        <button class="write-comment-btn update-btn" type="button">Update</button>

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

          <button disabled class="action-btn edit-btn" type="button">
            <img src="./images/icon-edit.svg" alt="Edit icon" />
            <span>Edit</span>
          </button>
        </div>
      </div>
    </div>
    `;
  }

  /////////////////////
  // Render new commnet
  renderNewComment(data) {
    const markup = this.generateSelfCommentMarkup(data);
    this._allCommentContainer.insertAdjacentHTML("beforeend", markup);
  }

  generateSelfCommentMarkup(data) {
    return `
    <div class="each-comment">
      <div data-id="${data.id}" class="key${data.id} comment-wrapper">
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
    </div>
    `;
  }

  //////////////////
  // writing new comment
  getNewComment() {
    const query = this._newCommentInputEl.querySelector(
      ".write-main-comment-field"
    ).value;

    this._clearInput();
    return query;
  }

  _clearInput() {
    this._newCommentInputEl.querySelector(".write-main-comment-field").value =
      "";
  }

  addHandlerNewComment(handler) {
    const btnSend = this._newCommentInputEl.querySelector(
      ".write-main-comment-btn"
    );

    btnSend.addEventListener("click", function () {
      handler();
    });
  }
}

export default new CommentView();
