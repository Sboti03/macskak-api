import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { Body, Delete, Param, Post, Query, Render } from '@nestjs/common/decorators';
import { Redirect } from '@nestjs/common/decorators/http/redirect.decorator';
import { AppService } from './app.service';
import Cat from './db-manager/cat';
import CatTdo from './db-manager/cat.tdo';
import { DbManagerService } from './db-manager/db-manager.service';

@Controller()
export class AppController {
   constructor(private readonly appService: AppService, private readonly dbServices: DbManagerService) { }


   @Get('/')
   @Render('index')
   index() {}

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

   @Post('api/cats')
   async addNewCat(@Body() catTdo: CatTdo) {
      if(catTdo != null && catTdo.suly > 0) {
         let insertId = await this.dbServices.createCat(catTdo)
         return this.dbServices.getCatById(insertId)
      } else {
         throw new HttpException('Bad request body', HttpStatus.BAD_REQUEST)
      }
   }
}
