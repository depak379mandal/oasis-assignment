import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsEnum, IsOptional } from 'class-validator';

export enum TransactionType {
  purchase = 'purchase',
  sale = 'sale',
}

export class CreateTransactionDto {
  @ApiProperty()
  @IsString()
  user_id: string;

  @ApiProperty()
  @IsString()
  crypto_name: string;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty({ format: 'enum', enum: TransactionType })
  @IsEnum(TransactionType)
  transaction_type: TransactionType;
}

export class UpdateTransactionDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  user_id: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  crypto_name: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  amount: number;

  @ApiProperty({ format: 'enum', enum: TransactionType })
  @IsOptional()
  @IsEnum(TransactionType)
  transaction_type: TransactionType;
}
