import { Controller, Post, UseGuards, Req, Body } from '@nestjs/common';
import { KindsChildrenService } from './kinds-children.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { formatResponse } from 'src/utils';
import { HTTP_STATUS } from 'src/constants';
import { TokenInfoType } from 'src/types';
import { CreateKindsChildrenErrorTypeEnums } from './kinds-children.constants';

@Controller('kinds-children')
export class KindsChildrenController {
  constructor(private readonly kindsChildrenService: KindsChildrenService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create-kinds-child')
  async createKindsParent(@Req() request: Request, @Body() body) {
    const { email } = request.user as TokenInfoType;
    const { name, file_name, svg_code_id, parent_id } = body;

    const res = await this.kindsChildrenService.insertKindsChild(
      email,
      name,
      file_name,
      svg_code_id,
      parent_id,
    );
    if (res) {
      return formatResponse(HTTP_STATUS.OK, 'Create kinds child successfully', {
        success: true,
      });
    } else {
      return formatResponse(
        HTTP_STATUS.BAD_REQUEST,
        'Create kinds child failed',
        {
          error_type: CreateKindsChildrenErrorTypeEnums.FAILED_TO_CREATE,
        },
      );
    }
  }
}
