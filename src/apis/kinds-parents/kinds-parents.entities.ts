import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { Users } from '../users/users.entities';

@Entity({ name: 'kinds_parents' })
export class KindsParents {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'file_name' })
  fileName: string;

  @ManyToOne(() => Users, (users) => users.kinds)
  user: Users;
}
