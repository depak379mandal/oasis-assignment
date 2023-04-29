import { registerAs } from '@nestjs/config';

export default registerAs('grpc', () => ({
  url: process.env.GRPC_CONNECTION_URL,
}));
