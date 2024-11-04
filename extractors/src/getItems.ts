import minecraftAssets from "minecraft-assets";
import minecraftData from "minecraft-data";

type ItemImage = {
  image: string;
  height: number;
  width: number;
};

type Item = {
  id: number;
  name: string;
  display_name: string;
  stack_size: number;
  image: ItemImage | null;
};

const MINECRAFT_VERSION = "1.20.2";
const mcData = minecraftData(MINECRAFT_VERSION);
const mcAssets = minecraftAssets(MINECRAFT_VERSION);

const excludedItems = ["air"];

const getIsExcludedItem = (name: string): boolean => {
  return excludedItems.includes(name);
};

export default function getItems(): Item[] {
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

export const getItemByName = (name: string): Item | null => {
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

export const getItemTexture = (name: string): ItemImage | null => {
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
