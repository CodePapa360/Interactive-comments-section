class NewCommentView {
  _newCommentInputEl = document.querySelector(".new-comment");

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

export default new NewCommentView();
