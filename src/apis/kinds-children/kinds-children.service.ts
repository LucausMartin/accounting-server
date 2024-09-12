import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KindsChildren } from './kinds-children.entities';
import { generateUUID } from 'src/utils';
import { Users } from '../users/users.entities';

@Injectable()
export class KindsChildrenService {
  constructor(
    @InjectRepository(KindsChildren)
    private readonly KindsChildrenRepository: Repository<KindsChildren>,
  ) {}

  /**
   * @description 创建种类父级
   * @param {string} email 用户邮箱
   * @param {string} name 种类父级名称
   * @param {string} file_name 文件名
   * @param {string} svg_code svg 代码
   * @returns 是否创建成功
   */
  async insertKindsChild(
    email: string,
    name: string,
    file_name: string,
    svg_code_id: string,
    parent_id: string,
  ) {
    const user = new Users();
    user.email = email;
    const kindsChild = new KindsChildren();
    kindsChild.fileName = file_name;
    kindsChild.id = generateUUID();
    kindsChild.name = name;
    kindsChild.svgCodeId = svg_code_id;
    kindsChild.parentId = parent_id;
    try {
      await this.KindsChildrenRepository.save(kindsChild);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
