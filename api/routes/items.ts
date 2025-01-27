import { Hono } from "hono";
import { getItems } from "@minecraft-arquitect/extractors";

const itemsRoute = new Hono();

itemsRoute.get("/", (c) => {
  return c.json(getItems());
});

export default itemsRoute;
