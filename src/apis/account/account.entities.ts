import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from '../users/users.entities';

@Entity({ name: 'account' })
export class Account {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'time' })
  time: string;

  @JoinColumn({ name: 'user_email' })
  @ManyToOne(() => Users, (users) => users.email)
  userEmail: Users;
}
