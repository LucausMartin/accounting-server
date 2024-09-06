import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Icons } from './icons.entities';
import { generateUUID } from 'src/utils';
import { Users } from '../users/users.entities';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(Icons)
    private readonly IconsRepository: Repository<Icons>,
  ) {}

  /**
   * @description 添加用户 icon
   * @param { string } email 邮箱
   * @param { string } file_name 文件名
   * @returns 是否创建成功
   */
  async insertIcon(email: string, file_name: string) {
    const user = new Users();
    user.email = email;
    const icon = new Icons();
    icon.user = user;
    icon.name = file_name;
    icon.id = generateUUID();
    try {
      await this.IconsRepository.save(icon);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  /**
   * @description 获取用户 icon
   * @param { string } email 邮箱
   * @returns 用户 icon
   */
  getAllIconsByUser(email: string) {
    return this.IconsRepository.find({
      where: {
        user: {
          email,
        },
      },
    });
  }
}
