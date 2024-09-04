import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
// import { UploadService } from './upload.service';
// import { extname } from 'path';
@Controller('upload')
export class UploadController {
  // constructor(private readonly uploadService: UploadService) {}
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: './public/uploaded',
  //       filename: (_, file, callback) => {
  //         const fileName = `${
  //           new Date().getTime() + extname(file.originalname)
  //         }`;
  //         return callback(null, fileName);
  //       },
  //     }),
  //   }),
  // )
  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File) {
    return file;
  }
}
