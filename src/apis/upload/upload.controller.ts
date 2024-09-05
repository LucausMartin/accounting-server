import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Body,
  Req,
} from '@nestjs/common';
import { UploadIconErrorTypeEnums } from './icons.constants';
import { TokenInfoType } from 'src/types';
import { HTTP_STATUS } from 'src/constants';
import { formatResponse } from 'src/utils';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import fs from 'fs';
import { UploadService } from './upload.service';
import { Request } from 'express';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  // 添加文件
  @UseGuards(JwtAuthGuard)
  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Req() request: Request,
  ) {
    const { email } = request.user as TokenInfoType;
    const res = await this.uploadService.insertIcon(email, file.filename);

    if (res) {
      // 如果有双反斜杠，变成一个斜杠
      file.path = file.path.replace(/\\/g, '/');
      file.destination = file.destination.replace(/\\/g, '/');
      // 将路径 public/uploaded 换成 /static
      file.path = file.path.replace(file.destination, '/static');
      return formatResponse(HTTP_STATUS.OK, 'Upload successfully', {
        ...file,
      });
    } else {
      return formatResponse(
        HTTP_STATUS.BAD_REQUEST,
        'Create kinds parent failed',
        {
          error_type: UploadIconErrorTypeEnums.FAILED_TO_CREATE,
        },
      );
    }
  }

  // 删除文件
  @UseGuards(JwtAuthGuard)
  @Post('delete')
  async deleteFile(@Body() body) {
    const { file_name } = body;
    // 删除文件
    fs.unlinkSync(`./public/uploaded/${file_name}`);
    return formatResponse(HTTP_STATUS.OK, 'Delete successfully', {
      success: true,
    });
  }
}
