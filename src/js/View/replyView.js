class ReplyView {
  _allCommentContainer = document.querySelector(".all-comments-container");

  //////////////////////////////
  addHandlerReplyBtn(handler) {
    this._allCommentContainer.addEventListener("click", function (e) {
      const btn = e.target.closest(".reply-btn");
      if (!btn) return;

      btn.classList.remove("reply-btn");
      const id = e.target.closest(".comment-wrapper").dataset.id;
      handler(id, false, false);
    });
  }

  async renderReplyField(id, data) {
    const wrapper = document.querySelector(`.key${id}`);
    const markup = await this.generateReplyFieldMarkup(data);
    wrapper.insertAdjacentHTML("beforeend", markup);

    const cancelBtn = wrapper.querySelector(".cancel-reply");
    cancelBtn.addEventListener("click", function () {
      const btnReply = wrapper.querySelector(".action-btn");
      btnReply.classList.add("reply-btn");
      wrapper.querySelector(".reply-comment").remove();
    });
  }

  async generateReplyFieldMarkup(data) {
    return `
        <div class="write-comment reply-comment">
          <div class="write-comment-avater">
                <img
                    src="${data.image.png}"
                    alt="${data.username}'s photo"
                />
                </div>

                <textarea
                class="write-comment-field"
                rows="3"
                placeholder="Add a comment..."
                ></textarea>

                <div class="reply-footer-buttons">
                  <button class="cancel-reply" type="button">Cancel</button>
                  <button class="write-comment-btn submit-reply" type="button">Reply</button>
                </div>
          </div>
        </div>
        `;
  }

  //////////////
  //Submit funtionality

  addHandlerSubmitReply(handler) {
    this._allCommentContainer.addEventListener("click", function (e) {
      const btn = e.target.closest(".submit-reply");
      if (!btn) return;

      const parentEl = e.target.closest(".comment-wrapper");
      const repliedToId = parentEl.dataset.id;
      const mainComment = parentEl.parentElement.className === "each-comment";
      let parentId = false;

      if (!mainComment)
        parentId = parentEl.parentElement.previousElementSibling.dataset.id;

      const comment = parentEl.querySelector(".write-comment-field").value;

      const btnReply = parentEl.querySelector(".action-btn");
      btnReply.classList.add("reply-btn");
      parentEl.querySelector(".reply-comment").remove();

      handler(repliedToId, comment, parentId);
    });
  }
}

export default new ReplyView();
