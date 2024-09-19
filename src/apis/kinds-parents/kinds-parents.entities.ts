import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Users } from '../users/users.entities';
import { SystemIcons } from '../system-icons/system-icons.entities';
import { KindsChildren } from '../kinds-children/kinds-children.entities';
import { AccountItem } from '../account-item/account-item.entities';

@Entity({ name: 'kinds_parents' })
export class KindsParents {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'file_name' })
  fileName: string;

  @Column({ name: 'type', type: 'int' })
  type: number;

  @Column({ name: 'time' })
  time: string;

  @JoinColumn({ name: 'svg_code_id' })
  @ManyToOne(() => SystemIcons, (systemIcons) => systemIcons.id)
  svgCodeId: string;

  @JoinColumn({ name: 'user_email' })
  @ManyToOne(() => Users, (users) => users.kinds)
  user: Users;

  @OneToMany(() => KindsChildren, (kindsChildren) => kindsChildren.parentId)
  children: KindsChildren[];

  @OneToMany(() => AccountItem, (accountItem) => accountItem.kindParent)
  accountItems: AccountItem[];
}
