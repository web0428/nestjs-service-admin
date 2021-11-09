import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import User from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { ResData, Status } from 'src/response/res-data.interface';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

  async create(createUserDto: CreateUserDto) {
    createUserDto.id = uuidv4();
    try {
      const result = await this.usersRepository.save(createUserDto);
      const resdata: ResData = {
        code: Status.SUCCESS,
        msg: '保存成功',
        content: result
      };
      return resdata;
    } catch (e) {
      const resdata: ResData = {
        code: Status.ERROR,
        msg: e,
      };
      return resdata;
    }
  }

  async findAll(querys) {
    try {
      querys.order = { "updatedDate": "DESC" }
      const result = await this.usersRepository.find(querys);
      const total = await this.usersRepository.count();
      const resdata: ResData = {
        code: Status.SUCCESS,
        msg: '查询成功',
        content: {
          result, total
        }
      };
      return resdata;
    } catch (e) {
      const resdata: ResData = {
        code: Status.ERROR,
        msg: e,
      };
      return resdata;
    }
  }

  async findOne(id: string) {
    try {
      const result = await this.usersRepository.findOne(id);
      const resdata: ResData = {
        code: Status.SUCCESS,
        msg: '查询成功',
        content: result
      };
      return resdata;
    } catch (e) {
      const resdata: ResData = {
        code: Status.ERROR,
        msg: e,
      };
      return resdata;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const result = await this.usersRepository.update(id, updateUserDto);
      const resdata: ResData = {
        code: Status.SUCCESS,
        msg: '更新成功',
        content: result
      };
      return resdata;
    } catch (e) {
      const resdata: ResData = {
        code: Status.ERROR,
        msg: e,
      };
      return resdata;
    }
  }

  async remove(id: string) {
    try {
      const result = await this.usersRepository.delete(id);
      const resdata: ResData = {
        code: Status.SUCCESS,
        msg: '删除成功',
        content: result
      };
      return resdata;
    } catch (e) {
      const resdata: ResData = {
        code: Status.ERROR,
        msg: e,
      };
      return resdata;
    }
  }

  async login(createUserDto: CreateUserDto) {
    return await this.usersRepository.findOne(createUserDto)
  }
}
