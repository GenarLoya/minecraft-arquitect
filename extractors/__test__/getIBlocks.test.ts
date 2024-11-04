import { assertEquals } from "@std/assert";
import getBlocks, {
  getBlockByName,
  getBlockTexture,
} from "../src/getBlocks.ts";

const items = getBlocks();

items.forEach((item) => {
  Deno.test(`items should be return an item for ${item.name}`, () => {
    assertEquals(item.id, item.id);
    assertEquals(item.name, item.name);
    assertEquals(item.display_name, item.display_name);
    assertEquals(item.stack_size, item.stack_size);
  });
});

items.forEach((item) => {
  Deno.test(`getItemByName should be return an item for ${item.name}`, () => {
    const itemAssert = getBlockByName(item.name);

    assertEquals(itemAssert?.id, item.id);
    assertEquals(itemAssert?.name, item.name);
    assertEquals(itemAssert?.display_name, item.display_name);
    assertEquals(itemAssert?.stack_size, item.stack_size);
  });
});

items.forEach((item) => {
  Deno.test(`getItemTexture should be return an image for ${item.name}`, () => {
    const image = getBlockTexture(item.name);

    assertEquals(Boolean(image?.image), true);
  });
});

Deno.test("Should air not exist in items", () => {
  const item = items.find((item) => item.name === "air");

  assertEquals(Boolean(item), false);
});

Deno.test("getItemByName should be return null for air", () => {
  const item = getBlockByName("air");

  assertEquals(item, null);
});

Deno.test("getItemTexture should be return null for air", () => {
  const image = getBlockTexture("air");

  assertEquals(image, null);
});
