import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Account } from '../account/account.entities';
import { KindsParents } from '../kinds-parents/kinds-parents.entities';
import { KindsChildren } from '../kinds-children/kinds-children.entities';
import { Users } from '../users/users.entities';

@Entity({ name: 'account_item' })
export class AccountItem {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'time' })
  time: string;

  @Column({ name: 'remark' })
  remark: string;

  @Column({ name: 'cost' })
  cost: string;

  @Column({ name: 'type', type: 'int' })
  type: number;

  @JoinColumn({ name: 'user_email' })
  @ManyToOne(() => Users, (users) => users.email)
  userEmail: Users;

  @JoinColumn({ name: 'account_id' })
  @ManyToOne(() => Account, (account) => account.id)
  account: Account;

  @JoinColumn({ name: 'parent_kind_id' })
  @ManyToOne(() => KindsParents, (kindsParents) => kindsParents.id)
  kindParent: KindsParents;

  @JoinColumn({ name: 'child_kind_id' })
  @ManyToOne(() => KindsChildren, (kindsChildren) => kindsChildren.id)
  kindChildren: KindsChildren;
}
