import { assertEquals } from "@std/assert";
import getItems, { getItemByName, getItemImage } from "../src/getItems.ts";

Deno.test("getItmes should be return an array of items", () => {
  const items = getItems();

  const itemsAssert = items.reduce((_acc, item) => {
    if (item.id && item.name && item.display_name && item.stack_size) {
      return true;
    }
    return false;
  }, true);

  assertEquals(itemsAssert, true);
});

Deno.test("getItemByName should be return an item", () => {
  const item = getItemByName("acacia_button");

  console.log(item);

  assertEquals(item?.id, 638);
  assertEquals(item?.name, "acacia_button");
});

const itemsCheckImage = [
  "acacia_button",
  "acacia_door",
  "acacia_fence_gate",
  "acacia_pressure_plate",
  "acacia_sign",
  "acacia_slab",
  "acacia_stairs",
  "acacia_trapdoor",
  "acacia_wall_sign",
  "acacia_wood",
  "wooden_hoe",
];

itemsCheckImage.forEach((item) => {
  Deno.test(`getItemImage should be return an image for ${item}`, () => {
    const image = getItemImage(item);

    console.log(image);

    assertEquals(image?.image, `assets/items/${item}.png`);
    assertEquals(image?.height, 0);
    assertEquals(image?.width, 0);
  });
});
