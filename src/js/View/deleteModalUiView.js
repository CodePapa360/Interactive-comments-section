class DeleteModalView {
  _allCommentContainer = document.querySelector(".all-comments-container");
  _body = document.querySelector("body");

  addHandlerDeleteBtn(handler) {
    this._allCommentContainer.addEventListener("click", function (e) {
      const btn = e.target.closest(".delete-btn");
      if (!btn) return;

      const parentEl = e.target.closest(".comment-wrapper");
      const mainId = parentEl.dataset.id;
      const mainComment = parentEl.parentElement.className === "each-comment";
      let parentId = false;

      if (!mainComment)
        parentId = parentEl.parentElement.previousElementSibling.dataset.id;

      handler(parentId, mainId);
    });
  }

  attachModalEventListeners(parentId, mainId, handler) {
    const overlay = document.querySelector(".overlay");
    const modal = document.querySelector(".modal");
    const btnNo = document.querySelector(".btn-no");
    const btnYes = document.querySelector(".btn-yes");

    const handleNoButtonClick = () => {
      fading();

      setTimeout(() => {
        overlay.remove();
        modal.remove();
        this._body.style.overflow = null;
      }, 200);
    };

    const handleYesButtonClick = () => {
      fading();

      setTimeout(() => {
        handler(parentId, mainId);
        overlay.remove();
        modal.remove();
        this._body.style.overflow = null;
      }, 200);
    };

    btnNo.addEventListener("click", handleNoButtonClick);
    overlay.addEventListener("click", handleNoButtonClick);
    btnYes.addEventListener("click", handleYesButtonClick);

    const fading = function () {
      overlay.classList.toggle("hide");
      modal.classList.toggle("hide");
    };

    setTimeout(() => {
      fading();
    }, 10);
  }

  renderModal(parentId, mainId, handler) {
    const markup = `
            <div class="overlay hide"></div>
            <div class="modal hide">
              <h1>Delete comment</h1>
              <p>
                Are you sure you want to delete this comment? This will remove the comment and can't be undone.
              </p>
              <div class="modal-btns-container">
                <button class="modal-btn btn-no">No, cancel</button>
                <button class="modal-btn btn-yes">Yes, delete</button>
              </div>
            </div>
          `;

    this._body.insertAdjacentHTML("afterbegin", markup);
    this.attachModalEventListeners(parentId, mainId, handler);

    this._body.style.overflow = "hidden";
  }

  deleteCommentFromDOM(parentId, mainId) {
    const dom = this._allCommentContainer.querySelector(`.key${mainId}`);

    if (!parentId) {
      if (dom) dom.closest(".each-comment").remove();
      return;
    }

    dom.remove();
  }
}

export default new DeleteModalView();
