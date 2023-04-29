import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'transactions',
      protoPath: join(process.cwd(), 'proto/transaction.proto'),
      url: configService.get<string>('grpc.url'),
      loader: { keepCase: true },
    },
  });

  await app.startAllMicroservices();
}
bootstrap();
