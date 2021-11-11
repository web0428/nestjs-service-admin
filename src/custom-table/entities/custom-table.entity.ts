import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CustomTableField } from "./custom-table-fields.entity";

@Entity()
export class CustomTable {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  tableName: string;

  @Column()
  tableCnName: string;

  @OneToMany(() => CustomTableField, customTableField => customTableField.customTable, {
    cascade: true,
  })
  customTableFields: CustomTableField[]

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
