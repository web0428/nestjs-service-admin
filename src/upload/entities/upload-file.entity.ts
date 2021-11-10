import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export default class UploadFile {
  @PrimaryGeneratedColumn("uuid")
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