// const dataJson = async () => {
//   try {
//     const response = await fetch("./json/data.json");
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw error;
//   }
// };

const JsonPath = "./json/data.json";
const data = await fetch(JsonPath).then((res) => res.json());
const currentUser = await data.currentUser;
const date = new Date();

const allComments = [];

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

    return allComments.push(mainCommentObject), console.log(allComments);
  } catch (err) {
    console.error(`${err} 💥💥💥`);
    throw err;
  }
};
