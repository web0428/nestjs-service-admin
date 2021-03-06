import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { UploadModule } from './upload/upload.module';
import { CustomTableModule } from './custom-table/custom-table.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'lrl1017.',
      database: 'base',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    UserModule,
    UploadModule,
    CustomTableModule
  ],
})
export class AppModule {
}
