class EditView {
  _allCommentContainer = document.querySelector(".all-comments-container");

  addHandlerEditBtn(handler) {
    this._allCommentContainer.addEventListener("click", function (e) {
      const btn = e.target.closest(".edit-btn");
      if (!btn) return;

      const parentEl = e.target.closest(".comment-wrapper");
      const mainId = parentEl.dataset.id;
      const mainComment = parentEl.parentElement.className === "each-comment";
      let parentId = false;

      if (!mainComment)
        parentId = parentEl.parentElement.previousElementSibling.dataset.id;

      handler(parentId, mainId, false);
    });
  }

  addHandlerUpdateBtn(handler) {
    this._allCommentContainer.addEventListener("click", function (e) {
      const btn = e.target.closest(".update-btn");
      if (!btn) return;

      const parentEl = e.target.closest(".comment-wrapper");
      const mainId = parentEl.dataset.id;
      const mainComment = parentEl.parentElement.className === "each-comment";
      let parentId = false;
      if (!mainComment)
        parentId = parentEl.parentElement.previousElementSibling.dataset.id;

      const comment = parentEl.querySelector(".comment-content").value;

      handler(parentId, mainId, comment);
    });
  }

  renderEditingField(data) {
    const wrapper = document.querySelector(`.key${data.id}`);

    wrapper.innerHTML = this.generateEditFieldMarkup(data);
  }

  generateEditFieldMarkup(data) {
    return `
          <div class="update-comment comment">
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
    
            <div class="comment-voting">
              <button class="btn-plus btn-voting" type="button">
                <img src="./images/icon-plus.svg" alt="Plus icon" />
              </button>
    
              <p class="score">${data.score}</p>
    
              <button class="btn-minus btn-voting" type="button">
                <img src="./images/icon-minus.svg" alt="Minus icon" />
              </button>
            </div>
    
            <div class="comment-actions">
              <button class="action-btn delete-btn" type="button">
                <img src="./images/icon-delete.svg" alt="Delete icon" />
                <span>Delete</span>
              </button>
    
              <button disabled="true" class="action-btn edit-btn" type="button">
                <img src="./images/icon-edit.svg" alt="Edit icon" />
                <span>Edit</span>
              </button>
            </div>
          </div>
        `;
  }
}

export default new EditView();
