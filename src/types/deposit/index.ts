import { UserEntity } from "../user"

export type Money = number;

interface CreateDepositDTO{
    userId: UserEntity['id'];
    value: Money;
    date: Date;
}

type UpdateDepositDTO = Partial<CreateDepositDTO>;

interface DepositEntity{
    id: number;
    userId: UserEntity['id'];
    value: Money;
    date: Date;
}