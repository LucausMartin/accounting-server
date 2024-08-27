import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Users } from '../users/users.entities';

export const DB_CONFIG: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'accounting-db',
  autoLoadEntities: true,
  synchronize: true,
  entities: [Users],
};
