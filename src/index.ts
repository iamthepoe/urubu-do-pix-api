import { Elysia, t } from "elysia";
import { createDatabaseClient, createUserService } from "./factories";
import { CreateUserDTO } from "./models/user.model";

createDatabaseClient().init().then(() => true);

const userService = createUserService();

const app = new Elysia();

app.get("/", () => "Hello World!");

app.group('/user', app => app
  .post('/sign-up', ({ body }) => userService.create(body), { body: CreateUserDTO })
)

app.listen(3000);

console.log(
  `🐦 URUBU DO PIX is running at ${app.server?.hostname}:${app.server?.port}`
);
