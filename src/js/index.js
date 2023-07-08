"use strict";
import writeMainCommentView from "./views/writeMainCommentView.js";
import * as model from "./model.js";
import mainCommentView from "./views/mainCommentView.js";

const controlWriteMainComment = function () {
  try {
    //Getting the new comment content
    const comment = writeMainCommentView.getComment();
    if (!comment) return;

    //Storing comment data
    model.storeComment(comment);

    //Rendering comment
    mainCommentView.renderComment(model.getCommentData());
  } catch (err) {
    console.log(err);
  }
};

///////////////////
const controlEditComment = function () {};

const init = function () {
  writeMainCommentView.addHandlerMainComment(controlWriteMainComment);
  mainCommentView.addHandlerEdit(controlEditComment);
};

init();
