import { Module } from '@nestjs/common';
import { KindsChildrenController } from './kinds-children.controller';
import { KindsChildrenService } from './kinds-children.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KindsChildren } from './kinds-children.entities';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONFIG } from 'src/constants';
import { JwtStrategy } from 'src/strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([KindsChildren]),
    JwtModule.register(JWT_CONFIG),
  ],
  controllers: [KindsChildrenController],
  providers: [KindsChildrenService, JwtStrategy],
})
export class KindsChildrenModule {}
