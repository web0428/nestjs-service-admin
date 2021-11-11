import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CustomTable } from "./custom-table.entity";

@Entity()
export class CustomTableField {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  fieldName: string;

  @Column()
  fieldCnName: string;

  @Column()
  fieldType: string;

  @ManyToOne(()=>CustomTable,customTable=>customTable.customTableFields)
  customTable:CustomTable

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
