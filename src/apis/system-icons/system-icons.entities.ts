import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'system_icons' })
export class SystemIcons {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'svg_code', type: 'varchar', length: 10000 })
  SVGCode: string;
}
