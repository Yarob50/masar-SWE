import { Test, TestingModule } from '@nestjs/testing';
import { Test2Controller } from './test2.controller';

describe('Test2Controller', () => {
  let controller: Test2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Test2Controller],
    }).compile();

    controller = module.get<Test2Controller>(Test2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
