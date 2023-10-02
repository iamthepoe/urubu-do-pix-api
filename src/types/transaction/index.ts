export type TransactionType = 'deposit' | 'profit' | 'withdraw';
export type Money = number;

export interface TransactionEntity {
  type: TransactionType;
  value: Money;
}
