import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import User from './entities/user.entity';
import { ResData, Status } from 'src/response/res-data.interface';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

  async create(createUserDto: CreateUserDto) {
    let resdata: ResData;
    try {
      const result = await this.usersRepository.save(createUserDto);
      resdata = {
        code: Status.SUCCESS,
        msg: '保存成功',
        content: result
      };
      return resdata;
    } catch (e) {
      resdata = {
        code: Status.ERROR,
        msg: e,
      };
      return resdata;
    }
  }

  async findAll(querys) {
    let resdata: ResData;
    try {
      const { startTime, endTime, username } = querys;
      let sql = this.usersRepository.createQueryBuilder("user");
      if (username) {
        sql.where('user.username like :username', { username: `%${querys.username}%` });
      }
      if (startTime) {
        sql.andWhere('user.createdDate between :startTime and :endTime', { startTime, endTime })
      }
      const result = await sql.skip(querys.skip).take(querys.take).orderBy("updatedDate", "DESC").getManyAndCount()

      const [users, total] = result
      resdata = {
        code: Status.SUCCESS,
        msg: '查询成功',
        content: {
          result: users,
          total
        }
      };
      return resdata;
    } catch (e) {
      resdata = {
        code: Status.ERROR,
        msg: e,
      };
      return resdata;
    }
  }

  async findOne(id: string) {
    let resdata: ResData;
    try {
      const result = await this.usersRepository.findOne(id);
      resdata = {
        code: Status.SUCCESS,
        msg: '查询成功',
        content: result
      };
      return resdata;
    } catch (e) {
      resdata = {
        code: Status.ERROR,
        msg: e,
      };
      return resdata;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    let resdata: ResData;
    try {
      const result = await this.usersRepository.update(id, updateUserDto);
      resdata = {
        code: Status.SUCCESS,
        msg: '更新成功',
        content: result
      };
      return resdata;
    } catch (e) {
      resdata = {
        code: Status.ERROR,
        msg: e,
      };
      return resdata;
    }
  }

  async remove(id: string) {
    let resdata: ResData;
    try {
      const result = await this.usersRepository.delete(id);
      resdata = {
        code: Status.SUCCESS,
        msg: '删除成功',
        content: result
      };
      return resdata;
    } catch (e) {
      resdata = {
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
