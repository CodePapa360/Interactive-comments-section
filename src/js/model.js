import { formatDate } from "./helpers.js";
import { getUniqueId } from "./helpers.js";

const JsonPath = "./json/data.json";
const jsonData = await fetch(JsonPath).then((res) => res.json());

const allData = {
  currentUser: null,
  comments: [],
};

allData.currentUser = {
  ...(await jsonData.currentUser),
  votted: {},
};

let currentState;
console.log(allData.currentUser);
export const storeComment = async function (comment) {
  try {
    const mainCommentObject = {
      content: comment,
      createdAt: new Date(),
      id: getUniqueId(),
      score: 0,
      user: {
        image: {
          png: allData.currentUser.image.png,
          webp: allData.currentUser.image.webp,
        },
        username: allData.currentUser.username,
      },
      replies: [],
    };

    currentState = mainCommentObject;

    return allData.comments.push(mainCommentObject);
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
  const targetComment = allData.comments.find((com) => com.id === id);
  const data = {
    ...targetComment,
    createdAt: formatDate(new Date(targetComment.createdAt)),
  };
  return data;
};

export const getUpdatedComment = function (id, updatedComment) {
  const targetComment = allData.comments.find((com) => com.id === id);
  targetComment.content = updatedComment;
  const updated = {
    ...targetComment,
    content: updatedComment,
    createdAt: formatDate(new Date(targetComment.createdAt)),
  };

  return updated;
};

export const deleteComment = function (id) {
  const index = allData.comments.findIndex((com) => com.id === id);
  if (index !== -1) {
    return allData.comments.splice(index, 1);
  }
};

export const vote = function (id, vote) {
  allData.currentUser.votted[id] = vote;
  const hasVot = allData.currentUser.votted[id];
  console.log(id, vote);
  console.log(hasVot);
};
