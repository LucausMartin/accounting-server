import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemIcons } from './system-icons.entities';

@Injectable()
export class SystemIconsService {
  constructor(
    @InjectRepository(SystemIcons)
    private readonly SystemIcons: Repository<SystemIcons>,
  ) {}

  async findAll() {
    return await this.SystemIcons.find();
  }
}
