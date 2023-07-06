"use strict";
import { test } from "./view.js";

console.log(test);

const commentsContainerEl = document.querySelector(".all-comments-container");

const dataJson = await fetch("./json/data.json")
  .then((res) => res.json())
  .then((data) => {
    return data;
  });

console.log(dataJson.comments);

let allComments = dataJson.comments;

const createComment = function (data) {
  const markup = `
  <div class="each-comment">
  <div class="main-comment comment">
    <div class="comment-user">
      <div class="avater">
        <img
          src="${data.user.image.png}"
          alt="${data.user.username}'s photo"
        />
      </div>
      <p class="username">${data.user.username}</p>
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
      <button class="action-btn" type="button">
        <img src="./images/icon-reply.svg" alt="Reply icon" />
        <span>Reply</span>
      </button>
    </div>
  </div>
</div>

    `;

  //   console.log(data);

  const comment = document.querySelector(".each-comment");

  if (data.replies.length === 0) {
    commentsContainerEl.insertAdjacentHTML("afterbegin", markup);
  } else {
    commentsContainerEl.insertAdjacentHTML("afterbegin", markup);
    const allRepliedComments = data.replies;

    for (let i = 0; i < allRepliedComments.length; i++) {
      const cur = allRepliedComments[i];

      const markup2 = `
    <div class="replied-comment-container">
        <div class="replied-comment">
          <div class="comment">
            <div class="comment-user">
              <div class="avater">
                <img
                  src="${cur.user.image.png}"
                  alt="${cur.user.username}'s photo"
                />
              </div>
              <p class="username">${cur.user.username}</p>
              <p class="created-at">${cur.createdAt}</p>
            </div>

            <p class="comment-content">
              <span class="to-replied-username">@${cur.replyingTo}</span> ${cur.content}
            </p>

            <div class="comment-votting">
              <button class="btn-plus btn-votting" type="button">
                <img src="./images/icon-plus.svg" alt="Plus icon" />
              </button>

              <p class="score">${cur.score}</p>

              <button class="btn-minus btn-votting" type="button">
                <img src="./images/icon-minus.svg" alt="Minus icon" />
              </button>
            </div>

            <div class="comment-actions">
              <button class="action-btn" type="button">
                <img src="./images/icon-reply.svg" alt="Reply icon" />
                <span>Reply</span>
              </button>
            </div>
          </div>
        </div>
            `;

      comment.insertAdjacentHTML("afterbegin", markup2);
    }
  }
};

for (let i = 0; i < allComments.length; i++) {
  const cur = allComments[i];

  createComment(cur);
}
