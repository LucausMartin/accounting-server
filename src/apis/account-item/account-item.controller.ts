import { Controller, Post, UseGuards, Req, Body } from '@nestjs/common';
import { AccountItemService } from './account-item.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { TokenInfoType } from 'src/types';
import { Request } from 'express';
import { AddAccountItemErrorTypeEnums } from './account-item.constants';
import { formatResponse } from 'src/utils';
import { HTTP_STATUS } from 'src/constants';

export interface AccountAddItemParamsType {
  email: string;
  parent_kind_id: string;
  child_kind_id: string;
  account_id: string;
  remark: string;
  cost: string;
  type: number;
  time: string;
}

@Controller('account-item')
export class AccountItemController {
  constructor(private readonly accountItemService: AccountItemService) {}

  @UseGuards(JwtAuthGuard)
  @Post('add')
  async addAccountItem(@Req() request: Request, @Body() body) {
    const { email } = request.user as TokenInfoType;
    const {
      parent_kind_id,
      child_kind_id,
      account_id,
      remark,
      cost,
      type,
      time,
    } = body;

    const params: AccountAddItemParamsType = {
      email,
      parent_kind_id,
      child_kind_id,
      account_id,
      remark,
      cost,
      type,
      time,
    };

    const res = await this.accountItemService.addAccountItem(params);

    if (res) {
      return formatResponse(HTTP_STATUS.OK, 'Add account item successfully', {
        success: true,
      });
    } else {
      return formatResponse(
        HTTP_STATUS.BAD_REQUEST,
        'Add account item failed',
        {
          error_type: AddAccountItemErrorTypeEnums.FAILED_TO_ADD,
        },
      );
    }
  }
}
