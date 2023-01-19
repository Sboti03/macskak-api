import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbManagerService } from './db-manager/db-manager.service';

@Module({
  controllers: [AppController],
  providers: [AppService, DbManagerService],
})
export class AppModule {

}
