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
  const editInfo = model.getEditInfo(+id);
  commentView.renderEditingField(editInfo);
};

///////////////////
//Updating controlling
const controlUpdateComment = function (id, updatedComment) {
  const updatedData = model.getUpdatedComment(+id, updatedComment);

  commentView.renderUpdatedComment(updatedData);
};

// ////////////////
// delete button
const controlDeleteBtn = function (id) {
  commentView.renderModal(id, deleteCommentHandler);
};

const deleteCommentHandler = function (id) {
  model.deleteComment(+id);
  commentView.deleteCommentFromDOM(id);
};

const init = function () {
  commentView.addHandlerNewComment(controlNewComment);
  commentView.addHandlerEdit(controlEditComment);
  commentView.addHandlerUpdate(controlUpdateComment);
  commentView.addHandlerDeleteBtn(controlDeleteBtn);
};

init();
