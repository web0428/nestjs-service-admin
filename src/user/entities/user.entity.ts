import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity()
export default class User {
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @Column({
    select: false
  })
  password: string;

  @Column({
    default: null
  })
  avatarId: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}