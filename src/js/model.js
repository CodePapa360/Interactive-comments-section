import { formatDate } from "./helpers.js";
import { getUniqueId } from "./helpers.js";

const allData = {
  currentUser: null,
  comments: [],
};

export const load = async function () {
  const JsonPath = "./json/data.json";
  const jsonData = await fetch(JsonPath).then((res) => res.json());

  allData.currentUser = {
    ...(await jsonData.currentUser),
    votted: {},
  };

  allData.comments = jsonData.comments;

  return jsonData;
};
//////////////////////////////
//////////////////////////////

export const getEditInfo = function (id) {
  const targetComment = allData.comments.find((com) => com.id === id);
  const data = {
    ...targetComment,
    createdAt: formatDate(targetComment.createdAt),
  };
  return data;
};

export const getUpdatedComment = function (id, updatedComment) {
  const targetComment = allData.comments.find((com) => com.id === id);
  targetComment.content = updatedComment;
  const updated = {
    ...targetComment,
    content: updatedComment,
    createdAt: formatDate(targetComment.createdAt),
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

////////////////////////////
///////////////////////////

export const processMainComment = function (data) {
  return {
    ...data,
    createdAt: formatDate(data.createdAt),
    self: data.user.username === allData.currentUser.username ? true : false,
  };
};

export const processRepliedComment = function (data, parentId) {
  return {
    ...data,
    createdAt: formatDate(data.createdAt),
    self: data.user.username === allData.currentUser.username ? true : false,
    parentId: parentId,
  };
};
//////////////
export const storeComment = async function (repliedToId, comment, parentId) {
  try {
    const commentObject = {
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

    if (!repliedToId && !parentId) {
      allData.comments.push(commentObject);
      console.log("new");
      return processMainComment(commentObject);
    }

    if (!parentId) {
      const targetComment = allData.comments.find(
        (cmt) => cmt.id === repliedToId
      );

      commentObject.replyingTo = targetComment.user.username;
      targetComment.replies.push(commentObject);
      console.log("direct reply");
      return processRepliedComment(commentObject, repliedToId);
    }

    const targetParent = allData.comments.find((cmt) => cmt.id === parentId);
    const targetUser = targetParent.replies.find(
      (chCmt) => chCmt.id === repliedToId
    ).user.username;

    commentObject.replyingTo = targetUser;
    targetParent.replies.push(commentObject);
    console.log("replied reply");
    return processRepliedComment(commentObject, parentId);
  } catch (err) {
    console.error(`${err} 💥💥💥`);
    throw err;
  }
};

//Reply funtionality
export const getReplyUserInfo = function () {
  return allData.currentUser;
};
