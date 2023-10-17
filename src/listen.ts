import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [
        'amqps://vxmfehla:lwSmdKVZ4T4uX7gxRNk-WTkpyW6KWnyY@crow.rmq.cloudamqp.com/vxmfehla',
      ],
      //   urls: ['amqp://admin:admin@my_rabbitmq:5672'],
      queue: 'main-queue',
      noAck: true,
      queueOptions: {
        durable: false,
      },
    },
  });
  app.useGlobalPipes(new ValidationPipe());

  await app.listen();
}
bootstrap();
