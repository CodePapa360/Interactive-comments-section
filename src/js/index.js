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

// console.log(await model.loadComment());

const init = function () {
  writeMainCommentView.addHandlerMainComment(controlWriteMainComment);
};

init();
