import minecraftData from "minecraft-data";
import { existsSync } from "@std/fs";

type itemImage = {
  image: string;
  height: number;
  width: number;
};

type Item = {
  id: number;
  name: string;
  display_name: string;
  stack_size: number;
  image?: itemImage;
};

const mcData = minecraftData("1.19");

export default function getItems(): Item[] {
  return Object.values(mcData.items).map((item) => {
    return {
      id: item.id,
      name: item.name,
      display_name: item.displayName,
      stack_size: item.stackSize,
      image: {
        image: item.displayName,
        height: item.displayName.length,
        width: item.displayName.length,
      },
    };
  });
}

export const getItemByName = (name: string): Item | null => {
  const item = mcData.itemsByName[name];

  if (!item) {
    return null;
  }

  return {
    id: item.id,
    name: item.name,
    display_name: item.displayName,
    stack_size: item.stackSize,
  };
};

const FORMAT_SEARCH = "png";

export const getItemImage = (name: string): itemImage | null => {
  const imagePath = Deno.cwd() + "/assets/items/" + name + "." + FORMAT_SEARCH;

  console.log(imagePath);

  if (!existsSync(imagePath)) {
    return null;
  }

  return {
    image: imagePath,
    height: 0,
    width: 0,
  };
};
