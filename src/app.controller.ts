import { Controller, Get } from '@nestjs/common';
import { Delete, Param, Query } from '@nestjs/common/decorators';
import { AppService } from './app.service';
import Cat from './db-manager/cat.tdo';
import { DbManagerService } from './db-manager/db-manager.service';

@Controller()
export class AppController {
   constructor(private readonly appService: AppService, private readonly dbServices: DbManagerService) { }

   @Get('/api/cats')
   async getCats(@Query('sort') sortBy: string) {
      let cats : Cat[]
      if (sortBy != null) {
         cats = await this.dbServices.getAllCatWithSort(sortBy)
      } else {
         cats = await this.dbServices.getAllCat()
      }
      return cats
   }

   @Get('api/cats/:id')
   async getCatById(@Param('id') id: number) {
      let cat = await this.dbServices.getCatById(id)
      if(cat == null) {
         return {}
      }
      return cat
   }

   @Delete('api/cats/:id')
   deleteCatById(@Param('id') id: number) {
      this.dbServices.deleteCatById(id)
   }
}
