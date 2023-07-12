import MainView from "./mainView.js";

class EditField extends MainView {
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
}

export default new EditField();
