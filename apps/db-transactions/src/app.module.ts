import { Module } from '@nestjs/common';
import { TransactionService } from './transaction/transaction.service';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module.';
import { ConfigModule } from '@nestjs/config';
import config from '../../../config';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: config,
    }),
  ],
  controllers: [TransactionService],
  providers: [AppService],
})
export class AppModule {}
