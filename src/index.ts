import { Elysia, t } from "elysia";
import { createDatabaseClient } from "./factories";
import { jwt } from "@elysiajs/jwt";
import { users } from "./modules/users.module";
import bearer from "@elysiajs/bearer";

createDatabaseClient()
  .init()
  .then(() => true);

const app = new Elysia()
  .get("/", () => "Hello World!")
  .use(
    jwt({
      name: "jwt",
      secret: Bun.env.API_TOKEN!,
    })
  )
  .use(bearer())
  .use(users);

app.listen(Bun.env.PORT || 3000);

console.log(
  `🐦 URUBU DO PIX is running at ${app.server?.hostname}:${app.server?.port}`
);
