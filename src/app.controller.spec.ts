import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

let x = 10;

let y = 0;
describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    console.log('changing the value of x....');
    x = x + 1;
    console.log('=====================the value after change isssss ', x);
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  beforeAll(() => {
    console.log('changing the value of y....');
    y = y + 1;
    console.log('=====================the value of y after change isssss ', y);
    console.log('before all');
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      const result = appController.getHello();

      console.log('=====================🔴🔴', x);
      console.log(result);
      expect(result).toBe('Hello World!test');
    });
  });

  describe('testing get test', () => {
    it('should return a (test) word as part of the response', () => {
      const result = appController.getTest();

      console.log('================== ', result);
      expect(result).toContain('test');
    });
  });

  describe('testing get test', () => {
    it('should return a (test) word as part of the response', () => {
      const result = appController.getTest();

      console.log('================== ', result);
      expect(result).toContain('test');
    });
  });

  describe('testing get test', () => {
    it('should return a (test) word as part of the response', () => {
      const result = appController.getTest();

      console.log('================== ', result);
      expect(result).toContain('test');
    });
  });
});
