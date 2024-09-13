import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../account/account.entities';
import { Users } from '../users/users.entities';
import { generateUUID } from 'src/utils';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  /**
   * @description 通过邮箱获取账单
   * @param {string} email 用户邮箱
   * @returns 账单
   */
  async getAllAccounts(email: string) {
    try {
      const accounts = await this.accountRepository
        .createQueryBuilder('account')
        .where('account.userEmail = :email', { email })
        .getMany();
      return accounts;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  /**
   * @description 创建账单
   * @param {string} email 用户邮箱
   * @param {string} name 账单名称
   * @returns 是否创建成功
   */
  async insertAccount(email: string, name: string) {
    const account = new Account();
    const user = new Users();
    user.email = email;
    account.userEmail = user;
    account.id = generateUUID();
    account.name = name;
    try {
      await this.accountRepository.save(account);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
