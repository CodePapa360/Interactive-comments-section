"use strict";
import commentView from "./commentView.js";
import * as model from "./model.js";

const controlNewComment = function () {
  try {
    //Getting the new comment content
    const comment = commentView.getNewComment();
    if (!comment) return;

    //Storing comment data
    model.storeComment(comment);

    commentView.renderNewComment(model.getNewCommentData());
  } catch (err) {
    console.log(err);
  }
};

///////////////////
//Edit controlling
const controlEditComment = function (id) {
  const editInfo = model.getEditInfo(id);
  commentView.renderEditingField(editInfo);
};

///////////////////
//Updating controlling
const controlUpdateComment = function (id, updatedComment) {
  const updatedData = model.getUpdatedComment(id, updatedComment);

  commentView.renderUpdatedComment(updatedData);
};

const init = function () {
  commentView.addHandlerNewComment(controlNewComment);
  commentView.addHandlerEdit(controlEditComment);
  commentView.addHandlerUpdate(controlUpdateComment);
};

init();

///////////////////////////////
// const controlWriteMainComment = function () {
//   try {
//     //Getting the new comment content
//     const comment = writeMainCommentView.getComment();
//     if (!comment) return;

//     //Storing comment data
//     model.storeComment(comment);

//     //Rendering comment
//     mainCommentView.renderComment(model.getCommentData());
//   } catch (err) {
//     console.log(err);
//   }
// };

// ///////////////////
// const controlEditComment = function (id) {
//   mainCommentView.renderEditComment(model.getEditInfo(id));
// };
// /////////////////
// const controlUpdateComment = function (data) {
//   model.storeComment(data);

//   mainCommentView.renderComment(model.getCommentData());
// };
// ////////////////////
// const contrlDelete = function () {
//   mainCommentView.renderModal();
// };

// const init = function () {
//   writeMainCommentView.addHandlerMainComment(controlWriteMainComment);
//   mainCommentView.addHandlerEdit(controlEditComment);
//   mainCommentView.addHandlerUpdate(controlUpdateComment);
//   mainCommentView.addHandlerDelete(contrlDelete);
// };

// init();
