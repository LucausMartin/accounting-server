import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { SystemIcons } from '../system-icons/system-icons.entities';
import { KindsParents } from '../kinds-parents/kinds-parents.entities';

@Entity({ name: 'kinds_children' })
export class KindsChildren {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'file_name' })
  fileName: string;

  @JoinColumn({ name: 'svg_code_id' })
  @ManyToOne(() => SystemIcons, (systemIcons) => systemIcons.id)
  svgCodeId: string;

  @JoinColumn({ name: 'parent_id' })
  @ManyToOne(() => KindsParents, (kindsParents) => kindsParents.id)
  parentId: string;
}
