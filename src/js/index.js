"use strict";
import writeMainCommentView from "./views/writeMainCommentView.js";
import * as model from "./model.js";

const controlWriteMainComment = function () {
  try {
    //Getting the new comment content
    const comment = writeMainCommentView.getComment();
    if (!comment) return;

    //Storing comment data
    model.storeComment(comment);

    //Rendering comment
  } catch (err) {
    console.log(err);
  }
};

// console.log(await model.loadComment());

const init = function () {
  writeMainCommentView.addHandlerMainComment(controlWriteMainComment);
};

init();

//////////////////////////
//////////////////////////
//////////////////////////
// const commentsContainerEl = document.querySelector(".all-comments-container");

// const dataJson = async () => {
//   try {
//     const response = await fetch("./json/data.json");
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw error;
//   }
// };

// const test = await dataJson();
// console.log(test);

// let allComments = await dataJson().then((data) => {
//   return data.comments;
// });

// console.log(allComments);

// const createComment = function (data) {
//   const markup = `
//   <div class="each-comment">
//   <div class="main-comment comment">
//     <div class="comment-user">
//       <div class="avater">
//         <img
//           src="${data.user.image.png}"
//           alt="${data.user.username}'s photo"
//         />
//       </div>
//       <p class="username">${data.user.username}</p>
//       <p class="created-at">${data.createdAt}</p>
//     </div>

//     <p class="comment-content">
//       ${data.content}
//     </p>

//     <div class="comment-votting">
//       <button class="btn-plus btn-votting" type="button">
//         <img src="./images/icon-plus.svg" alt="Plus icon" />
//       </button>

//       <p class="score">${data.score}</p>

//       <button class="btn-minus btn-votting" type="button">
//         <img src="./images/icon-minus.svg" alt="Minus icon" />
//       </button>
//     </div>

//     <div class="comment-actions">
//       <button class="action-btn" type="button">
//         <img src="./images/icon-reply.svg" alt="Reply icon" />
//         <span>Reply</span>
//       </button>
//     </div>
//   </div>
// </div>

//     `;

//   //   console.log(data);

//   const comment = document.querySelector(".each-comment");

//   if (data.replies.length === 0) {
//     commentsContainerEl.insertAdjacentHTML("afterbegin", markup);
//   } else {
//     commentsContainerEl.insertAdjacentHTML("afterbegin", markup);
//     const allRepliedComments = data.replies;

//     for (let i = 0; i < allRepliedComments.length; i++) {
//       const cur = allRepliedComments[i];

//       const markup2 = `
//     <div class="replied-comment-container">
//         <div class="replied-comment">
//           <div class="comment">
//             <div class="comment-user">
//               <div class="avater">
//                 <img
//                   src="${cur.user.image.png}"
//                   alt="${cur.user.username}'s photo"
//                 />
//               </div>
//               <p class="username">${cur.user.username}</p>
//               <p class="created-at">${cur.createdAt}</p>
//             </div>

//             <p class="comment-content">
//               <span class="to-replied-username">@${cur.replyingTo}</span> ${cur.content}
//             </p>

//             <div class="comment-votting">
//               <button class="btn-plus btn-votting" type="button">
//                 <img src="./images/icon-plus.svg" alt="Plus icon" />
//               </button>

//               <p class="score">${cur.score}</p>

//               <button class="btn-minus btn-votting" type="button">
//                 <img src="./images/icon-minus.svg" alt="Minus icon" />
//               </button>
//             </div>

//             <div class="comment-actions">
//               <button class="action-btn" type="button">
//                 <img src="./images/icon-reply.svg" alt="Reply icon" />
//                 <span>Reply</span>
//               </button>
//             </div>
//           </div>
//         </div>
//             `;

//       comment.insertAdjacentHTML("afterbegin", markup2);
//     }
//   }
// };

// for (let i = 0; i < allComments.length; i++) {
//   const cur = allComments[i];

//   createComment(cur);
// }
