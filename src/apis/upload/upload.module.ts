import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { UploadController } from './upload.controller';
import { generateUUID } from 'src/utils/index';
// import { UploadService } from './upload.service';
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
  ],
  controllers: [UploadController],
  providers: [],
})
export class UploadModule {}
