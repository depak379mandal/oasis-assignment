import { CreateTransactionDto, UpdateTransactionDto } from './transaction.dto';
import { Transaction } from '@prisma/client';

export interface TransactionService {
  addTransaction: (createDto: CreateTransactionDto) => Transaction;
  getTransaction: (data: { id: number }) => { data?: Transaction };
  deleteTransaction: (data: { id: number }) => void;
  updateTransaction: (updateDto: {
    id: number;
    data: UpdateTransactionDto;
  }) => void;
}
