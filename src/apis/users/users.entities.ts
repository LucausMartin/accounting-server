import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { KindsParents } from '../kinds-parents/kinds-parents.entities';

@Entity({ name: 'users' })
export class Users {
  @PrimaryColumn()
  email: string;

  @Column({ name: 'name', default: 'empty' })
  name: string;

  @OneToMany(() => KindsParents, (kindsParents) => kindsParents.user)
  kinds: KindsParents[];
}
