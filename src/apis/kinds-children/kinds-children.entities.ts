import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { SystemIcons } from '../system-icons/system-icons.entities';
import { KindsParents } from '../kinds-parents/kinds-parents.entities';
import { AccountItem } from '../account-item/account-item.entities';

@Entity({ name: 'kinds_children' })
export class KindsChildren {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'file_name' })
  fileName: string;

  @Column({ name: 'time' })
  time: string;

  @JoinColumn({ name: 'svg_code_id' })
  @ManyToOne(() => SystemIcons, (systemIcons) => systemIcons.id)
  svgCodeId: string;

  @JoinColumn({ name: 'parent_id' })
  @ManyToOne(() => KindsParents, (kindsParents) => kindsParents.id)
  parentId: string;

  @OneToMany(() => AccountItem, (accountItem) => accountItem.kindChildren)
  accountItems: AccountItem[];
}
