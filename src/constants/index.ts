import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Users } from '../apis/users/users.entities';
import { KindsParents } from '../apis/kinds-parents/kinds-parents.entities';
import { Icons } from '../apis/upload/icons.entities';
import { SystemIcons } from 'src/apis/system-icons/system-icons.entities';
import { KindsChildren } from 'src/apis/kinds-children/kinds-children.entities';
import { Account } from 'src/apis/account/account.entities';

export const DB_CONFIG: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'accounting-db',
  autoLoadEntities: true,
  synchronize: false,
  entities: [Users, KindsParents, Icons, SystemIcons, KindsChildren, Account],
};

export const JWT_CONFIG = {
  secret: 'Betty & Lucaus',
  signOptions: { expiresIn: '1h' },
};

export enum HTTP_STATUS {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}
