import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { KindsParents } from '../kinds-parents/kinds-parents.entities';

@Entity({ name: 'system_icons' })
export class SystemIcons {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'svg_code', type: 'longtext' })
  SVGCode: string;

  @OneToMany(() => KindsParents, (kindsParents) => kindsParents.svgCode)
  kinds: KindsParents[];
}
