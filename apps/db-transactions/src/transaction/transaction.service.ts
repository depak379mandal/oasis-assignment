import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { GrpcMethod } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import {
  ICreateTransactionDto,
  IUpdateTransactionDto,
} from './transaction.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Transaction, Prisma } from '@prisma/client';

@Controller()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  @GrpcMethod('TransactionService', 'addTransaction')
  addTransaction(data: ICreateTransactionDto) {
    return this.prisma.transaction.create({
      data: {
        ...data,
        timestamp: new Date(),
      },
    });
  }

  @GrpcMethod('TransactionService', 'updateTransaction')
  async updateTransaction(data: { id: number; data: IUpdateTransactionDto }) {
    await this.prisma.transaction.update({
      where: {
        id: data.id,
      },
      data: data.data,
    });
  }

  @GrpcMethod('TransactionService', 'getTransaction')
  async getTransaction({ id }: { id: number }) {
    const transaction = await this.prisma.transaction.findUnique({
      where: {
        id,
      },
    });

    return {
      data: transaction,
    };
  }

  @GrpcMethod('TransactionService', 'deleteTransaction')
  deleteTransaction(where: { id: number }) {
    return this.prisma.transaction.delete({ where });
  }
}
