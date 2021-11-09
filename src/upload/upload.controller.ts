import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express'
import { extname } from 'path';
import { createReadStream } from 'fs';
import { UploadService } from './upload.service';
import config from 'config';
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.UPLOAD_FILE_PATH)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + extname(file.originalname)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {

  }

  @Post()
  @UseInterceptors(FileInterceptor('file', { storage }))
  uploadFile(@UploadedFile() file) {
    return this.uploadService.upload(file);
  }

  @Get(':id')
  async readFile(@Res() res: Response, @Param('id') id: string) {
    const { filename } = await this.uploadService.findOne(id);
    const file = createReadStream(`${config.UPLOAD_FILE_PATH + filename}`)
    file.pipe(res);
  }
}
