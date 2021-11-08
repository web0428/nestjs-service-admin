import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UploadFile from './entities/upload-file.entity';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([UploadFile])],
  controllers: [UploadController],
  providers: [UploadService]
})
export class UploadModule { }
