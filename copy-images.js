const fs = require("fs-extra");

async function copyImages() {
  try {
    await fs.copy("./src/images", "./dist/images");
    console.log("Images copied successfully!");
  } catch (err) {
    console.error("Error while copying images:", err);
  }
}

copyImages();
