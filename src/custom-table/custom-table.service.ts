import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResData, Status } from 'src/response/res-data.interface';
import { Connection, EntityManager, Repository, Table } from 'typeorm';
import { CreateCustomTableDto } from './dto/create-custom-table.dto';
import { UpdateCustomTableDto } from './dto/update-custom-table.dto';
import { CustomTableField } from './entities/custom-table-fields.entity';
import { CustomTable } from './entities/custom-table.entity';

@Injectable()
export class CustomTableService {

  constructor(@InjectRepository(CustomTable) private customTableRepository: Repository<CustomTable>, private connection: Connection) { }

  async create(createCustomTableDto: CreateCustomTableDto) {
    let resdata: ResData;
    try {
      const result = await this.customTableRepository.save(createCustomTableDto);
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
      const { startTime, endTime, tableCnName } = querys;
      let sql = this.customTableRepository.createQueryBuilder("customTable");
      if (tableCnName) {
        sql.where('customTable.tableCnName like :tableCnName', { tableCnName: `%${querys.tableCnName}%` })
      }
      if (startTime) {
        sql.andWhere('customTable.createdDate between :startTime and :endTime', { startTime, endTime })
      }
      sql.leftJoinAndSelect("customTable.customTableFields", "customTableField");
      const result = await sql.skip(querys.skip).take(querys.take).orderBy("customTable.updatedDate", "DESC").getManyAndCount()
      const [customTables, total] = result
      const resdata: ResData = {
        code: Status.SUCCESS,
        msg: '查询成功',
        content: {
          result: customTables,
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
      const result = await this.customTableRepository.findOne(id);
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

  async update(id: string, updateCustomTableDto: UpdateCustomTableDto) {
    let resdata: ResData;
    try {
      const result = await this.connection.transaction(async manager => {
        await manager.delete(CustomTableField, { customTable: id })
        await manager.save(CustomTable, updateCustomTableDto)
      });
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
      const result = await this.connection.transaction(async manager => {
        await manager.delete(CustomTableField, { customTable: id })
        await manager.delete(CustomTable, id)
      });
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

  async createTable(id: string) {
    let resdata: ResData;
    try {
      const customTable = await this.customTableRepository.findOne(id, { relations: ["customTableFields"] });
      const columns = customTable.customTableFields.map(field => {
        return {
          name: field.fieldName,
          type: 'varchar',
          comment: field.fieldCnName
        }
      })
      const queryRunner = this.connection.createQueryRunner();
      await queryRunner.createTable(new Table({
        name: customTable.tableName,
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "uuid"
          },
          ...columns
        ]
      }), true)
      resdata = {
        code: Status.SUCCESS,
        msg: '创建成功',
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

  async findTable(tableName: string) {
    const queryRunner = this.connection.createQueryRunner();
    let resdata: ResData;
    try {
      const result = await queryRunner.query(`select * from ${tableName}`)
      const fields = await queryRunner.query(`SHOW FULL COLUMNS  FROM ${tableName}`)
      resdata = {
        code: Status.SUCCESS,
        msg: '查询成功',
        content: { result, fields }
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
}
