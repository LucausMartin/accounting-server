import { Controller, Post, UseGuards, Req, Get, Body } from '@nestjs/common';
import { KindsParentsService } from './kinds-parents.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { formatResponse } from 'src/utils';
import { HTTP_STATUS } from 'src/constants';
import { TokenInfoType } from 'src/types';
import {
  CreateKindsParentErrorTypeEnums,
  GetKindsParentsByEmailErrorTypeEnums,
} from './kinds-parents.constants';
@Controller('kinds-parents')
export class KindsParentsController {
  constructor(private readonly kindsParentsService: KindsParentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create-kinds-parent')
  async createKindsParent(@Req() request: Request, @Body() body) {
    const { email } = request.user as TokenInfoType;
    const { name, file_name, svg_code_id, type } = body;

    const res = await this.kindsParentsService.insertKindsParent(
      email,
      name,
      file_name,
      svg_code_id,
      type,
    );
    if (res) {
      return formatResponse(
        HTTP_STATUS.OK,
        'Create kinds parent successfully',
        {
          success: true,
        },
      );
    } else {
      return formatResponse(
        HTTP_STATUS.BAD_REQUEST,
        'Create kinds parent failed',
        {
          error_type: CreateKindsParentErrorTypeEnums.FAILED_TO_CREATE,
        },
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-kinds-parents-by-email')
  async getKindsParentsByEmail(@Req() request: Request) {
    const { email } = request.user as TokenInfoType;
    const res = await this.kindsParentsService.getKindsParentsByEmail(email);
    if (res) {
      return formatResponse(
        HTTP_STATUS.OK,
        'Get kinds parents by email successfully',
        {
          success: true,
          kinds_parents: res,
        },
      );
    } else {
      return formatResponse(
        HTTP_STATUS.BAD_REQUEST,
        'Get kinds parents by email failed',
        {
          error_type: GetKindsParentsByEmailErrorTypeEnums.FAILED_TO_GET,
        },
      );
    }
  }
}
