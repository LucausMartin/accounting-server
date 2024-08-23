import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { formatResponse } from 'src/utils';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('send-verification-code')
  async sendVerificationCode(@Body('email') email: string) {
    const code = this.usersService.generateVerificationCode(email);
    const res = await this.usersService.sendVerificationCode(email, code);
    if (!res.res) {
      return formatResponse(
        400,
        'Failed to send verification code',
        res.message,
      );
    }
    return formatResponse(200, 'Verification code sent successfully', res);
  }

  @Post('register')
  async register(@Body() body) {
    const { email, code } = body;
    this.usersService.register(email, code);
  }
}
