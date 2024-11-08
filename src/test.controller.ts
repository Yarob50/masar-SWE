import { Controller, Get } from '@nestjs/common';

@Controller()
export class TestController {
  @Get('/test-controller')
  getTestController(): string {
    return 'this is the';
  }
}
