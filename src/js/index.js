"use strict";
import * as model from "./model.js";
import uiComment from "./uiView/uiComment.js";
import uiDeleteModal from "./uiView/uiDeleteModal.js";
import uiEdit from "./uiView/uiEdit.js";
import uiNewComment from "./uiView/uiNewComment.js";
import uiReply from "./uiView/uiReply.js";

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

// editing
const controlEditComment = function (parentId, mainId, comment) {
  if (!comment) {
    const editCommentData = model.getEditCommentData(+parentId, +mainId);

    uiEdit.renderEditingField(editCommentData);
    return;
  }

  const updatedComment = model.getUpdatedCommentData(
    +parentId,
    +mainId,
    comment
  );

  uiComment.renderUpdatedComment(updatedComment);
};

// Delete comment
const controlDeleteComment = function (parentId, mainId) {
  uiDeleteModal.renderModal(parentId, mainId, deleteCommentHandler);
};

const deleteCommentHandler = function (parentId, mainId) {
  model.deleteComment(+parentId, +mainId);
  uiDeleteModal.deleteCommentFromDOM(parentId, mainId);
};

///////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////

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
  uiEdit.addHandlerEditBtn(controlEditComment);
  uiEdit.addHandlerUpdateBtn(controlEditComment);
  uiDeleteModal.addHandlerDeleteBtn(controlDeleteComment);
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
  // 1. store data to model and the returned object should have a property wheather it is me or not
  const returnedData = model.processMainComment(data);

  // 2. render data to the ui and that function should render  based on slef or else comment
  uiComment.renderMainComment(returnedData);
};

const loadRepliedComment = function (data, parentId) {
  // 1. store data to the model and it will store the comment based on the parentComment (id args) and return wheather it is me or not property and also a property tells if it's the first reply or not.
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
