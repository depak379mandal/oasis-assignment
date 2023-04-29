import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { TransactionController } from './transaction.controller';

@Module({
  controllers: [TransactionController],
  providers: [
    {
      provide: 'TRANSACTION_PACKAGE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            package: 'transactions',
            protoPath: join(process.cwd(), 'proto/transaction.proto'),
            url: configService.get<string>('grpc.url'),
            loader: { keepCase: true },
          },
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class TransactionModule {}
