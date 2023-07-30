class ScoreView {
  _allCommentContainer = document.querySelector(".all-comments-container");

  addHandlerVoting(handler) {
    this._allCommentContainer.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn-voting");
      if (!btn) return;

      const parentEl = e.target.closest(".comment-wrapper");
      const mainId = parentEl.dataset.id;
      const mainComment = parentEl.parentElement.className === "each-comment";
      let parentId = false;
      if (!mainComment)
        parentId = parentEl.parentElement.previousElementSibling.dataset.id;

      const vote = btn.dataset.vote;

      handler(parentId, mainId, vote);
    });
  }

  renderScore(id, score) {
    const parentEl = this._allCommentContainer.querySelector(`.key${id}`);
    const scoreEl = parentEl.querySelector(".score");
    scoreEl.textContent = score < 0 ? 0 : score;
  }
}

export default new ScoreView();
