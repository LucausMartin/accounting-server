import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountItem } from './account-item.entities';
import { AccountAddItemParamsType } from './account-item.controller';
import { Account } from '../account/account.entities';
import { KindsChildren } from '../kinds-children/kinds-children.entities';
import { KindsParents } from '../kinds-parents/kinds-parents.entities';
import { Users } from '../users/users.entities';
import { generateUUID } from 'src/utils';

@Injectable()
export class AccountItemService {
  constructor(
    @InjectRepository(AccountItem)
    private readonly accountItemRepository: Repository<AccountItem>,
  ) {}

  /**
   * @description 添加账单项
   * @param {AccountAddItemParamsType} param 账单项参数
   * @returns 是否添加成功
   */
  async addAccountItem(param: AccountAddItemParamsType) {
    const accountItem = new AccountItem();
    const account = new Account();
    const kindsChildren = new KindsChildren();
    const kindsParents = new KindsParents();
    const user = new Users();
    account.id = param.account_id;
    kindsChildren.id = param.child_kind_id;
    kindsParents.id = param.parent_kind_id;
    user.email = param.email;
    accountItem.account = account;
    accountItem.id = generateUUID();
    accountItem.kindChildren = kindsChildren;
    accountItem.kindParent = kindsParents;
    accountItem.userEmail = user;
    accountItem.time = param.time;
    accountItem.remark = param.remark;
    accountItem.cost = param.cost;
    accountItem.type = param.type;
    try {
      await this.accountItemRepository.save(accountItem);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
