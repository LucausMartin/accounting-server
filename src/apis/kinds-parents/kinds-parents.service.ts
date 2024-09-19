import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KindsParents } from './kinds-parents.entities';
import { generateUUID } from 'src/utils';
import { Users } from '../users/users.entities';
import * as dayjs from 'dayjs';

@Injectable()
export class KindsParentsService {
  constructor(
    @InjectRepository(KindsParents)
    private readonly KindsParentsRepository: Repository<KindsParents>,
  ) {}

  /**
   * @description 创建种类父级
   * @param {string} email 用户邮箱
   * @param {string} name 种类父级名称
   * @param {string} file_name 文件名
   * @param {string} svg_code svg 代码
   * @returns 是否创建成功
   */
  async insertKindsParent(
    email: string,
    name: string,
    file_name: string,
    svg_code_id: string,
    type: number,
  ) {
    const user = new Users();
    user.email = email;
    const kindsParent = new KindsParents();
    kindsParent.user = user;
    kindsParent.fileName = file_name;
    kindsParent.id = generateUUID();
    kindsParent.name = name;
    kindsParent.svgCodeId = svg_code_id;
    kindsParent.type = type;
    kindsParent.time = dayjs().format('YYYY-MM-DD HH:mm:ss');
    try {
      await this.KindsParentsRepository.save(kindsParent);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  /**
   * @description 通过邮箱获取种类父级
   * @param {string} email 用户邮箱
   * @returns 种类父级
   */
  async getExpensesKindsParentsByEmail(email: string) {
    try {
      const kindParents = await this.KindsParentsRepository.createQueryBuilder(
        'kindsParents',
      )
        .leftJoinAndSelect('kindsParents.svgCodeId', 'svgCodeId')
        .leftJoinAndSelect('kindsParents.children', 'children')
        .leftJoinAndSelect('children.svgCodeId', 'childSvgCodeId')
        .where('kindsParents.user.email = :email AND kindsParents.type = 0', {
          email,
        })
        .orderBy('kindsParents.time', 'DESC')
        .addOrderBy('children.time', 'DESC')
        .getMany();
      // 将所有 fileName 前面加上 /static/
      kindParents.forEach((kindParent) => {
        if (kindParent.fileName) {
          kindParent.fileName = '/static/' + kindParent.fileName;
        }
        kindParent.children.forEach((child) => {
          if (child.fileName) {
            child.fileName = '/static/' + child.fileName;
          }
        });
      });
      return kindParents;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  /**
   * @description 通过邮箱获取种类父级
   * @param {string} email 用户邮箱
   * @returns 种类父级
   */
  async getIncomeKindsParentsByEmail(email: string) {
    try {
      const kindParents = await this.KindsParentsRepository.createQueryBuilder(
        'kindsParents',
      )
        .leftJoinAndSelect('kindsParents.svgCodeId', 'svgCodeId')
        .leftJoinAndSelect('kindsParents.children', 'children')
        .leftJoinAndSelect('children.svgCodeId', 'childSvgCodeId')
        .where('kindsParents.user.email = :email AND kindsParents.type = 1', {
          email,
        })
        .orderBy('kindsParents.time', 'DESC')
        .addOrderBy('children.time', 'DESC')
        .getMany();
      // 将所有 fileName 前面加上 /static/
      kindParents.forEach((kindParent) => {
        if (kindParent.fileName) {
          kindParent.fileName = '/static/' + kindParent.fileName;
        }
        kindParent.children.forEach((child) => {
          if (kindParent.fileName) {
            child.fileName = '/static/' + child.fileName;
          }
        });
      });
      return kindParents;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
