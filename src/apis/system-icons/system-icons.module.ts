import { Module } from '@nestjs/common';
import { SystemIconsController } from './system-icons.controller';
import { SystemIconsService } from './system-icons.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemIcons } from './system-icons.entities';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONFIG } from 'src/constants';
import { JwtStrategy } from 'src/strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([SystemIcons]),
    JwtModule.register(JWT_CONFIG),
  ],
  controllers: [SystemIconsController],
  providers: [SystemIconsService, JwtStrategy],
})
export class SystemIconsModule {}
