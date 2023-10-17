import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserHistory } from './entities/history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserHistory]),
    ClientsModule.register([
      {
        name: 'SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqps://vxmfehla:lwSmdKVZ4T4uX7gxRNk-WTkpyW6KWnyY@crow.rmq.cloudamqp.com/vxmfehla',
          ],
          // urls: ['amqp://admin:admin@my_rabbitmq:5672'],
          queue: 'main-queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [HistoryController],
  providers: [HistoryService],
})
export class HistoryModule {}
