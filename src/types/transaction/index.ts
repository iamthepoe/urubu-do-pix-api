export type TransactionType = 'deposit' | 'profit' | 'withdraw';
export type Money = number;

export interface TransactionEntity {
  id: number;
  userId: number;
  type: TransactionType;
  value: Money;
}
