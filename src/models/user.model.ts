import { t } from "elysia";

export const UserModel = t.Object({
  id: t.Numeric(),
  name: t.String(),
  code: t.String()
});

export const CreateUserDTO = t.Object({
  name: t.String(),
  code: t.String()
});

export const UpdateUserDTO = t.Object({
  name: t.Optional(t.String()),
  code: t.Optional(t.String())
});
