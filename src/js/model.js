import { formatDate } from "./helpers.js";

const JsonPath = "./json/data.json";
const data = await fetch(JsonPath).then((res) => res.json());
const currentUser = await data.currentUser;
const date = new Date();

const allComments = [];

let tempState;

export const storeComment = async function (comment) {
  try {
    const mainCommentObject = {
      content: comment,
      createdAt: date,
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

    tempState = mainCommentObject;

    return allComments.push(mainCommentObject);
  } catch (err) {
    console.error(`${err} 💥💥💥`);
    throw err;
  }
};

export const getCommentData = function () {
  const data = {
    ...tempState,
    createdAt: formatDate(new Date(tempState.createdAt)),
  };

  return data;
};
