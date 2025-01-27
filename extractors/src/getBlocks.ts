import { mcAssets, mcData } from "./mcdata.ts";

type BlockImage = {
  image: string;
  height: number;
  width: number;
};

type Block = {
  id: number;
  name: string;
  display_name: string;
  stack_size: number;
  image: BlockImage | null;
};

const excludedItems = ["void_air", "soul_fire", "cave_air", "air", "fire"];

const getIsExcludedItem = (name: string): boolean => {
  return excludedItems.includes(name);
};

export default function getBlocks(): Block[] {
  return Object.values(mcData.blocks)
    .map((block) => {
      return {
        id: block.id,
        name: block.name,
        display_name: block.displayName,
        stack_size: block.stackSize,
        image: getBlockTexture(block.name),
      };
    })
    .filter((item) => !getIsExcludedItem(item.name));
}

export const getBlockByName = (name: string): Block | null => {
  if (getIsExcludedItem(name)) {
    return null;
  }

  const block = mcData.blocksByName[name];

  if (!block) {
    return null;
  }

  return {
    id: block.id,
    name: block.name,
    display_name: block.displayName,
    stack_size: block.stackSize,
    image: getBlockTexture(block.name),
  };
};

const FORMAT_SEARCH = "png";

export const getBlockTexture = (name: string): BlockImage | null => {
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
