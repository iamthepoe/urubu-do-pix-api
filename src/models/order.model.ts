import { t } from "elysia";

export const OrderModel = t.Object({
  id: t.Numeric(),
  userId: t.Numeric(),
  value: t.Numeric(),
});

export const CreateOrderDTO = t.Object({
  userId: t.Numeric(),
  value: t.Numeric(),
});

export const UpdateOrderDTO = t.Object({
  value: t.Optional(t.Numeric()),
});
