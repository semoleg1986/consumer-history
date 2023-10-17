import { Controller, Get } from '@nestjs/common';
import { HistoryService } from './history.service';
import { EventPattern } from '@nestjs/microservices';
import { plainToInstance } from 'class-transformer';
import { UserHistory } from './entities/history.entity';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}
  @EventPattern('create')
  async handleCreateEvent(createData) {
    await this.historyService.create(createData);
  }
  @EventPattern('update')
  async handleUpdateEvent(createData) {
    await this.historyService.update(createData);
  }
  @EventPattern('delete')
  async handleDeleteEvent(createData) {
    await this.historyService.delete(createData);
  }
  @Get()
  findAll() {
    return plainToInstance(UserHistory, this.historyService.findAll());
  }
}
