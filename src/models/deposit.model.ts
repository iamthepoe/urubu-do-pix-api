import { t } from "elysia";

export const DepositModel = t.Object({
  id: t.Numeric(),
  userId: t.Numeric(),
  value: t.Numeric(),
  date: t.Date(),
});

export const CreateDepositDTO = t.Object({
  userId: t.Numeric(),
  value: t.Numeric(),
});

export const UpdateDepositDTO = t.Object({
  userId: t.Optional(t.Numeric()),
  value: t.Optional(t.Numeric()),
});
