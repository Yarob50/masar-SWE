import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const x = 'test';

    const str = 'Hello World!';
    return str;
  }
}
