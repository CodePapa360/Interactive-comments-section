import { formatDate } from "./helpers.js";
import { getUniqueId } from "./helpers.js";

const JsonPath = "./json/data.json";
const data = await fetch(JsonPath).then((res) => res.json());
const currentUser = await data.currentUser;
const date = new Date();

const allComments = [];
let currentState;

export const storeComment = async function (comment) {
  try {
    const mainCommentObject = {
      content: comment,
      createdAt: date,
      id: getUniqueId(),
      score: 0,
      user: {
        image: {
          png: currentUser.image.png,
          webp: currentUser.image.webp,
        },
        username: currentUser.username,
      },
      replies: [],
    };

    currentState = mainCommentObject;

    return allComments.push(mainCommentObject);
  } catch (err) {
    console.error(`${err} 💥💥💥`);
    throw err;
  }
};

export const getNewCommentData = function () {
  const data = {
    ...currentState,
    createdAt: formatDate(new Date(currentState.createdAt)),
  };

  return data;
};

export const getEditInfo = function (id) {
  const targetComment = allComments.find((com) => com.id === +id);
  const data = {
    ...targetComment,
    createdAt: formatDate(new Date(targetComment.createdAt)),
  };
  return data;
};

export const getUpdatedComment = function (id, updatedComment) {
  const targetComment = allComments.find((com) => com.id === +id);
  targetComment.content = updatedComment;
  const updated = {
    ...targetComment,
    content: updatedComment,
    createdAt: formatDate(new Date(targetComment.createdAt)),
  };

  return updated;
};
