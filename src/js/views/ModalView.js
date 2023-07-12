import MainView from "./mainView.js";

class ModalView extends MainView {
  addHandlerDeleteBtn(handler) {
    this._allCommentContainer.addEventListener("click", function (e) {
      const btn = e.target.closest(".delete-btn");
      if (!btn) return;

      const id = e.target.closest(".comment-wrapper").dataset.id;
      handler(id);
    });
  }

  attachModalEventListeners(id, handler) {
    const overlay = document.querySelector(".overlay");
    const modal = document.querySelector(".modal");
    const btnNo = document.querySelector(".btn-no");
    const btnYes = document.querySelector(".btn-yes");

    const handleNoButtonClick = () => {
      overlay.remove();
      modal.remove();
    };

    const handleYesButtonClick = () => {
      handler(id);
      overlay.remove();
      modal.remove();
    };

    btnNo.addEventListener("click", handleNoButtonClick);
    btnYes.addEventListener("click", handleYesButtonClick);
  }

  deleteCommentFromDOM(id) {
    const dom = this._allCommentContainer.querySelector(`.key${id}`);
    if (dom) dom.closest(".each-comment").remove();
  }

  renderModal(id, handler) {
    const markup = `
          <div class="overlay"></div>
          <div class="modal">
            <h1>Delete comment</h1>
            <p>
              Are you sure you want to delete this comment? This will remove the comment
              and can't be undone.
            </p>
            <div class="modal-btns-container">
              <button class="modal-btn btn-no">No, cancel</button>
              <button class="modal-btn btn-yes">Yes, delete</button>
            </div>
          </div>
        `;

    this._body.insertAdjacentHTML("afterbegin", markup);
    this.attachModalEventListeners(id, handler);
  }
}

export default new ModalView();
