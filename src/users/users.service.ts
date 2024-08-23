import { Injectable } from '@nestjs/common';
import * as nodeMailer from 'nodemailer';
import { RegisterItemType } from './users.interface';

@Injectable()
export class UsersService {
  private ransporter = nodeMailer.createTransport({
    host: 'smtp.qq.com',
    secure: true,
    auth: {
      user: '2602685411@qq.com',
      pass: 'bvrgjtoejrzbecbf',
    },
  });

  private registerTable: RegisterItemType[] = [];

  /**
   * @description 发送验证码
   * @param email 接收验证码的邮箱
   * @param code 验证码
   * @returns 发送成功状态
   */
  async sendVerificationCode(email: string, code: string) {
    console.log('start');
    let status: boolean;
    let message;
    await new Promise<void>((resolve, reject) => {
      this.ransporter.sendMail(
        {
          from: '2602685411@qq.com',
          to: email,
          subject: '网站账户注册验证码',
          html:
            `
            <p>网站账户注册验证码：</p>
            <span style="font-size: 18px; color: red">` +
            code +
            `</span>`,
        },
        function (err: Error, info: nodeMailer.SentMessageInfo) {
          if (err) {
            console.log(err);
            status = false;
            message = info;
            reject();
          } else {
            status = true;
            resolve();
          }
        },
      );
    });
    return {
      res: status,
      message,
    };
  }

  /**
   * @description 随机生成英文加数字的六位验证码
   * @returns 验证码
   */
  generateVerificationCode(email: string) {
    // 检查是否已经发送过验证码
    const index = this.registerTable.findIndex((item) => item.email === email);
    if (index !== -1) {
      // 重置定时器
      clearTimeout(this.registerTable[index].timer);
      this.registerTable[index].timer = setTimeout(() => {
        this.removeFromRegisterTable(email);
      }, 60000);
      return this.registerTable[index].code;
    }
    const letterCount = Math.floor(Math.random() * 3) + 3;
    const numberCount = 6 - letterCount;
    let code = '';
    for (let i = 0; i < letterCount; i++) {
      code += String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    }
    for (let i = 0; i < numberCount; i++) {
      code += Math.floor(Math.random() * 10);
    }
    // 打乱
    code = code
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('');
    return code;
  }

  /**
   * @description 向注册表中添加邮箱、验证码、倒计时定时器
   * @param email 邮箱
   * @returns 添加成功状态
   */
  addToRegisterTable(email: string, code: string) {
    const timer = setTimeout(() => {
      this.removeFromRegisterTable(email);
    }, 60000);
    this.registerTable.push({ email, code, timer });
    console.log(this.registerTable);
    return true;
  }

  /**
   * @description 从注册表中删除邮箱、验证码、倒计时定时器
   * @param email 邮箱
   * @returns 删除成功状态
   */
  removeFromRegisterTable(email: string) {
    const index = this.registerTable.findIndex((item) => item.email === email);
    if (index === -1) {
      return false;
    }
    clearTimeout(this.registerTable[index].timer);
    this.registerTable.splice(index, 1);
    return true;
  }

  /**
   * @description 注册
   * @param email 邮箱
   * @param code 验证码
   * @returns 注册成功状态
   */
  register(email: string, code: string) {
    console.log(this.registerTable);
    console.log(email, code);
  }
}
