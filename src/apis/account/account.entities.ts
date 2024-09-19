import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Users } from '../users/users.entities';
import { AccountItem } from '../account-item/account-item.entities';

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

  @OneToMany(() => AccountItem, (accountItem) => accountItem.userEmail)
  accountItems: AccountItem[];
}
