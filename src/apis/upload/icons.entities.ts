import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { Users } from '../users/users.entities';

@Entity({ name: 'icons' })
export class Icons {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'file_name' })
  name: string;

  @ManyToOne(() => Users, (users) => users.kinds)
  user: Users;
}
