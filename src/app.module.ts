import { Module } from '@nestjs/common';
import { UsersModule } from './apis/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_CONFIG } from './constants';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UploadModule } from './apis/upload/upload.module';
import { SystemIconsModule } from './apis/system-icons/system-icons.module';
import { KindsParentsModule } from './apis/kinds-parents/kinds-parents.module';
import { KindsChildrenModule } from './apis/kinds-children/kinds-children.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'public/uploaded'),
      serveRoot: '/static',
    }),
    UploadModule,
    UsersModule,
    KindsParentsModule,
    SystemIconsModule,
    KindsChildrenModule,
    TypeOrmModule.forRoot(DB_CONFIG),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
