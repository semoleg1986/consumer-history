import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserHistory } from './entities/history.entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(UserHistory)
    private readonly userHistoryRepository: Repository<UserHistory>,
  ) {}

  async create(createData) {
    const history = new UserHistory();
    history.timestamp = new Date();
    history.userId = createData.id;
    history.action = 'create';
    console.log(history);
    await this.userHistoryRepository.save(history);
  }

  async update(updateData) {
    const history = new UserHistory();
    history.timestamp = new Date();
    history.userId = updateData;
    history.action = 'update';
    console.log(history);
    await this.userHistoryRepository.save(history);
  }

  async delete(deleteData) {
    const history = new UserHistory();
    history.timestamp = new Date();
    history.userId = deleteData;
    history.action = 'delete';
    console.log(history);
    await this.userHistoryRepository.save(history);
  }
  async findAll() {
    return await this.userHistoryRepository.find();
  }

  async getHistoryByUserId(userId: string) {
    return this.userHistoryRepository
      .findOne({ where: { userId } })
      .then((user) => {
        if (!user) {
          throw new NotFoundException('User history not found');
        }
        return user;
      })
      .catch((error) => {
        console.error('Error while fetching user:', error.message);
        throw error;
      });
  }
}
