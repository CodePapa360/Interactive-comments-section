export default class MainView {
  _allCommentContainer = document.querySelector(".all-comments-container");
  _body = document.querySelector("body");

  addHandlerVotting(handler) {
    this._allCommentContainer.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn-votting");
      if (!btn) return;

      const parentEl = e.target.closest(".comment-wrapper");
      const vote = btn.dataset.vote;
      const id = parentEl.dataset.id;

      handler(id, vote);
    });
  }
}
