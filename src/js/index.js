"use strict";
import commentView from "./views/commentView.js";
import * as model from "./model.js";
import writeNewCommentView from "./views/writeNewCommentView.js";
import editView from "./views/editView.js";
import ModalView from "./views/ModalView.js";

const controlNewComment = function () {
  try {
    //Getting the new comment content
    const comment = writeNewCommentView.getNewComment();
    if (!comment) return;

    //Storing comment data
    model.storeComment(comment);

    commentView.renderNewSelfComment(model.getNewCommentData());
  } catch (err) {
    console.log(err);
  }
};

///////////////////
//Edit controlling
const controlEditComment = function (id) {
  const editInfo = model.getEditInfo(+id);
  editView.renderEditingField(editInfo);
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
  ModalView.renderModal(id, deleteCommentHandler);
};

const deleteCommentHandler = function (id) {
  model.deleteComment(+id);
  ModalView.deleteCommentFromDOM(id);
};

/////////////////
//Votting
const controlVotting = function (id, vote) {
  const score = model.vote(+id, vote);
  commentView.renderScore(id, score);
};

const init = function () {
  writeNewCommentView.addHandlerNewComment(controlNewComment);
  editView.addHandlerEdit(controlEditComment);
  commentView.addHandlerUpdate(controlUpdateComment);
  ModalView.addHandlerDeleteBtn(controlDeleteBtn);
  commentView.addHandlerVotting(controlVotting);
};

init();

//Some styling
const contai = document.querySelector(".container");
const footer = document.querySelector("footer").scrollHeight;
contai.style.minHeight = `calc(100vh - 2.5rem - ${footer}px)`;
