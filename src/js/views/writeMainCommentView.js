class WriteMainComment {
  _parentElement = document.querySelector(".new-comment");

  getComment() {
    const query = this._parentElement.querySelector(
      ".write-main-comment-field"
    ).value;

    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentElement.querySelector(".write-main-comment-field").value = "";
  }

  addHandlerMainComment(handler) {
    const btnSend = this._parentElement.querySelector(
      ".write-main-comment-btn"
    );

    btnSend.addEventListener("click", function () {
      handler();
    });
  }
}

export default new WriteMainComment();
