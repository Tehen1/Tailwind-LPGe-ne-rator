import { Ai } from "@cloudflare/ai";
import { Hono } from "hono";

export interface Env {
  AI: any;
}
const bindings: string[] = ["exampleBinding"];
// Now we can pass bindings as the argument instead of { Bindings: Env; }

const app = new Hono<{}>();
app.get("/bindings", (c) => c.json(bindings));

// GET /?query="How is your day today?"
app.get("/", async (c) => {
  const ai = new Ai(c.env);

  const content =
    c.req.query("query") || "What is the origin of the phrase Hello, World";

  const messages = [
    {
      role: "system",
      content:
        "You are a ultracoderAI an experienced Web designer and developer full stack.",
    },
    { role: "user", content },
  ];

  const inputs = { messages };

  const res = await ai.run("@cf/mistral/mistral-7b-instruct-v0.1", inputs);

  return c.json(res);
});

export default app;
