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
  const hasVot = allData.currentUser.votted.hasOwnProperty(id);
  const targetComment = allData.comments.find((com) => com.id === id);

  if (!hasVot) {
    allData.currentUser.votted[id] = vote;

    if (vote === "up") {
      targetComment.score += 1;
      return targetComment.score;
    }

    if (vote === "down") {
      targetComment.score -= 1;
      return targetComment.score;
    }
  }

  const prevVote = allData.currentUser.votted[id];

  if (prevVote === vote) {
    return targetComment.score;
  }

  if (vote === "up") {
    allData.currentUser.votted[id] = vote;
    targetComment.score += 2;
    return targetComment.score;
  }

  if (vote === "down") {
    allData.currentUser.votted[id] = vote;
    targetComment.score -= 2;
    return targetComment.score;
  }
};
