import { mcAssets, mcData } from "./mcdata.ts";

type itemImage = {
  image: string;
  height: number;
  width: number;
};

type Block = {
  id: number;
  name: string;
  display_name: string;
  stack_size: number;
  image: itemImage | null;
};

const excludedItems = ["air"];

const getIsExcludedItem = (name: string): boolean => {
  return excludedItems.includes(name);
};

export default function getItems(): Block[] {
  return Object.values(mcData.items)
    .map((item) => {
      return {
        id: item.id,
        name: item.name,
        display_name: item.displayName,
        stack_size: item.stackSize,
        image: getItemTexture(item.name),
      };
    })
    .filter((item) => !getIsExcludedItem(item.name));
}

export const getItemByName = (name: string): Block | null => {
  if (getIsExcludedItem(name)) {
    return null;
  }

  const item = mcData.itemsByName[name];

  if (!item) {
    return null;
  }

  return {
    id: item.id,
    name: item.name,
    display_name: item.displayName,
    stack_size: item.stackSize,
    image: getItemTexture(item.name),
  };
};

const FORMAT_SEARCH = "png";

export const getItemTexture = (name: string): itemImage | null => {
  if (getIsExcludedItem(name)) {
    return null;
  }

  const textureName = mcAssets.getTexture(name)?.replace("minecraft:", "");

  if (!textureName) {
    return null;
  }

  const texture =
    "https://raw.githubusercontent.com/rom1504/minecraft-assets/master/data/1.20.2/" +
    textureName +
    `.${FORMAT_SEARCH}`;

  return {
    image: texture,
    height: 16,
    width: 16,
  };
};