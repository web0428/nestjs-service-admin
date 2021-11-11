import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CustomTableService } from './custom-table.service';
import { CreateCustomTableDto } from './dto/create-custom-table.dto';
import { UpdateCustomTableDto } from './dto/update-custom-table.dto';

@Controller('custom-table')
export class CustomTableController {
  constructor(private readonly customTableService: CustomTableService) {}

  @Post()
  create(@Body() createCustomTableDto: CreateCustomTableDto) {
    return this.customTableService.create(createCustomTableDto);
  }

  @Get()
  findAll(@Query() querys) {
    return this.customTableService.findAll(querys);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customTableService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomTableDto: UpdateCustomTableDto) {
    return this.customTableService.update(id, updateCustomTableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customTableService.remove(id);
  }

  @Get('create-table/:id')
  createTable(@Param('id') id: string){
    return this.customTableService.createTable(id);
  }

  @Get('find-table/:tableName')
  findTable(@Param('tableName') tableName: string){
    return this.customTableService.findTable(tableName);
  }
}
