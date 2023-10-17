import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  timestamp: Date;

  @Column()
  userId: string;

  @Column()
  action: string;
}
