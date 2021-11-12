import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResData, Status } from 'src/response/res-data.interface';
import { Repository } from 'typeorm';
import UploadFile from './entities/upload-file.entity';

@Injectable()
export class UploadService {
  constructor(@InjectRepository(UploadFile) private uploadFileRepository: Repository<UploadFile>) { }

  async upload(file) {
    const newfile = {
      originalname: file.originalname,
      filename: file.filename
    }
    const result = await this.uploadFileRepository.save(newfile)
    const resdata: ResData = {
      code: Status.SUCCESS,
      msg: '保存成功',
      content: result.id
    };
    return resdata;
  }

  async findOne(id: string) {
    return await this.uploadFileRepository.findOne(id);
  }
}
