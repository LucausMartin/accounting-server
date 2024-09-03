import { Module } from '@nestjs/common';
import { UsersModule } from './apis/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_CONFIG } from './constants';
import { KindsParentsModule } from './apis/kinds-parents/kinds-parents.module';
@Module({
  imports: [UsersModule, KindsParentsModule, TypeOrmModule.forRoot(DB_CONFIG)],
  controllers: [],
  providers: [],
})
export class AppModule {}
