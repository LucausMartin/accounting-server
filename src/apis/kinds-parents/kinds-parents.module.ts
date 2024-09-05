import { Module } from '@nestjs/common';
import { KindsParentsController } from './kinds-parents.controller';
import { KindsParentsService } from './kinds-parents.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KindsParents } from './kinds-parents.entities';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONFIG } from 'src/constants';
import { JwtStrategy } from 'src/strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([KindsParents]),
    JwtModule.register(JWT_CONFIG),
  ],
  controllers: [KindsParentsController],
  providers: [KindsParentsService, JwtStrategy],
})
export class KindsParentsModule {}
