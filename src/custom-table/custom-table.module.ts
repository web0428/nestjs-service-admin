import { Module } from '@nestjs/common';
import { CustomTableService } from './custom-table.service';
import { CustomTableController } from './custom-table.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomTableField } from './entities/custom-table-fields.entity';
import { CustomTable } from './entities/custom-table.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomTableField, CustomTable])],
  controllers: [CustomTableController],
  providers: [CustomTableService]
})
export class CustomTableModule { }
