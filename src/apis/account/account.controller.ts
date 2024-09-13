import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AccountService } from './account.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { formatResponse } from 'src/utils';
import { HTTP_STATUS } from 'src/constants';
import { TokenInfoType } from 'src/types';
import { GetAccountsErrorTypeEnums } from './account.constants';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @UseGuards(JwtAuthGuard)
  @Get('get-all')
  async getAllAccounts(@Req() request: Request) {
    const { email } = request.user as TokenInfoType;
    const res = await this.accountService.getAllAccounts(email);
    if (res) {
      return formatResponse(HTTP_STATUS.OK, 'Get all accounts successfully', {
        accounts: res,
      });
    } else {
      return formatResponse(
        HTTP_STATUS.BAD_REQUEST,
        'Get all accounts failed',
        {
          error_type: GetAccountsErrorTypeEnums.FAILED_TO_GET,
        },
      );
    }
  }
}
