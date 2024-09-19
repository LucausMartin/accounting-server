import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { KindsParents } from '../kinds-parents/kinds-parents.entities';
import { Icons } from '../upload/icons.entities';
import { Account } from '../account/account.entities';
import { AccountItem } from '../account-item/account-item.entities';

@Entity({ name: 'users' })
export class Users {
  @PrimaryColumn()
  email: string;

  @Column({ name: 'name', default: 'empty' })
  name: string;

  @OneToMany(() => KindsParents, (kindsParents) => kindsParents.user)
  kinds: KindsParents[];

  @OneToMany(() => Icons, (icons) => icons.user)
  icons: Icons[];

  @OneToMany(() => Account, (account) => account.userEmail)
  accounts: Account[];

  @OneToMany(() => AccountItem, (accountItem) => accountItem.userEmail)
  accountItems: AccountItem[];
}
