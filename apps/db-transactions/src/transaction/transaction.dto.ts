export enum TransactionType {
  purchase = 'purchase',
  sale = 'sale',
}

export interface ICreateTransactionDto {
  user_id: string;
  crypto_name: string;
  amount: number;
  transaction_type: TransactionType;
}

export type IUpdateTransactionDto = Partial<ICreateTransactionDto>;
