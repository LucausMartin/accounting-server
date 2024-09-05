import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { UploadController } from './upload.controller';
import { generateUUID } from 'src/utils/index';
import { UploadService } from './upload.service';
import { Icons } from './icons.entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JWT_CONFIG } from 'src/constants';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/strategies/jwt.strategy';

@Module({
  imports: [
    MulterModule.register({
      // 用于配置上传，这部分也可以写在路由上
      storage: diskStorage({
        // destination: join(__dirname, '../images'),
        destination: join('./public/uploaded'),
        filename: (_, file, callback) => {
          const fileName = `${generateUUID() + extname(file.originalname)}`;
          return callback(null, fileName);
        },
      }),
    }),
    TypeOrmModule.forFeature([Icons]),
    JwtModule.register(JWT_CONFIG),
  ],
  controllers: [UploadController],
  providers: [UploadService, JwtStrategy],
})
export class UploadModule {}
