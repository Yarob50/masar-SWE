import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly dataSource: DataSource) {}
  @Post('')
  async create(@Body() body) {
    const userRepo = this.dataSource.getRepository(User);
    const user = new User();
    const { fullName, age } = body;

    if (!fullName || !age) {
      throw new HttpException(
        'Full name and age are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    user.fullName = fullName;
    user.age = age;

    await userRepo.save(user);

    return { message: 'User created successfully', user: user };
  }

  @Get('')
  async findAll() {
    const userRepo = this.dataSource.getRepository(User);
    const users = await userRepo.find();

    return { users: users };
  }
}
