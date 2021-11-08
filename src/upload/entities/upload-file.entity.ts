import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity()
export default class UploadFile {
  @PrimaryColumn()
  id: string;

  @Column()
  originalname: string;

  @Column()
  filename:string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}