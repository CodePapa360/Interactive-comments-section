import { formatDate } from "./helpers.js";
import { getUniqueId } from "./helpers.js";

const allData = {
  currentUser: null,
  comments: [],
};

export const load = async function () {
  const localStorageData = localStorage.getItem("allData");
  const JsonPath = "./json/data.json";

  if (localStorageData) {
    const jsonData = JSON.parse(localStorageData);
    const { currentUser, comments, voted } = jsonData;

    allData.currentUser = currentUser;
    allData.comments = comments;
    allData.voted = voted;

    return jsonData;
  } else {
    const jsonData = await fetch(JsonPath).then((res) => res.json());
    const currentUser = { ...jsonData.currentUser, voted: {} };

    allData.currentUser = currentUser;
    allData.comments = jsonData.comments;
    updateStorage();

    return jsonData;
  }
};

const updateStorage = function () {
  localStorage.setItem("allData", JSON.stringify(allData));
};

//////////////////////////////
//////////////////////////////
export const getScore = function (parentId, mainId, vote) {
  const hasVot = allData.currentUser.voted.hasOwnProperty(mainId);
  let targetComment;

  if (!parentId) {
    targetComment = allData.comments.find((com) => com.id === mainId);
  } else {
    const targetParent = allData.comments.find((cmt) => cmt.id === parentId);
    targetComment = targetParent.replies.find((cmt) => cmt.id === mainId);
  }

  if (!hasVot) {
    allData.currentUser.voted[mainId] = vote;

    if (vote === "up") {
      targetComment.score += 1;
      updateStorage();
      return targetComment.score;
    }

    if (vote === "down") {
      targetComment.score -= 1;
      updateStorage();
      return targetComment.score;
    }
  }

  const prevVote = allData.currentUser.voted[mainId];

  if (prevVote === vote) {
    updateStorage();
    return targetComment.score;
  }

  if (vote === "up") {
    allData.currentUser.voted[mainId] = vote;
    targetComment.score += 2;
    updateStorage();
    return targetComment.score;
  }

  if (vote === "down") {
    allData.currentUser.voted[mainId] = vote;
    targetComment.score -= 2;
    updateStorage();
    return targetComment.score;
  }
};

////////////////////////////
///////////////////////////

export const processMainComment = function (data) {
  return {
    ...data,
    createdAt: formatDate(data.createdAt),
    me: data.user.username === allData.currentUser.username ? true : false,
  };
};

export const processRepliedComment = function (data, parentId) {
  return {
    ...data,
    createdAt: formatDate(data.createdAt),
    me: data.user.username === allData.currentUser.username ? true : false,
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
      updateStorage();
      return processMainComment(commentObject);
    }

    if (!parentId) {
      const targetComment = allData.comments.find(
        (cmt) => cmt.id === repliedToId
      );

      commentObject.replyingTo = targetComment.user.username;
      targetComment.replies.push(commentObject);
      updateStorage();
      return processRepliedComment(commentObject, repliedToId);
    }

    const targetParent = allData.comments.find((cmt) => cmt.id === parentId);
    const targetUser = targetParent.replies.find(
      (cmt) => cmt.id === repliedToId
    ).user.username;

    commentObject.replyingTo = targetUser;
    targetParent.replies.push(commentObject);
    updateStorage();
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

// Edit funtionality
export const getEditCommentData = function (parentId, mainId) {
  if (!parentId) {
    const targetComment = allData.comments.find((cmt) => cmt.id === mainId);

    return {
      ...targetComment,
      createdAt: formatDate(targetComment.createdAt),
    };
  }

  //
  const targetParent = allData.comments.find((cmt) => cmt.id === parentId);
  const targetComment = targetParent.replies.find((cmt) => cmt.id === mainId);

  return {
    ...targetComment,
    createdAt: formatDate(targetComment.createdAt),
  };
};

//Updating comment
export const getUpdatedCommentData = function (parentId, mainId, comment) {
  if (!parentId) {
    const targetComment = allData.comments.find((com) => com.id === mainId);
    targetComment.content = comment;
    updateStorage();

    return {
      ...targetComment,
      createdAt: formatDate(targetComment.createdAt),
      me: true,
    };
  }

  const targetParent = allData.comments.find((cmt) => cmt.id === parentId);
  const targetComment = targetParent.replies.find((cmt) => cmt.id === mainId);

  targetComment.content = comment;
  updateStorage();

  return {
    ...targetComment,
    createdAt: formatDate(targetComment.createdAt),
    me: true,
  };
};

//Delete comment
export const deleteComment = function (parentId, mainId) {
  if (!parentId) {
    const index = allData.comments.findIndex((com) => com.id === mainId);
    allData.comments.splice(index, 1);
    updateStorage();
    return;
  }

  const targetParent = allData.comments.find((cmt) => cmt.id === parentId);
  const index = targetParent.replies.findIndex((cmt) => cmt.id === mainId);

  targetParent.replies.splice(index, 1);
  updateStorage();
  return;
};
