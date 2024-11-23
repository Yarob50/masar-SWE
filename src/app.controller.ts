import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //
  items = [
    { id: 1, name: 'item 1', price: 100 },
    { id: 2, name: 'item 2', price: 200 },
    { id: 3, name: 'item 3', price: 300 },
  ];

  @Get()
  getHello(): string {
    return this.appService.getHello();

    return 'welcome to Masar SWE';
  }

  @Get('/test')
  getTest(): string {
    return 'this is the tesdt endpoint.';
  }

  @Post('/test')
  postTest(): string {
    return 'this is the test endpoint (Post).';
  }

  @Put('/test-response')
  putTest() {
    return { name: 'Masar', Year: 2021 };
  }

  @Post('/find-sum')
  findSum(@Query('num1') number1: number, @Query('num2') number2: number) {
    const sum = Number(number1) + Number(number2);
    return { total: sum };
  }

  @Get('/items')
  getItems() {
    // get items from the database
    return this.items;
  }

  @Get('/items/:itemId')
  getItem(@Param('itemId') id: number) {
    // return 'hello from item details';
    // get item from the database
    let foundItem = null;

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id == id) {
        foundItem = this.items[i];
        break;
      }
    }

    if (!foundItem) {
      throw new HttpException('Item not found', 404);
    }
    return foundItem;
  }

  @Post('/items')
  createItem(@Body('name') name: string, @Body('price') price: number) {
    const newItem = {
      id: this.items.length + 1,
      name: name,
      price: price,
    };
    this.items.push(newItem);
    return newItem;
  }

  @Delete('/items/:itemId')
  deleteItem(@Param('itemId') id: number) {
    const index = this.items.findIndex((item) => item.id == id);
    if (index < 0) {
      throw new HttpException('Item not found', 404);
    }
    this.items.splice(index, 1);
    return this.items;
  }
}
