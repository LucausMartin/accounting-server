import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entities';
import { Account } from '../account/account.entities';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONFIG } from 'src/constants';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { RefreshJwtStrategy } from 'src/strategies/refresh-jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Account]),
    JwtModule.register(JWT_CONFIG),
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy, RefreshJwtStrategy],
})
export class UsersModule {}
