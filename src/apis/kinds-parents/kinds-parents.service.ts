import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KindsParents } from './kinds-parents.entities';
import { JwtService } from '@nestjs/jwt';
import { generateUUID } from 'src/utils';
import { Users } from '../users/users.entities';

@Injectable()
export class KindsParentsService {
  constructor(
    @InjectRepository(KindsParents)
    private readonly KindsParentsRepository: Repository<KindsParents>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * @description 创建种类父级
   * @param email 邮箱
   * @param name 种类父级名称
   * @returns 是否创建成功
   */
  async insertKindsParent(email: string, name: string) {
    const user = new Users();
    user.email = email;
    const kindsParent = new KindsParents();
    kindsParent.user = user;
    kindsParent.id = generateUUID();
    kindsParent.name = name;
    try {
      await this.KindsParentsRepository.save(kindsParent);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
