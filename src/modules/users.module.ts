import Elysia from "elysia";
import { createUserService } from "../factories";
import { CreateUserDTO } from "../models/user.model";

const userService = createUserService();

export const users = (app: Elysia) => {
  return app.group("/users", (app) =>
    app
      .post(
        "/sign-up",
        async ({ body, set }) => {
          const result = await userService.create(body);
          if ("error" in result && result.error == "User already exists.") {
            set.status = 400;
            return {
              data: null,
              message: "User already exists.",
              success: false,
            };
          }

          if ("error" in result) {
            set.status = 500;
            return { data: null, message: "Internal Error", success: false };
          }

          set.status = 201;
          return {
            data: result,
            message: "Created.",
            success: true,
          };
        },
        {
          body: CreateUserDTO,
        }
      )
      .post(
        "/sign-in",
        async ({ jwt, body, set }) => {
          const isAuthenticated = await userService.authenticate(body);

          if (!isAuthenticated) {
            set.status = 401;
            return {
              success: false,
              data: null,
              message: "Unauthorized",
            };
          }

          const token = await jwt.sign({ name: body.name });
          return {
            success: true,
            data: { token },
            message: "Authorized",
          };
        },
        { body: CreateUserDTO }
      )
      .get(
        "/whoami",
        async ({ bearer, jwt, set }) => {
          const user = await jwt.verify(bearer);

          if (!user) {
            set.status = 401;
            return { message: "Unauthorized", data: null, sucess: false };
          }

          return user;
        },
        {
          beforeHandle({ bearer, set }) {
            if (!bearer) {
              set.status = 401;
              return { message: "Unauthorized.", data: null, success: false };
            }
          },
        }
      )
  );
};
