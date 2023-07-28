"use strict";
import * as model from "./model.js";
import uiComment from "./uiView/uiComment.js";
import uiNewComment from "./uiView/uiNewComment.js";
import uiReply from "./uiView/uiReply.js";
// import commentView from "./views/commentView.js";
// import writeNewCommentView from "./views/writeNewCommentView.js";
// import editFieldView from "./views/editFieldView.js";
// import ModalView from "./views/ModalView.js";
// import replyFieldView from "./views/replyView.js";
// import replyView from "./views/replyView.js";

const controlNewComment = async function () {
  try {
    //Getting the new comment content
    const comment = uiNewComment.getNewComment();
    if (!comment) return;

    //Storing comment data
    const storedComment = await model.storeComment(false, comment, false);

    uiComment.renderMainComment(storedComment);
  } catch (err) {
    console.log(err);
  }
};

// ///////////////////////
//Reply button control
const controlReplyComment = async function (repliedToId, comment, parentId) {
  if (!comment) {
    const replyInfo = model.getReplyUserInfo();
    uiReply.renderReplyField(repliedToId, replyInfo);
    return;
  }

  console.log(repliedToId, comment, parentId);

  const storedReply = await model.storeComment(
    +repliedToId,
    comment,
    +parentId
  );

  uiComment.renderRepliedComment(storedReply);
};

///////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////

// ///////////////////
// //Edit controlling
// const controlEditComment = function (id) {
//   const editInfo = model.getEditInfo(+id);
//   editFieldView.renderEditingField(editInfo);
// };

// ///////////////////
// //Updating controlling
// const controlUpdateComment = function (id, updatedComment) {
//   const updatedData = model.getUpdatedComment(+id, updatedComment);

//   commentView.renderUpdatedComment(updatedData);
// };

// // ////////////////
// // delete button
// const controlDeleteBtn = function (id) {
//   ModalView.renderModal(id, deleteCommentHandler);
// };

// const deleteCommentHandler = function (id) {
//   model.deleteComment(+id);
//   ModalView.deleteCommentFromDOM(id);
// };

// /////////////////
// //Votting
// const controlVotting = function (id, vote) {
//   const score = model.vote(+id, vote);
//   // commentView.renderScore(id, score);
// };

// ///////////////////////
// //Reply button control
// const controlReplyComment = async function (id) {
//   const replyInfo = await model.getReplyInfo();
//   replyFieldView.renderReplyField(id, replyInfo);
// };

// const controlSubmitReplyComment = async function (id, repliedComment) {
//   // console.log(id, repliedComment);
//   const storeReply = await model.submitReply(+id, repliedComment);
//   // console.log(storeReply);
//   replyView.renderReply(storeReply);
// };

const init = function () {
  uiNewComment.addHandlerNewComment(controlNewComment);
  // editFieldView.addHandlerEdit(controlEditComment);
  // commentView.addHandlerUpdate(controlUpdateComment);
  // ModalView.addHandlerDeleteBtn(controlDeleteBtn);
  // commentView.addHandlerVotting(controlVotting);
  uiReply.addHandlerReplyBtn(controlReplyComment);
  uiReply.addHandlerSubmitReply(controlReplyComment);
};

init();
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

const loadMainComment = function (data) {
  // 1. store data to model and the returned object should have a property wheather it is self or not
  const returnedData = model.processMainComment(data);

  // 2. render data to the ui and that function should render  based on slef or else comment
  uiComment.renderMainComment(returnedData);
};

const loadRepliedComment = function (data, parentId) {
  // 1. store data to the model and it will store the comment based on the parentComment (id args) and return wheather it is self or not property and also a property tells if it's the first reply or not.
  const returnedData = model.processRepliedComment(data, parentId);

  // 2. render data to the ui and that function should render based on slef or else comment and create container based on the "needContainer" property.
  uiComment.renderRepliedComment(returnedData);
};

const controlLoad = async function () {
  const jsonData = await model.load();
  const { comments } = await jsonData;

  for (let i = 0; i < comments.length; i++) {
    const curMainCom = comments[i];
    loadMainComment(curMainCom);

    if (curMainCom.replies.length > 0) {
      const replies = curMainCom.replies;

      for (let j = 0; j < replies.length; j++) {
        const curReply = replies[j];
        loadRepliedComment(curReply, curMainCom.id);
      }
    }
  }
};

controlLoad();

//Some styling
const contai = document.querySelector(".container");
const footer = document.querySelector("footer").scrollHeight;
contai.style.minHeight = `calc(100vh - 2.5rem - ${footer}px)`;
