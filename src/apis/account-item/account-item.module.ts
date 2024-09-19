import { Module } from '@nestjs/common';
import { AccountItemController } from './account-item.controller';
import { AccountItemService } from './account-item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountItem } from './account-item.entities';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONFIG } from 'src/constants';
import { JwtStrategy } from 'src/strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountItem]),
    JwtModule.register(JWT_CONFIG),
  ],
  controllers: [AccountItemController],
  providers: [AccountItemService, JwtStrategy],
})
export class AccountItemModule {}
