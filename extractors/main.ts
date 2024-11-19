import getItems, { getItemTexture } from "./src/getItems.ts";

const itemsCheckImage = ["acacia_boat", "bamboo"];

itemsCheckImage.forEach((item) => {
  const image = getItemTexture(item);

  console.log(image);
});
