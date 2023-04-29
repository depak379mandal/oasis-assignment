import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  OnModuleInit,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { TransactionService } from './transaction.service.interface';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { CreateTransactionDto, UpdateTransactionDto } from './transaction.dto';
import { Transaction } from '@prisma/client';

@ApiTags('Transaction')
@Controller({
  path: 'transactions',
})
export class TransactionController implements OnModuleInit {
  constructor(@Inject('TRANSACTION_PACKAGE') private client: ClientGrpc) {}

  private service: TransactionService;

  onModuleInit() {
    this.service =
      this.client.getService<TransactionService>('TransactionService');
  }

  @Post()
  @ApiResponse({})
  create(@Body() createDto: CreateTransactionDto): Transaction {
    return this.service.addTransaction(createDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateTransactionDto,
  ) {
    return this.service.updateTransaction({ id, data: updateDto });
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.service.getTransaction({ id });
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.deleteTransaction({ id });
  }
}
