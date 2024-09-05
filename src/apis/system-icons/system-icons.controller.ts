import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetSystemIconsErrorTypeEnums } from './system-icons.constants';
import { SystemIconsService } from './system-icons.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { formatResponse } from 'src/utils';
import { HTTP_STATUS } from 'src/constants';

@Controller('system-icons')
export class SystemIconsController {
  constructor(private readonly systemIconsService: SystemIconsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getSystemIcons() {
    const result = await this.systemIconsService.findAll();
    if (result) {
      return formatResponse(HTTP_STATUS.OK, 'Get system icons successful', {
        svg_code: result,
      });
    } else {
      return formatResponse(HTTP_STATUS.NOT_FOUND, 'Get system icons failed', {
        error_type: GetSystemIconsErrorTypeEnums.FAILED_TO_GET,
      });
    }
  }
}
