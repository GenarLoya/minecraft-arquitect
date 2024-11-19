import { Hono } from "hono";
import itemsRoute from "./routes/items.ts";

const app = new Hono();

app.route("/items", itemsRoute);

Deno.serve(app.fetch);
